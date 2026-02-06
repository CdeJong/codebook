<?php

namespace App\Observers;

use App\Models\Comment;
use Illuminate\Support\Facades\Cache;

class CommentObserver
{
    public function saved(Comment $comment): void {
        Cache::forget("comment:{$comment->id}:content_html"); // forget markdown cache
    }

    public function deleted(Comment $comment): void {
        Cache::forget("comment:{$comment->id}:content_html"); // forget markdown cache
    }
}
