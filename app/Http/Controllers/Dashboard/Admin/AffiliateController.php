<?php

namespace App\Http\Controllers\Dashboard\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Affiliate\AffiliateResource;
use App\Http\Resources\Affiliate\AffiliateResourceList;
use App\Models\Affiliate;
use App\Models\Country;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AffiliateController extends Controller
{
    private function _list_data($request): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $data = Affiliate::query()
            ->when(! empty($request->search), function ($affiliate) use ($request) {
                $affiliate->whereHas('user', function ($user) use ($request) {
                    $user->where('name', 'like', '%'.$request->search.'%');
                    $user->orWhere('email', 'like', '%'.$request->search.'%');
                });
            })
            ->orderBy('id','desc')
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return AffiliateResourceList::collection($data);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): \Inertia\Response
    {
        $items = $this->_list_data($request);

        return Inertia::render('Dashboard/Admin/Affiliate/Index',[
            'items' => $items
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): \Inertia\Response
    {
        $items = $this->_list_data($request);

        $countries = Country::query()->orderBy('name')->get([
            'id',
            'name',
            'phonecode',
            'emoji'
        ]);

        return Inertia::render('Dashboard/Admin/Affiliate/Create',[
            'items' => $items,
            'countries' => $countries,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'name' => 'required',
            'phone_code_number' => 'required',
            'phone_number_only' => 'required',
        ]);

        DB::beginTransaction();

        try {
            $user_affiliate = User::query()
                ->create([
                    'name' => $request->name,
                    'phone_number' => $request->phone_code_number.$request->phone_number_only,
                    'email' => $request->email,
                    'email_verified_at' => now(),
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(10),
                    'active' => filter_var($request->active, FILTER_VALIDATE_BOOLEAN),
                ]);

            $user_affiliate->assignRole('affiliate');

            $user_affiliate->setManyMeta([
                'phone_code_number' => $request->phone_code_number,
                'phone_number_only' => $request->phone_number_only,
            ]);

            Affiliate::query()->create([
                'user_id' => $user_affiliate->id,
                'code' => Str::random(10),
                'active' => filter_var($request->active, FILTER_VALIDATE_BOOLEAN),
            ]);

            DB::commit();

            return redirect()->route('dashboard.admin.affiliate.index', $request->query_string)->with('success', 'Data saved successfully');

        } catch (\Exception $e) {
            Log::error($e);

            DB::rollBack();

            return redirect()->route('dashboard.admin.affiliate.index', $request->query_string)->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Affiliate $affiliate): \Inertia\Response
    {
        $detail_item = new AffiliateResource( $affiliate );

        $items = $this->_list_data($request);

        return Inertia::render('Dashboard/Admin/Affiliate/Show',[
            'items' => $items,
            'detail_item' => $detail_item,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Affiliate $affiliate): \Inertia\Response
    {
        $detail_item = new AffiliateResource( $affiliate );

        $items = $this->_list_data($request);

        $countries = Country::query()->orderBy('name')->get([
            'id',
            'name',
            'phonecode',
            'emoji'
        ]);

        return Inertia::render('Dashboard/Admin/Affiliate/Edit',[
            'items' => $items,
            'detail_item' => $detail_item,
            'countries' => $countries,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Affiliate $affiliate): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'name' => 'required',
            'phone_code_number' => 'required',
            'phone_number_only' => 'required',
        ]);

        DB::commit();

        try {
            $affiliate->active = $request->active;
            $affiliate->save();

            $user = User::query()->findOrFail($affiliate->user_id);
            $user->name = $request->name;

            if (! empty($request->password)) {
                $user->password = Hash::make($request->password);
            }

            $user->save();

            $user->setManyMeta([
                'phone_code_number' => $request->phone_code_number,
                'phone_number_only' => $request->phone_number_only,
            ]);

            DB::commit();

            return redirect()->route('dashboard.admin.affiliate.index', $request->query_string)->with('success', 'Data updated successfully');

        } catch (\Exception $e) {
            Log::error($e);

            DB::rollBack();

            return redirect()->route('dashboard.admin.affiliate.index', $request->query_string)->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Affiliate $affiliate): \Illuminate\Http\RedirectResponse
    {
        User::query()->where('id', $affiliate->user_id)->delete();

        $affiliate->delete();

        return redirect()->route('dashboard.admin.affiliate.index', $request->query_string)->with('success', 'Data deleted successfully');
    }

    public function update_active(Request $request, Affiliate $affiliate): \Illuminate\Http\RedirectResponse
    {
        $user = User::query()->where('id', $affiliate->user_id)->first();
        $user->active = $request->active;
        $user->save();

        $affiliate->active = $request->active;
        $affiliate->save();

        return redirect()->route('dashboard.admin.affiliate.index', $request->query_string)->with('success', 'Data updated successfully');
    }
}
