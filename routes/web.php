<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/welcome', function () {
    return \Inertia\Inertia::render('Welcome',[
        'user' => [
            'name' => 'John Doe',
            'email' => 'agus@email.com'
        ]
    ]);
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
