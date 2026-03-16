<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\JsonResponse;

class CommentController extends Controller {
    
    /**
     * Display a listing of the resource.
     */
    public function index() : ResourceCollection {
        $comments = Comment::all();
        return CommentResource::collection($comments);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment) : JsonResource {
        return new CommentResource($comment);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request) : JsonResource {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        # TODO validate if user is allowed to post on this ticket, like what if its closed?

        $comment = $user->comments()->create($request->validated());
        return new CommentResource($comment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, Comment $comment) : JsonResource {
        $comment->update($request->validated());
        return new CommentResource($comment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment) : JsonResponse {
        $comment->delete();
        return response()->json(['message' => 'resource was deleted successfully']);
    }
}
