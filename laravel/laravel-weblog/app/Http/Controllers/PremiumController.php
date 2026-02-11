<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubscribePremiumRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PremiumController {

    public function show() {
        return view("premium");
    }

    public function subscribe(SubscribePremiumRequest $request) {
        $duration_in_months = $request->validated('duration_in_months');

        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($user->premium_expires_at == null) {
            $user->premium_expires_at = Carbon::now()->addMonths($duration_in_months);
        } else {
            $user->premium_expires_at = $user->premium_expires_at->addMonths($duration_in_months);
        }
        $user->save();

        return redirect()->route('profile.show');
    }
}
