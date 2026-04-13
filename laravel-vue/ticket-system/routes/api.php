<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/tickets', [TicketController::class, 'index'])->name("tickets.index");
    Route::get('/tickets/{ticket}', [TicketController::class, 'show'])->name("tickets.show");
    Route::post('/tickets', [TicketController::class, 'store'])->name("tickets.store");

    Route::get('/categories', [CategoryController::class, 'index'])->name("categories.index");
    Route::post('/categories', [CategoryController::class, 'store'])->name("categories.store");
    Route::put('/categories/{category}', [CategoryController::class, 'update'])->name("categories.update");
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name("categories.destory");
    
    Route::post('/notes', [NoteController::class, 'store'])->name("notes.store");
    Route::put('/notes/{note}', [NoteController::class, 'update'])->name("notes.update");
    Route::delete('/notes/{note}', [NoteController::class, 'destroy'])->name("notes.destroy");

    Route::post('/comments', [CommentController::class, 'store'])->name("comments.store");
    Route::put('/comments/{comment}', [CommentController::class, 'update'])->name("comments.update");
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name("comments.destroy");
    
    Route::get('/users', [UserController::class, 'index'])->name("users.index");
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name("users.destory");

    Route::get('/me', [AuthenticationController::class, 'me'])->name('auth.me');
    Route::post('/logout', [AuthenticationController::class, 'logout'])->name('auth.logout');
});

Route::post('/login', [AuthenticationController::class, 'login'])->name("auth.login");
Route::post('/register', [AuthenticationController::class, 'register'])->name("auth.register");

