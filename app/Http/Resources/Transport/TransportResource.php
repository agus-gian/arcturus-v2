<?php

namespace App\Http\Resources\Transport;

use App\Http\Resources\User\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransportResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->user),
            'name' => $this->name,
            'email' => $this->email,
            'address' => $this->address,
            'country_id' => $this->country_id,
            'country' => $this->country->name,
            'state_id' => $this->state_id,
            'state' => $this->state->name,
            'city_id' => $this->city_id,
            'city' => $this->city->name,
            'phone_number' => $this->phone_number,
            'phone_code_number' => $this->getMeta('phone_code_number',''),
            'phone_number_only' => $this->getMeta('phone_number_only',''),
            'price' => $this->price,
            'active' => $this->active,
        ];
    }
}
