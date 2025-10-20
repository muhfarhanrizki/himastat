<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Galeri>
 */
class GaleriFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(2),
            'image' => $this->faker->imageUrl(800, 600, 'events', true, 'Galeri'),
            'tanggal' => $this->faker->dateTimeBetween('-2 years', 'now')->format('Y-m-d'),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
