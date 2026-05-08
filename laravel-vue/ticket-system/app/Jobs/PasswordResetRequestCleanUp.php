<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\PasswordReset;

use Illuminate\Support\Carbon;

class PasswordResetRequestCleanUp implements ShouldQueue {

    use Queueable;

    /**
     * Execute the job.
     */
    public function handle(): void {
        $expireTime = config('auth.passwords.users.expire', 15);
        PasswordReset::where('created_at', '<', Carbon::now()->subMinutes($expireTime))->delete();
    }
}
