<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Services\MarkdownService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Attributes\UsePolicy;
use App\Policies\PostPolicy;
use App\Support\DateTimeFormatter;
use Illuminate\Support\Str;

#[UsePolicy(PostPolicy::class)]
class Post extends Model {

    private const DEFAULT_IMAGE_PATH = 'image/default-no-image-found.png';
    private const DEFAULT_IMAGE_DESCRIPTION = "Default image; No image was set or found";

    use HasFactory;

    protected static function booted() {
        // runs on first model usages; registers model event handlers
        static::creating(static::updateSlug(...));
        static::updating(static::updateSlug(...));
        static::saved(static::forgetCache(...));
        static::deleted(static::forgetCache(...));
    }

    // model event handlers
    public static function updateSlug(Post $post): void {
        $post->slug = Str::slug($post->title); // update slug before saving on update
    }

    public static function forgetCache(Post $post): void {
        Cache::forget("post:{$post->id}:content_html"); // forget markdown cache
    }

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
    public function getContentHtmlAttribute() : string {
        return Cache::remember(
            "post:{$this->id}:content_html",
            now()->addHours(6),
            fn () => app(MarkdownService::class)->render($this->content)
        );
    }

    public function getImageUrlAttribute() : string {
        $image = $this->image;

        if ($image === null) {
            return asset(self::DEFAULT_IMAGE_PATH);
        }

        return $image->url;
    }

    public function getImageDescriptionAttribute() : string {
        $image = $this->image;

        if ($image === null) {
            return self::DEFAULT_IMAGE_DESCRIPTION;
        }

        return $image->description;
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
