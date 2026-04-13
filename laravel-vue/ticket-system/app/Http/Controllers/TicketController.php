<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Http\Resources\TicketResource;
use App\Models\Ticket;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\JsonResponse;
use Illuminate\Http\Exceptions\HttpResponseException;

class TicketController extends Controller {
    
    /**
     * Display a listing of the resource.
     */
    public function index() : ResourceCollection {
        $query = Ticket::with(['user', 'assignedUser', 'categories']);

        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$user->is_admin) {
            $query->where('user_id', $user->id);
        }

        $tickets = $query->orderBy('created_at', 'desc')->get();

        return TicketResource::collection($tickets);
    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket) { // todo return type
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$user->is_admin && $ticket->user->id !== $user->id) {
            throw new HttpResponseException(response()->json([
                'message' => 'Unauthorized to read this ticket',
                'errors' => []
            ], 401));
        }

        $relations = ['user', 'assignedUser', 'categories', 'comments'];

        if ($user->is_admin) {
            $relations[] = 'notes';
        }

        $expandedTicket = $ticket->load($relations);

        return new TicketResource($expandedTicket);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTicketRequest $request) : JsonResource {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $ticket = $user->tickets()->create($request->validated());
        $ticket->categories()->sync($request->validated('category_ids'));
        return new TicketResource($ticket);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTicketRequest $request, Ticket $ticket) : JsonResource {
        $ticket->update($request->validated());
        return new TicketResource($ticket);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket) : JsonResponse {
        $ticket->delete();
        return response()->json(['message' => 'resource was deleted successfully']);
    }
}
