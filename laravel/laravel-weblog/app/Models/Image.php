<?php

namespace App\Models;

use App\Observers\ImageObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;

#[ObservedBy(ImageObserver::class)]
class Image extends Model {

    use HasFactory;

    protected $fillable = [
        "filename",
        "description"
    ];

    public function getRouteKey() : string {
        return $this->public_id;
    }

    public function getUrlAttribute() {
        return route('images.show', [$this, 'filename' => $this->filename]);
    }

    
    
}
