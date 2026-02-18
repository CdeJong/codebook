<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    use AuthorizesRequests;

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request) {

        $validated = $request->validated();
        $post = Post::findOrFail($validated['post_id']);

        $this->authorize('viewPremiumContent', $post);

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $comment = $user->comments()->create($validated);

        return redirect()->route('posts.show', $post)->withFragment('comment-' . $comment->id);
    }

}
