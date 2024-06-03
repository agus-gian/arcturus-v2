<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserResource;
use App\Http\Resources\User\UserResourceList;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    private function _list_users($request)
    {
        return User::withoutRole('super-admin')
            ->when(! empty($request->get('search')), function ($user) use ($request){
                $user->where('name', 'like', '%'.$request->get('search').'%');
            })
            ->orderBy('id','desc')
            ->paginate($request->per_page ?? 10)
            ->withQueryString();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): \Inertia\Response
    {
        $users = $this->_list_users($request);

        return Inertia::render('Dashboard/User/Index',[
            'users' => UserResourceList::collection($users)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): \Inertia\Response
    {
        $users = $this->_list_users($request);

        return Inertia::render('Dashboard/User/Create',[
            'users' => UserResourceList::collection($users)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::query()->create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole($request->role);

        return to_route('dashboard.user.index', $request->query_string);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id): \Inertia\Response
    {
        $detail_user = new UserResource( User::query()->findOrFail($id) );

        $list_users = UserResourceList::collection( $this->_list_users($request) );

        return Inertia::render('Dashboard/User/Show',[
            'detail_user' => $detail_user,
            'list_users' => $list_users
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, string $id): \Inertia\Response
    {
        $detail_user = new UserResource( User::query()->findOrFail($id) );

        $list_users = UserResourceList::collection( $this->_list_users($request) );

        return Inertia::render('Dashboard/User/Edit',[
            'detail_user' => $detail_user,
            'list_users' => $list_users
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
        ]);

        User::query()->where('id', $id)->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return to_route('dashboard.user.index', $request->query_string);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id): \Illuminate\Http\RedirectResponse
    {
        $user = User::query()->findOrFail($id);
        $user->delete();

        return to_route('dashboard.user.index',$request->all());
    }
}
