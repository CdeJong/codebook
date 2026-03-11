<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');

Route::post('/login', [AuthenticationController::class, 'login']);
