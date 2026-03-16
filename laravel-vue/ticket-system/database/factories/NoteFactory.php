<?php

namespace Database\Factories;

use App\Models\Note;
use App\Models\User;
use App\Models\Ticket;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Note>
 */
class NoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $admin = User::inRandomOrder()
            ->where('is_admin', true)
            ->first();

        return [
            'user_id' => $admin->id,
            'ticket_id' => Ticket::inRandomOrder()->first()->id,
            'content' => $this->faker->sentence()
        ];
    }
}
