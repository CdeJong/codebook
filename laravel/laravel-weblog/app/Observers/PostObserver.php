<?php

namespace App\Observers;

use App\Models\Post;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class PostObserver {

    public function creating(Post $post): void {
        $post->slug = Str::slug($post->title); // update slug before saving on creation
    }

    public function updating(Post $post): void {
        $post->slug = Str::slug($post->title); // update slug before saving on update
    }

    public function saved(Post $post): void {
        Cache::forget("post:{$post->id}:content_html"); // forget markdown cache
    }

    public function deleted(Post $post): void {
        Cache::forget("post:{$post->id}:content_html"); // forget markdown cache
    }
}
