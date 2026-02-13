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
        $user = User::inRandomOrder()->first();

        $is_premium = $this->faker->boolean(25);
        $is_pinned = $user->is_admin ? $this->faker->boolean(50) : false;

        return [
            'user_id' => $user->id,
            'image_id' => null,
            'is_premium' => $is_premium,
            'is_pinned' => $is_pinned,
            'title' => $title,
            'slug' => $slug,
            'content' => $this->faker->text()
        ];
    }
}
