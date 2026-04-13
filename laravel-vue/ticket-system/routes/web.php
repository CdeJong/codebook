<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');

// Route::post('/api/login', [AuthenticationController::class, 'login'])->name("auth.login");
