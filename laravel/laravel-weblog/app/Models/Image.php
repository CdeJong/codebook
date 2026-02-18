<?php

namespace App\Models;

use App\Observers\ImageObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;

class Image extends Model {

    use HasFactory;

    public function getRouteKey() : string {
        return $this->public_id;
    }

    public function getUrlAttribute() {
        return route('images.show', [$this, 'filename' => $this->filename]);
    }

}
