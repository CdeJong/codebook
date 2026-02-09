<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class ProfileController {

    public function show() {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $posts = $user->posts()->latest()->get();
        return view('profile', compact('posts'));
    }
}
