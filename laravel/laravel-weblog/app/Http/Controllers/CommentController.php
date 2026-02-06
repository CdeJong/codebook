<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

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

        auth()->user()->comments()->create($validated);

        return back();
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
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        // unused for now
    }
}
