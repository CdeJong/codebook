<?php

namespace App\Http\Controllers;

use App\Http\Requests\IndexPostRequest;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Category;
use App\Models\Image;
use App\Models\Post;
use Illuminate\Routing\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $post = $user->posts()->make(
            $request->validated()
        );
            
        if ($user->can('setPinned', Post::class)) {
            $post->is_pinned = $request->validated('is_pinned');
        }

        if ($user->can('setPremium', Post::class)) {
            $post->is_premium = $request->validated('is_premium');
        }
            
        $this->setImage($post, $request);

        $post->save();
        $post->categories()->sync($request->validated('categories'));

        return redirect()->route('posts.show', $post);
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
        /** @var \App\Models\User $user */
        $user = Auth::user();        

        $post->fill($request->validated());

        if ($user->can('setPinned', Post::class)) {
            $post->is_pinned = $request->validated('is_pinned');
        }

        if ($user->can('setPremium', Post::class)) {
            $post->is_premium = $request->validated('is_premium');
        }

        $this->setImage($post, $request);

        $post->save();
        $post->categories()->sync($request->validated('categories'));
        
        return redirect()->route('posts.show', $post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post) {
        $this->deleteImage($post); // delete the current image if present
        $post->delete();
        return redirect()->route('posts.index');
    }

    private function setImage(Post $post, FormRequest $request) {
        $uploaded_image = $request->validated('image');
        if ($uploaded_image !== null) {
            // just to be sure the user doesnt break anything
            $file_name = pathinfo($uploaded_image->getClientOriginalName(), PATHINFO_FILENAME);
            $final_name = Str::slug($file_name) . '.' . $uploaded_image->extension();

            $image = new Image();
            $image->filename = $final_name;
            $image->desciption = "Post Image; " . $post->title; // image alt text
            $image->public_id = Str::random(16);
            $image->save();

            $this->deleteImage($post);

            $file_system = Storage::disk('private');
            $file_system->putFileAs('', $uploaded_image, $image->public_id);
            // update post image (saving is done outside of this method)
            $post->image_id = $image->id;
        }
    }

    private function deleteImage(Post $post) {
        $current_image = $post->image;
        if ($current_image === null) {
            return;
        }
        // don't remove images which are used by multiple posts (created by Seeder)
        if (App::isLocal() && str_starts_with($current_image->public_id, "default-")) {
            return;
        }
        
        $file_system = Storage::disk('private');
        $file_system->delete($current_image->public_id);
        $current_image->delete();
    }
}
