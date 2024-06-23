<?php

namespace App\Http\Resources\Affiliate;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AffiliateResource extends JsonResource
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
            'user_id' => $this->user_id,
            'name' => $this->user->name,
            'phone_number' => $this->user->phone_number,
            'phone_code_number' => $this->user->getMeta('phone_code_number'),
            'phone_number_only' => $this->user->getMeta('phone_number_only'),
            'email' => $this->user->email,
            'affiliate_url' => route('register', ['code' => $this->code]),
            'active' => $this->active,
        ];
    }
}
