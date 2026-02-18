<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Services\MarkdownService;
use Illuminate\Support\Facades\Cache;
use App\Support\DateTimeFormatter;

class Comment extends Model {

    use HasFactory;

    protected static function booted() {
        // runs on first model usages; registers model event handlers
        static::saved(static::forgetCache(...));
        static::deleted(static::forgetCache(...));
    }

    // model event handler
    public static function forgetCache(Comment $comment): void {
        Cache::forget("comment:{$comment->id}:content_html"); // forget markdown cache
    }

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
