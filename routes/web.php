<?php

use App\Http\Controllers\Dashboard\HomeController;
use App\Http\Controllers\Dashboard\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $user = \App\Models\User::query()->where('id',1)->first();
    $user->assignRole('super-admin');

    return view('welcome');
})->name('page.landing');

Auth::routes();

Route::group(['as' => 'dashboard.', 'prefix' => 'dashboard', 'middleware' => ['auth','role:super-admin']], function () {
    // Dashboard
    Route::get('/', [HomeController::class,'index'])->name('home.index');

    // User
    Route::resource('/user',UserController::class)->names('user');
});

Route::get('/logout', function () {
    Auth::logout();

    return redirect()->route('page.landing');
});
