<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Exceptions\HttpResponseException;

abstract class Controller {

    protected function requiresAdmin() : void {
        $user = Auth::user();

        if (!$user || !$user->is_admin) {
            throw new HttpResponseException(response()->json([
                'message' => 'Unauthorized',
                'errors' => []
            ], 401));
        }
    }
}
