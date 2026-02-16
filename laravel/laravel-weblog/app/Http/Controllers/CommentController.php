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
     * Display a listing of the resource.
     */
    public function index() {
        // unused
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        // posts.show
    }

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

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        // unused
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) {
        // unused
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        // unused for now
        // implementation note: be sure to check $this->authorize('viewPremiumContent', $post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        // unused for now
    }
}
