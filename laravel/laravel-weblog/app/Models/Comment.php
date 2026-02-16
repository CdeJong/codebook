<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Observers\CommentObserver;
use App\Services\MarkdownService;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Support\Facades\Cache;
use App\Support\DateTimeFormatter;

#[ObservedBy(CommentObserver::class)]
class Comment extends Model {

    use HasFactory;
    
    protected $fillable = [
        "post_id", // gets validated in store, I wanted to use a policy, but there is no way to cleanly access $post
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

    public function getFormattedCreatedAtAttribute(): string {
        return DateTimeFormatter::format($this->created_at);
    }

    public function getFormattedUpdatedAtAttribute(): string {
        return DateTimeFormatter::format($this->updated_at);
    }

    public function post() {
        return $this->belongsTo(Post::class);
    }

    // author
    public function user() {
        return $this->belongsTo(User::class);
    }


}
