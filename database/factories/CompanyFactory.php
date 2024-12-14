<?php

namespace Database\Factories;

use Faker\Core\Number;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company,
            'email' => $this->faker->unique()->safeEmail,
            // Generate a valid postcode with a maximum length of 7 characters
            'postcode' => '060' . rand(1, 100), // Example: 12345 or 12345-67
            'prefecture_id' => rand(1, 25), // Assuming you have a Prefecture model and factory
            'city' => $this->faker->city,
            'local' => $this->faker->streetName,
            'street_address' => $this->faker->address,
            'business_hour' => $this->faker->time('H:i') . ' - ' . $this->faker->time('H:i'),
            'regular_holiday' => $this->faker->dayOfWeek . ', ' . $this->faker->dayOfWeek,
            'phone' => '085868822' . rand(1, 100),
            'fax' => '085868822' . rand(1, 100),
            'url' => $this->faker->url,
            'license_number' => strtoupper(Str::random(10)),
            'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s', // Default image path if needed
        ];
    }
}
