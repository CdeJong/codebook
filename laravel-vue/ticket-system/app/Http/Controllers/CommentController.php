<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Resources\CommentResource;
use App\Mail\NewComment;
use App\Models\Comment;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\JsonResponse;

class CommentController extends Controller {
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request) : JsonResource {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $comment = $user->comments()->make($request->validated());

        $this->requiresResourceOwner($comment->ticket->user->id);
        $comment->save();

        if ($comment->ticket->user->id !== $user->id) {
            $ticket = $comment->ticket;
            $ticket_user = $ticket->user;
            Mail::to($ticket_user)->send(new NewComment($ticket_user, $user, $ticket));
        }
        
        return new CommentResource($comment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, Comment $comment) : JsonResource {
        $this->requiresResourceOwner($comment->user->id);

        $comment->update($request->validated());
        return new CommentResource($comment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment) : JsonResponse {
        $this->requiresResourceOwner($comment->user->id);

        $comment->delete();
        return response()->json(['message' => 'resource was deleted successfully']);
    }
}
