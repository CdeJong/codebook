<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Image;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'username' => 'Test User',
            'email' => 'test@example.com',
        ]);

        User::factory()->create([
            'username' => 'Admin',
            'email' => 'admin@example.com',
            'is_admin' => true
        ]);

        Image::factory()->create([
            'filename' => 'example.png',
            'description' => 'This is a nice example image'
        ]);

        $this->call([
            CategorySeeder::class,
            PostSeeder::class,
            CommentSeeder::class
        ]);

        // fills pivot table category_post
        $categories = Category::all();
        Post::all()->each(function ($post) use ($categories) {
            $post->categories()->attach(
                $categories->random(rand(1, 3))->pluck('id')->toArray()
            );
        });
    }
}
