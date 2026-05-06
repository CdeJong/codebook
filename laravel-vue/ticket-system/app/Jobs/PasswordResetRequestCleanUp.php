<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\PasswordReset;

use Illuminate\Support\Carbon;

class PasswordResetRequestCleanUp implements ShouldQueue {
    use Queueable;

    private int $expireTime;
    private string | null $public_id; // string cant be null in php

    /**
     * Create a new job instance.
     */
    public function __construct(?string $public_id = null) {
        $this->expireTime = config('auth.passwords.users.expire', 15);
        $this->public_id = $public_id;
    }

    /**
     * Execute the job.
     */
    public function handle(): void {
        $query = PasswordReset::where('created_at', '<', Carbon::now()->subMinutes($this->expireTime));
        
        // if provided also delete the used request
        if ($this->public_id !== null) {
            $query->orWhere('public_id', $this->public_id);
        }
        $query->delete();
    }
}
