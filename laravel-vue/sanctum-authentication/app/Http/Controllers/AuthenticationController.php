<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Exceptions\HttpResponseException;

class AuthenticationController extends Controller {

    public function me(Request $request) {
        return new UserResource($request->user());
    }

    public function login(LoginRequest $request) {
        $validated = $request->validated();

        if (Auth::attempt($validated)) {
            $request->session()->regenerate();

            return new UserResource($request->user());
        }

        throw new HttpResponseException(response()->json([
            'message' => 'Email or password was wrong.',
            'errors' => []
        ], 422));
    }

}
