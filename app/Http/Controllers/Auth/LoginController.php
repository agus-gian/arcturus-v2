<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    // protected $redirectTo = '/dashboard';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
        $this->middleware('auth')->only('logout');
    }

    protected function authenticated(Request $request, $user): RedirectResponse
    {
        if ($user->role_name() == 'affiliate') {
            return redirect()->route('dashboard.affiliate.home.index');
        }

        if ($user->role_name() == 'travel-agent') {
            return redirect()->route('dashboard.travel_agent.home.index');
        }

        if ($user->role_name() == 'admin-hotel') {
            return redirect()->route('dashboard.admin_hotel.home.index');
        }

        if ($user->role_name() == 'staff-hotel') {
            return redirect()->route('dashboard.staff_hotel.home.index');
        }

        return redirect()->route('dashboard.admin.home.index');
    }
}
