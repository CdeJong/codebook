<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence();
        $slug = Str::slug($title);

        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'image_id' => null,
            'is_premium' => false,
            'is_pinned' => false,
            'title' => $title,
            'slug' => $slug,
            'content' => $this->faker->text()
        ];
    }
}
