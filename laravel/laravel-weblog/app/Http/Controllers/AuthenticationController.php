<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;
use App\Models\User;

class AuthenticationController extends Controller
{
    
    public function loginView() {
        return view('authentication.login');
    }

    public function registerView() {
        return view('authentication.register');
    }

    public function login(LoginRequest $request) {
        $validated = $request->validated();

        if (Auth::attempt($validated)) {
            $request->session()->regenerate();

            return redirect()->intended(route('auth.profile'));
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.'
        ])->onlyInput('email');

    }

    public function register(RegisterRequest $request) {
        $validated = $request->validated();

        User::create($validated);

        return redirect(route('login'));
    }

    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect(route('home'));
    }

    public function profileView() {
        $posts = auth()->user()->posts()->latest()->get();
        return view('authentication.profile', compact('posts'));
    }



}
