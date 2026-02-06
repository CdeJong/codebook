<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use App\Models\Post;


// slug support for {post} argument
Route::bind('post', function ($value) {
    if (is_numeric($value)) {
        return Post::findOrFail($value);
    }

    if (str_contains($value, '.')) {
        [$slug, $id] = explode('.', $value);
        return Post::where('id', $id)->firstOrFail();
    }

    abort(404);
});


// requires NOT to be logged in
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticationController::class, 'loginView'])->name('login');
    Route::get('/register', [AuthenticationController::class, 'registerView'])->name('register');

    Route::post('/auth/login', [AuthenticationController::class, 'login'])->name('auth.login');
    Route::post('/auth/register', [AuthenticationController::class, 'register'])->name('auth.register');
});

// requires to be logged in
Route::middleware('auth')->group(function () {
    Route::get('/profile', [AuthenticationController::class, 'profileView'])->name('auth.profile'); // /user/me?
    Route::post('/auth/logout', [AuthenticationController::class, 'logout'])->name('auth.logout');

    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::get('/posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::put('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');

    Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');

    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/categories/{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create');

    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
});

// public pages
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');
