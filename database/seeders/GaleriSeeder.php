<?php

namespace Database\Seeders;

use App\Models\Galeri;
use Database\Factories\GaleriFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GaleriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        GaleriFactory::new()->count(20)->create();
    }
}
