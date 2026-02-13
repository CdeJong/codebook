<?php

namespace App\Observers;

use App\Models\Image;
use Illuminate\Support\Str;

class ImageObserver
{
    public function creating(Image $image): void {
        $image->public_id = Str::random(16); // create a public id on creation
    }
}
