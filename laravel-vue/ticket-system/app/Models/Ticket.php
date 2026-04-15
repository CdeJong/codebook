<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ticket extends Model {

    use HasFactory;

    protected $fillable = [
        "title",
        "content"
    ];

    public function getIsCompletedAttribute() : bool {
        return $this->status === 'COMPLETED';
    }
    
    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function assignedUser() : BelongsTo {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }

    public function categories() : BelongsToMany {
        return $this->belongsToMany(Category::class)->withTimestamps();
    }

    public function comments() : HasMany {
        return $this->hasMany(Comment::class);
    }

    public function notes() : HasMany {
        return $this->hasMany(Note::class);
    }
}
