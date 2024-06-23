<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/state/phone-code', function (Request $request) {
    $states = \App\Models\State::query();
    if (! empty($request->country_id)) {
        $states->where('country_id', $request->country_id);
    }
    $states->orderBy('name');

    return $states->get()->map(function ($state) {
        return [
            'value' => $state->id,
            'label' => $state->name,
        ];
    });
});

Route::get('/city/phone-code', function (Request $request) {
    $states = \App\Models\City::query();
    if (! empty($request->state_id)) {
        $states->where('state_id', $request->state_id);
    }
    $states->orderBy('name');

    return $states->get()->map(function ($state) {
        return [
            'value' => $state->id,
            'label' => $state->name,
        ];
    });
});
