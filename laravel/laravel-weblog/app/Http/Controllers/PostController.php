<?php

namespace App\Http\Controllers;

use App\Http\Requests\IndexPostRequest;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Routing\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PostController extends Controller
{
    use AuthorizesRequests;

    public function __construct() {
        $this->authorizeResource(Post::class, 'post');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(IndexPostRequest $request) {
        $validated = $request->validated();
        $query = Post::with(["user", "categories"]);

        if (!empty($validated['category'])) {
            $query->whereRelation('categories', 'category_id', $validated['category']);
        }

        $categories = Category::all();
        $posts = $query->latest()->get();
        return view('posts.index', compact('posts', 'categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        $categories = Category::all();
        return view('posts.create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request) {
        $post = auth()->user()->posts()->create(
            $request->validated()
        );

        $post->categories()->sync($request->validated('categories'));

        return redirect(route('posts.show', ['slug' => $post->slug, 'post' => $post]));
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post) {
        $comments = $post->comments()->latest()->get();
        return view('posts.show', compact('post', 'comments'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post) {
        $categories = Category::all();
        return view('posts.edit', compact('post', 'categories'));
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post) {
        $post->update($request->validated());
        $post->categories()->sync($request->validated('categories'));
        return redirect(route('posts.show', ['slug' => $post->slug, 'post' => $post]));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post) {
        $post->delete();
        return redirect()->route('posts.index');
    }
}
