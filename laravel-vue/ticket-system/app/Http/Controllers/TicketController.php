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

class TicketController extends Controller {
    
    /**
     * Display a listing of the resource.
     */
    public function index() : ResourceCollection {
        $tickets = Ticket::all();

        // todo limit to user / assigned user, check issue might need more fields

        return TicketResource::collection($tickets);
    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket) : JsonResource {

        // TODO add comments / notes (when admin) / categories / user / assigned user

        return new TicketResource($ticket);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTicketRequest $request) : JsonResource {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $ticket = $user->tickets()->create($request->validated());
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
