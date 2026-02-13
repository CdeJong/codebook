<?php

namespace App\Models;

use App\Observers\PostObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Services\MarkdownService;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Attributes\UsePolicy;
use App\Policies\PostPolicy;
use App\Support\DateTimeFormatter;

#[ObservedBy(PostObserver::class)]
#[UsePolicy(PostPolicy::class)]
class Post extends Model {

    use HasFactory;

    protected $fillable = [
        "title",
        "content"
    ];

    protected $casts = [
        "is_premium" => "boolean",
        "is_pinned" => "boolean"
    ];

    // makes route() make routes include the slug
    public function getRouteKey() : string {
        return $this->slug . '.' . $this->id;
    }

    // markdown output as html
    public function getContentHtmlAttribute(): string {
        return Cache::remember(
            "post:{$this->id}:content_html",
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

    // author
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function image() {
        return $this->belongsTo(Image::class);
    }

    public function categories() {
        return $this->belongsToMany(Category::class);
    }
    
}
