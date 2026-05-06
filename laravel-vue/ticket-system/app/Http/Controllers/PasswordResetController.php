<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePasswordResetRequest;
use App\Http\Requests\UpdatePasswordResetRequest;
use App\Http\Requests\VerifyPasswordResetRequest;
use App\Jobs\PasswordResetRequestCleanUp;
use App\Mail\PasswordResetMail;
use App\Models\PasswordReset;
use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class PasswordResetController extends Controller {
    
    public function verify(VerifyPasswordResetRequest $request) {
        $password_reset = PasswordReset::where('public_id', $request->validated('public_id'))->first();

        if (
            $password_reset == null || 
            Carbon::parse($password_reset->created_at)->addMinutes(config('auth.passwords.users.expire', 15))->isPast() || 
            !Hash::check($request->validated('token'), $password_reset->token)
        ) {
            throw new HttpResponseException(response()->json([
                'message' => 'Invalid or expired request',
                'errors' => []
            ], 410));
        }

        return response()->json(['message' => 'Valid request']);
    }

    public function store(StorePasswordResetRequest $request) {
        $user = User::where('email', $request->validated('email'))->first();

        if ($user !== null) {
            $public_id = (string) Str::uuid();
            $token = Password::createToken($user);

            $password_reset = $user->passwordResetRequests()->make();
            $password_reset->public_id = $public_id;
            $password_reset->token = Hash::make($token);
            $password_reset->created_at = Carbon::now();
            $password_reset->save();

            $url = $this->createPasswordResetUrl($public_id, $token);

            Mail::to($user)->send(new PasswordResetMail($user, $url));
        }

        PasswordResetRequestCleanUp::dispatch();

        return response()->json(['message' => 'Password reset request received']);
    }

    private function createPasswordResetUrl(string $public_id, string $token) {
        return config('app.url') . '/password-reset?public_id=' . $public_id . '&token=' . $token;
    
    }

    public function update(UpdatePasswordResetRequest $request) {
        $password_reset = PasswordReset::where('public_id', $request->validated('public_id'))->first();
        $expireTime = config('auth.passwords.users.expire', 15);

        if (
            $password_reset == null || 
            Carbon::parse($password_reset->created_at)->addMinutes($expireTime)->isPast() || 
            !Hash::check($request->validated('token'), $password_reset->token)
        ) {
            throw new HttpResponseException(response()->json([
                'message' => 'Invalid or expired request',
                'errors' => []
            ], 410));
        }

        $user = $password_reset->user;
        $user->password = $request->validated('password');
        $user->save();

        PasswordResetRequestCleanUp::dispatch($password_reset->public_id);

        return response()->json(['message' => 'Password successfully updated']);  
    } 

}
