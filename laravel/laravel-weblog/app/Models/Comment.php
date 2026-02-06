<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Observers\CommentObserver;
use App\Services\MarkdownService;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Support\Facades\Cache;

#[ObservedBy(CommentObserver::class)]
class Comment extends Model {

    use HasFactory;
    
    protected $fillable = [
        "post_id", // TODO validate if the current user can post here
        "content"
    ];

    // markdown output as html
    public function getContentHtmlAttribute(): string {
        return Cache::remember(
            "comment:{$this->id}:content_html",
            now()->addHours(6),
            fn () => app(MarkdownService::class)->render($this->content)
        );
    }

    public function post() {
        return $this->belongsTo(Post::class);
    }

    // author
    public function user() {
        return $this->belongsTo(User::class);
    }


}
