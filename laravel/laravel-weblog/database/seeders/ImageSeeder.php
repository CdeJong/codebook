<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Image;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Image::factory()->create([
            'filename' => 'wallpaper-1.jpg',
            'public_id' => 'default-GCc2A46t7FynI3EJ',
            'description' => 'Default wallpaper image #1'
        ]);

        Image::factory()->create([
            'filename' => 'wallpaper-2.jpg',
            'public_id' => 'default-oPBIP3S16NGF8XB1',
            'description' => 'Default wallpaper image #2'
        ]);

        Image::factory()->create([
            'filename' => 'wallpaper-3.jpg',
            'public_id' => 'default-qb60BcYYZPb4suGf',
            'description' => 'Default wallpaper image #3'
        ]);

        Image::factory()->create([
            'filename' => 'wallpaper-4.jpg',
            'public_id' => 'default-QxNs6TQHemsD33sj',
            'description' => 'Default wallpaper image #4'
        ]);

        Image::factory()->create([
            'filename' => 'wallpaper-5.webp',
            'public_id' => 'default-rRsOEhWsVnU20yge',
            'description' => 'Default wallpaper image #5'
        ]);
    }
}
