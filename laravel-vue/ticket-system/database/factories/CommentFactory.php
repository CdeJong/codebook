<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\User;
use App\Models\Ticket;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Builder;

/**
 * @extends Factory<Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {

        $ticket = Ticket::inRandomOrder()->first();
        $user = User::where(function (Builder $query) use ($ticket) {
            $query->where('is_admin', '=', True)->orWhere('id', '=', $ticket->user->id);
        })->inRandomOrder()->first();

        return [
            'user_id' => $user->id,
            'ticket_id' => $ticket->id,
            'content' => $this->faker->sentence()
        ];
    }
}
