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

#[ObservedBy(PostObserver::class)]
#[UsePolicy(PostPolicy::class)]
class Post extends Model {

    use HasFactory;

    protected $fillable = [
        "title",
        "content",
        "is_premium",
        "is_pinned" # TODO add some policy so only admins can do this
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

    public function getFancyCreatedAtAttribute(): string {
        return Post::fancyTimeFormat($this->created_at);
    }

    public function getFancyUpdatedAtAttribute(): string {
        return Post::fancyTimeFormat($this->updated_at);
    }

    private static function fancyTimeFormat($timestamp) : string {
        if ($timestamp->isToday()) {
            return "Today at " . $timestamp->format('H:i');
        } elseif ($timestamp->isYesterday()) {
            return "Yesterday at " . $timestamp->format('H:i');
        } elseif ($timestamp->isCurrentWeek()) {
            return $timestamp->format('l') . " at " . $timestamp->format('H:i'); // e.g., Tuesday at 10:05
        } else {
            return $timestamp->format('j F') . " at " . $timestamp->format('H:i'); // e.g., 8 January at 10:05
        }
    } 

    // author
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function image() {
        return $this->hasOne(Image::class);
    }

    public function categories() {
        return $this->belongsToMany(Category::class);
    }
    
}
