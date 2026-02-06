<?php

namespace App\Providers;

use App\Models\Category;
use App\Models\Comment;
use Illuminate\Support\ServiceProvider;
use App\Models\Post;
use App\Observers\CommentObserver;
use App\Observers\PostObserver;
use App\Policies\CategoryPolicy;
use App\Policies\PostPolicy;
use App\Services\MarkdownService;
use Illuminate\Support\Facades\Gate;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(MarkdownService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Post::observe(PostObserver::class);
        Comment::observe(CommentObserver::class);

        Gate::policy(Category::class, CategoryPolicy::class);
        Gate::policy(Post::class, PostPolicy::class); // note: does not authorize model like Category
    }
}
