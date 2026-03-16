<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Ticket;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        Category::factory()->count(30)->create();

        // fills pivot table category_ticket
        $categories = Category::all();
        Ticket::all()->each(function ($ticket) use ($categories) {
            $ticket->categories()->attach(
                $categories->random(rand(1, 3))->pluck('id')->toArray()
            );
        });

    }
}
