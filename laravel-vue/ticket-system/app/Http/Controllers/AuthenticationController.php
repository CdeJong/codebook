<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\ProfileResource;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Models\User;


class AuthenticationController extends Controller {
    
    public function login(LoginRequest $request) {
        $validated = $request->validated();

        if (Auth::guard('web')->attempt($validated)) {
            $request->session()->regenerate();

            return new ProfileResource($request->user());
        }

        throw new HttpResponseException(response()->json([
            'message' => 'Email or password was wrong.',
            'errors' => []
        ], 422));
    }

    public function me(Request $request) {
        return new ProfileResource($request->user());
    }

    public function logout(Request $request) {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'logged out successfully']);
    }

    public function register(RegisterRequest $request) {
        $validated = $request->validated();

        User::create($validated);

        return response()->json(['message' => 'Account created! use /api/login to authenticate!']);
    }


}
