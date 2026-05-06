<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PasswordReset extends Model {
    
    public $timestamps = false; // update to laravel 13: #[WithoutTimestamps]

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'token' => 'hashed',
        ];
    }

    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

}
