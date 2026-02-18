<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;


class HomeController {
    
    public function show() {
        $pinned_posts = Post::where('is_pinned', true)->inRandomOrder()->limit(3)->get();
        $posts_category = Category::inRandomOrder()->first(); // 'category' as name caused scoping issues as it already is used in the blade
        $category_posts = $posts_category->posts()->inRandomOrder()->limit(3)->get();
        $premium_posts = Post::where('is_premium', true)->inRandomOrder()->limit(3)->get();

        return view('home', compact('pinned_posts', 'posts_category', 'category_posts', 'premium_posts'));
    }
}
