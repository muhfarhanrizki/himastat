<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Divisi>
 */
class DivisiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->unique()->words(2, true); // contoh: "Pengembangan Sumber"

        return [
            'name' => ucfirst($name),
            'deskripsi' => $this->faker->sentence(10), // contoh: "Divisi yang bertanggung jawab pada kegiatan pengembangan anggota."
            'image' => $this->faker->imageUrl(640, 480, 'events', true, 'Galeri'),
        ];
    }
}
