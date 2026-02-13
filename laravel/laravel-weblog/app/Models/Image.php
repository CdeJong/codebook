<?php

namespace App\Models;

use App\Observers\ImageObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;

#[ObservedBy(ImageObserver::class)]
class Image extends Model {

    use HasFactory;

    public function getRouteKeyName() : string {
        return $this->public_id; // todo
    }
    
}
