<?php

namespace App\Models;

use App\Policies\CategoryPolicy;
use Illuminate\Database\Eloquent\Attributes\UsePolicy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[UsePolicy(CategoryPolicy::class)]
class Category extends Model {
    
    use HasFactory;

    protected $fillable = [
        "name"
    ];
    
    public function posts() {
        return $this->belongsToMany(Post::class);
    }

}
