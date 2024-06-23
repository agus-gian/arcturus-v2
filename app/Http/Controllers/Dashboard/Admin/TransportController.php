<?php

namespace App\Http\Controllers\Dashboard\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Transport\TransportResource;
use App\Http\Resources\Transport\TransportResourceList;
use App\Models\City;
use App\Models\Country;
use App\Models\State;
use App\Models\Transport;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Mockery\Exception;

class TransportController extends Controller
{
    private function _list_data($request): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        $data = Transport::query()
            ->when(! empty($request->search), function ($affiliate) use ($request) {
                $affiliate->whereHas('user', function ($user) use ($request) {
                    $user->where('name', 'like', '%'.$request->search.'%');
                    $user->orWhere('email', 'like', '%'.$request->search.'%');
                });
            })
            ->orderBy('id','desc')
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return TransportResourceList::collection($data);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): \Inertia\Response
    {
        $items = $this->_list_data($request);

        return Inertia::render('Dashboard/Admin/Transport/Index',[
            'items' => $items
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): \Inertia\Response
    {
        $items = $this->_list_data($request);

        $phone_countries = Country::query()->orderBy('name')->get([
            'id',
            'name',
            'phonecode',
            'emoji'
        ]);

        $address_countries = Country::query()->orderBy('name')->get()->map(function ($country) {
            return [
                'value' => $country->id,
                'label' => $country->name,
            ];
        });

        return Inertia::render('Dashboard/Admin/Transport/Create',[
            'items' => $items,
            'phone_countries' => $phone_countries,
            'address_countries' => $address_countries,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name_user' => 'required',
            'phone_code_number_user' => 'required',
            'phone_number_only_user' => 'required',
            'email_user' => 'required|email|unique:users,email',
            'password_user' => Password::min(6)->letters()->mixedCase()->numbers(),
            'name_transport' => 'required',
            'email_transport' => 'required|email|unique:transports,email',
            'phone_code_number_transport' => 'required',
            'phone_number_only_transport' => 'required',
            'address_transport' => 'required',
            'country_id_transport' => 'required',
            'state_id_transport' => 'required',
            'city_id_transport' => 'required',
            'price_transport' => 'required',
        ]);

        try {
            $user_transport = User::query()
                ->create([
                    'name' => $request->name_user,
                    'phone_number' => $request->phone_code_number_user.$request->phone_number_only_user,
                    'email' => $request->email_user,
                    'email_verified_at' => now(),
                    'password' => Hash::make($request->password_user),
                    'remember_token' => Str::random(10),
                    'active' => $request->active,
                ]);

            $user_transport->assignRole('transport');

            $user_transport->setManyMeta([
                'phone_code_number' => $request->phone_code_number_user,
                'phone_number_only' => $request->phone_number_only_user,
            ]);

            if ($request->active) {
                $count_transport = Transport::query()->count();

                if ($count_transport > 0) {
                    Transport::query()->update([
                        'active' => false,
                    ]);
                }
            }

            $transport = Transport::query()->create([
                'user_id' => $user_transport->id,
                'name' => $request->name_transport,
                'slug' => Str::slug($request->name_transport),
                'phone_number' => $request->phone_code_number_transport.$request->phone_number_only_transport,
                'email' => $request->email_transport,
                'address' => $request->address_transport,
                'country_id' => $request->country_id_transport,
                'state_id' => $request->state_id_transport,
                'city_id' => $request->city_id_transport,
                'price' => $request->price_transport,
                'active' => $request->active,
            ]);

            $transport->setManyMeta([
                'phone_code_number' => $request->phone_code_number_transport,
                'phone_number_only' => $request->phone_number_only_transport,
            ]);

            DB::commit();

            return redirect()->route('dashboard.admin.transport.index', $request->query_string)->with('success', 'Data saved successfully');

        } catch (Exception $e) {
            Log::error($e);

            DB::rollBack();

            return redirect()->route('dashboard.admin.transport.index', $request->query_string)->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Transport $transport)
    {
        $detail_item = new TransportResource( $transport );

        $items = $this->_list_data($request);

        return Inertia::render('Dashboard/Admin/Transport/Show',[
            'items' => $items,
            'detail_item' => $detail_item,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Transport $transport)
    {
        $detail_item = new TransportResource( $transport );

        $items = $this->_list_data($request);

        $phone_countries = Country::query()->orderBy('name')->get([
            'id',
            'name',
            'phonecode',
            'emoji'
        ]);

        $address_countries = Country::query()->orderBy('name')->get()->map(function ($country) {
            return [
                'value' => $country->id,
                'label' => $country->name,
            ];
        });

        $address_states = State::query()
            ->where('country_id', $detail_item->country_id)
            ->orderBy('name')->get()->map(function ($country) {
            return [
                'value' => $country->id,
                'label' => $country->name,
            ];
        });

        $address_cities = City::query()
            ->where('state_id', $detail_item->state_id)
            ->orderBy('name')->get()->map(function ($country) {
            return [
                'value' => $country->id,
                'label' => $country->name,
            ];
        });

        return Inertia::render('Dashboard/Admin/Transport/Edit',[
            'items' => $items,
            'detail_item' => $detail_item,
            'phone_countries' => $phone_countries,
            'address_countries' => $address_countries,
            'address_states' => $address_states,
            'address_cities' => $address_cities,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transport $transport)
    {
        $request->validate([
            'name_user' => 'required',
            'phone_code_number_user' => 'required',
            'phone_number_only_user' => 'required',
            'email_user' => 'required|email|unique:users,email,'.$transport->user->id,
            'name_transport' => 'required',
            'email_transport' => 'required|email|unique:transports,email,'.$transport->id,
            'phone_code_number_transport' => 'required',
            'phone_number_only_transport' => 'required',
            'price_transport' => 'required',
        ]);

        try {
            $user_transport = User::query()->findOrFail($transport->user_id);
            $user_transport->name = $request->name_user;
            $user_transport->phone_number = $request->phone_code_number_user.$request->phone_number_only_user;
            $user_transport->email = $request->email_user;

            if (! empty($transport->password_user)) {
                $user_transport->password = Hash::make($transport->password_user);
            }

            $user_transport->active = $request->active;
            $user_transport->save();

            $user_transport->setManyMeta([
                'phone_code_number' => $request->phone_code_number_user,
                'phone_number_only' => $request->phone_number_only_user,
            ]);

            if ($request->active) {
                Transport::query()->update([
                    'active' => false,
                ]);
            }

            $transport->name = $request->name_transport;
            $transport->email = $request->email_transport;
            $transport->phone_number = $request->phone_code_number_transport.$request->phone_number_only_transport;
            $transport->price = $request->price_transport;
            $transport->active = $request->active;
            $transport->save();

            $transport->setManyMeta([
                'phone_code_number' => $request->phone_code_number_transport,
                'phone_number_only' => $request->phone_number_only_transport,
            ]);

            DB::commit();

            return redirect()->route('dashboard.admin.transport.index', $request->query_string)->with('success', 'Data updated successfully');

        } catch (\Exception $e) {
            Log::error($e);

            DB::rollBack();

            return redirect()->route('dashboard.admin.transport.index', $request->query_string)->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Transport $transport): \Illuminate\Http\RedirectResponse
    {
        User::query()->where('id', $transport->user_id)->delete();

        $transport->delete();

        return redirect()->route('dashboard.admin.transport.index', $request->query_string)->with('success', 'Data deleted successfully');
    }

    public function update_active(Request $request, Transport $transport): \Illuminate\Http\RedirectResponse
    {
        Transport::query()->update([
            'active' => false,
        ]);

        $user = User::query()->where('id', $transport->user_id)->first();
        $user->active = $request->active;
        $user->save();

        $transport->active = $request->active;
        $transport->save();

        return redirect()->route('dashboard.admin.transport.index', $request->query_string)->with('success', 'Data updated successfully');
    }
}
