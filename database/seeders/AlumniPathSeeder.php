<?php

namespace Database\Seeders;

use App\Models\AlumniPath;
use Database\Factories\AlumniPathFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AlumniPathSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AlumniPathFactory::new()->count(20)->create();
    }
}
