<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cookie;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
})->name('page.landing');

Auth::routes();

// Backdoor
Route::group(['as' => 'dashboard.backdoor.', 'prefix' => 'dashboard/backdoor', 'middleware' => ['auth']], function () {
    // Redirect to User Vendor Dashboard
    Route::get('/redirect/user/{user_id}', function ($user_id) {
        $minutes = 60;
        Cookie::queue(Cookie::make('isSuperAdmin', true, $minutes));

        Auth::logout();

        $user = User::query()->where('id', $user_id)->first();

        Auth::loginUsingId($user->id);

        if ($user->role_name() == 'transport') {
            return redirect()->route('dashboard.transport.home.index');
        }

        if ($user->role_name() == 'affiliate') {
            return redirect()->route('dashboard.affiliate.home.index');
        }

        if ($user->role_name() == 'travel-agent') {
            return redirect()->route('dashboard.travel_agent.home.index');
        }

        if ($user->role_name() == 'admin-hotel' || $user->role_name() == 'staff-hotel') {
            return redirect()->route('dashboard.hotel.home.index');
        }

        return redirect()->back();
    })->name('redirect_to_user');

    // Redirect to User Admin Dashboard
    Route::get('/redirect/admin', function () {
        if (Cookie::has('isSuperAdmin')) {
            $minutes = 60;
            Cookie::queue(Cookie::make('isSuperAdmin', true, $minutes));

            Auth::logout();

            $user = User::role('super-admin')->orderBy('id','desc')->first();

            Auth::loginUsingId($user->id);

            return redirect()->route('dashboard.admin.home.index');
        }

        return redirect()->back();
    })->name('redirect_to_admin');
});

// Dashboard Super Admin
Route::group(['as' => 'dashboard.admin.', 'prefix' => 'dashboard/admin', 'middleware' => ['auth','role:super-admin']], function () {
    // Dashboard
    Route::get('/', [\App\Http\Controllers\Dashboard\Admin\HomeController::class,'index'])->name('home.index');

    // Transport
    Route::patch('/transport/active/{transport}', [\App\Http\Controllers\Dashboard\Admin\TransportController::class,'update_active'])->name('transport.update_active');
    Route::resource('/transport',\App\Http\Controllers\Dashboard\Admin\TransportController::class)->names('transport');

    // Affiliate
    Route::patch('/affiliate/active/{affiliate}', [\App\Http\Controllers\Dashboard\Admin\AffiliateController::class,'update_active'])->name('affiliate.update_active');
    Route::resource('/affiliate',\App\Http\Controllers\Dashboard\Admin\AffiliateController::class)->names('affiliate');
});

// Dashboard Affiliate
Route::group(['as' => 'dashboard.affiliate.', 'prefix' => 'dashboard/affiliate', 'middleware' => ['auth','role:affiliate']], function () {
    // Dashboard
    Route::get('/', [\App\Http\Controllers\Dashboard\Affiliate\HomeController::class,'index'])->name('home.index');
});

// Dashboard Transport
Route::group(['as' => 'dashboard.transport.', 'prefix' => 'dashboard/transport', 'middleware' => ['auth','role:transport']], function () {
    // Dashboard
    Route::get('/', [\App\Http\Controllers\Dashboard\Transport\HomeController::class,'index'])->name('home.index');
});

Route::get('/logout', function (Request $request) {
    Cookie::queue(Cookie::forget('isSuperAdmin'));

    Auth::logout();

    return Inertia::location(route('page.landing'));
});
