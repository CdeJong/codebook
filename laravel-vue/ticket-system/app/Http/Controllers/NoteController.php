<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNoteRequest;
use App\Http\Requests\UpdateNoteRequest;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\JsonResponse;

class NoteController extends Controller {
    
    /**
     * Display a listing of the resource.
     */
    public function index() : ResourceCollection {
        $this->requiresAdmin();
        $notes = Note::all();
        return NoteResource::collection($notes);
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note) : JsonResource {
        $this->requiresAdmin();
        return new NoteResource($note);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNoteRequest $request) : JsonResource {
        $this->requiresAdmin();

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $note = $user->notes()->create($request->validated());
        return new NoteResource($note);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNoteRequest $request, Note $note) : JsonResource {
        $this->requiresAdmin();

        $note->update($request->validated());
        return new NoteResource($note);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note) : JsonResponse {
        $this->requiresAdmin();

        $note->delete();
        return response()->json(['message' => 'resource was deleted successfully']);
    }
}
