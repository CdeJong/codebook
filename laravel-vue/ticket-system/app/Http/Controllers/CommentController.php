<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\JsonResponse;
use Illuminate\Http\Exceptions\HttpResponseException;

class CommentController extends Controller {
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request) : JsonResource {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $comment = $user->comments()->make($request->validated());
        $ticket = $comment->ticket;

        // only admins are allowed to comment on a closed ticket
        if ($ticket->is_completed && !$user->is_admin) {
            throw new HttpResponseException(response()->json([
                'message' => 'Unauthorized',
                'errors' => []
            ], 401));
        }

        $this->requiresResourceOwner($comment->ticket->user->id);
        $comment->save();
    
        return new CommentResource($comment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, Comment $comment) : JsonResource {
        $this->requiresResourceOwner($comment->user->id);

        // should deleting or updating be allowed on completed tickets?

        $comment->update($request->validated());
        return new CommentResource($comment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment) : JsonResponse {
        $this->requiresResourceOwner($comment->user->id);

        // should deleting or updating be allowed on completed tickets?

        $comment->delete();
        return response()->json(['message' => 'resource was deleted successfully']);
    }
}
