<?php

namespace App\Http\Controllers;

use App\Http\Requests\PatchTicketAssigneeRequest;
use App\Http\Requests\PatchTicketCategoriesRequest;
use App\Http\Requests\PatchTicketStatusRequest;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Http\Resources\TicketResource;
use App\Models\Ticket;
use App\Models\User;
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
    public function show(Ticket $ticket) : JsonResource {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$user->is_admin && $ticket->user->id !== $user->id) {
            throw new HttpResponseException(response()->json([
                'message' => 'Unauthorized to read this ticket',
                'errors' => []
            ], 401));
        }

        $ticket->load(self::getRelations($user));

        return new TicketResource($ticket);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTicketRequest $request) : JsonResource {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $ticket = $user->tickets()->create($request->validated());
        $ticket->categories()->sync($request->validated('category_ids'));
        $ticket->load(self::getRelations($user));
        return new TicketResource($ticket);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTicketRequest $request, Ticket $ticket) : JsonResource {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $ticket->update($request->validated());
        $ticket->load(self::getRelations($user));
        return new TicketResource($ticket);
    }

    public function patchAssignee(PatchTicketAssigneeRequest $request, Ticket $ticket) : JsonResource {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $this->requiresAdmin();
        $assigned_user = User::findOrFail($request->validated('assigned_user_id'));
        if (!$assigned_user->is_admin) {
            throw new HttpResponseException(response()->json([
                'message' => 'Only admins can be assigned to tickets!',
                'errors' => []
            ], 401));
        }
        $ticket->assignedUser()->associate($assigned_user);
        $ticket->save();
        $ticket->load(self::getRelations($user));
        return new TicketResource($ticket);
    }

    public function patchStatus(PatchTicketStatusRequest $request, Ticket $ticket) : JsonResource {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $this->requiresAdmin();
        $ticket->status = $request->validated('status');
        $ticket->save();
        $ticket->load(self::getRelations($user));
        return new TicketResource($ticket);
    }

    public function patchCategories(PatchTicketCategoriesRequest $request, Ticket $ticket) : JsonResource {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $this->requiresResourceOwner($ticket->user->id);
        $ticket->categories()->sync($request->validated('category_ids'));
        $ticket->load(self::getRelations($user));
        return new TicketResource($ticket);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket) : JsonResponse {
        $ticket->delete();
        return response()->json(['message' => 'resource was deleted successfully']);
    }

    private static function getRelations(User $user) : array {
        $relations = ['user', 'assignedUser', 'categories', 'comments'];

        if ($user->is_admin) {
            $relations[] = 'notes';
        }

        return $relations;
    }
}
