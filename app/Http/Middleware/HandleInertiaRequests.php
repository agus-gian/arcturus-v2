<?php

namespace App\Http\Middleware;

use App\Http\Resources\User\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'layouts.app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'appName' => env('APP_NAME'),
            'authUser' => $this->_authUser(),
            'currentRouteName' => Route::currentRouteName(),
            'getReqQuery' => $request->query(),
            'isSuperAdmin' => fn () => $request->cookie('isSuperAdmin') ? filter_var($request->cookie('isSuperAdmin'), FILTER_VALIDATE_BOOLEAN) : false,
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error')
            ],
        ]);
    }

    private function _authUser(): ?UserResource
    {
        if (Auth::check()) {
            return new UserResource(Auth::user());
        }

        return null;
    }
}
