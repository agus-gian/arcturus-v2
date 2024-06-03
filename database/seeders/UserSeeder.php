<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 20; $i++) {
            $user = User::query()->create([
                'name' => fake()->name(),
                'email' => fake()->unique()->safeEmail,
                'email_verified_at' => now(),
                'password' => Hash::make('rahasia1234'),
                'remember_token' => Str::random(10),
            ]);

            $user->assignRole('affiliate');
        }
    }
}
