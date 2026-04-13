<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void {
        
        User::factory()->create([
            'first_name' => 'T.',
            'last_name' => 'Tester',
            'email' => 'tester@example.com',
        ]);

        User::factory()->create([
            'first_name' => 'C.',
            'last_name' => 'de Jong',
            'email' => 'cdejong@example.com',
        ]);

        User::factory()->create([
            'first_name' => 'O.',
            'last_name' => 'Owner',
            'email' => 'owner@example.com',
            'is_admin' => true
        ]);

        User::factory()->create([
            'first_name' => 'A.',
            'last_name' => 'Admin',
            'email' => 'admin@example.com',
            'is_admin' => true
        ]);
        
        $this->call([
            TicketSeeder::class,
            CommentSeeder::class,
            NoteSeeder::class,
            CategorySeeder::class
        ]);
    }
}
