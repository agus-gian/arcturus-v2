<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Country;
use App\Models\State;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class CountryStateCitySubDistrictSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data_countries = file_get_contents(public_path('country_state_city/countries.json'));
        $countries = json_decode($data_countries, true);
        foreach ($countries as $country) {
            $created_at = Carbon::createFromFormat('d/m/Y H:i:s', $country['created_at']);
            $created_at = $created_at->format('Y-m-d H:i:s');

            $updated_at = Carbon::createFromFormat('d/m/Y H:i:s', $country['updated_at']);
            $updated_at = $updated_at->format('Y-m-d H:i:s');

            $country['created_at'] = $created_at;
            $country['updated_at'] = $updated_at;

            Country::query()->create($country);
        }

        $data_states = file_get_contents(public_path('country_state_city/states.json'));
        $states = json_decode($data_states, true);
        foreach ($states as $state) {
            $created_at = Carbon::createFromFormat('d/m/Y H:i:s', $state['created_at']);
            $created_at = $created_at->format('Y-m-d H:i:s');

            $updated_at = Carbon::createFromFormat('d/m/Y H:i:s', $state['updated_at']);
            $updated_at = $updated_at->format('Y-m-d H:i:s');

            $state['created_at'] = $created_at;
            $state['updated_at'] = $updated_at;

            State::query()->create($state);
        }

        $data_cities = file_get_contents(public_path('country_state_city/cities.json'));
        $cities = json_decode($data_cities, true);
        foreach ($cities as $city) {
            $created_at = Carbon::createFromFormat('d/m/Y H:i:s', $city['created_at']);
            $created_at = $created_at->format('Y-m-d H:i:s');

            $updated_at = Carbon::createFromFormat('d/m/Y H:i:s', $city['updated_at']);
            $updated_at = $updated_at->format('Y-m-d H:i:s');

            $city['created_at'] = $created_at;
            $city['updated_at'] = $updated_at;

            City::query()->create($city);
        }
    }
}
