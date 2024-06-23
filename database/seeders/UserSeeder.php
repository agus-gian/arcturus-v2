<?php

namespace Database\Seeders;

use App\Models\Affiliate;
use App\Models\Transport;
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
        User::query()
            ->create([
                'name' => 'Super Admin',
                'phone_number' => '628123456781',
                'email' => 'super.admin@arcturus.com',
                'email_verified_at' => now(),
                'password' => Hash::make('rahasia1234'),
                'remember_token' => Str::random(10),
            ])
            ->assignRole('super-admin')
            ->setManyMeta([
                'phone_code_number' => '62',
                'phone_number_only' => '8123456781',
            ]);

        $user_transport = User::query()
            ->create([
                'name' => 'August Angga',
                'phone_number' => '628123456782',
                'email' => 'transport@arcturus.com',
                'email_verified_at' => now(),
                'password' => Hash::make('rahasia1234'),
                'remember_token' => Str::random(10),
            ]);

        $user_transport->assignRole('transport');

        $user_transport->setManyMeta([
            'phone_code_number' => '62',
            'phone_number_only' => '8123456782',
        ]);

        Transport::query()->create([
            'user_id' => $user_transport->id,
            'name' => 'August Transport',
            'slug' => Str::slug('August Transport'),
            'phone_number' => $user_transport->phone_number,
            'email' => $user_transport->email,
            'address' => 'Jalan Raya Utama 1 No 1X',
            'country_id' => 102,
            'state_id' => 1826,
            'city_id' => 56827,
            'price' => 100000,
            'active' => true,
        ]);

        $user_affiliate = User::query()
            ->create([
                'name' => 'August Permana',
                'phone_number' => '628123456783',
                'email' => 'affiliate@arcturus.com',
                'email_verified_at' => now(),
                'password' => Hash::make('rahasia1234'),
                'remember_token' => Str::random(10),
            ]);

        $user_affiliate->assignRole('affiliate');

        $user_affiliate->setManyMeta([
            'phone_code_number' => '62',
            'phone_number_only' => '8123456783',
        ]);

        Affiliate::query()->create([
            'user_id' => $user_affiliate->id,
            'code' => Str::random('10'),
        ]);
    }
}
