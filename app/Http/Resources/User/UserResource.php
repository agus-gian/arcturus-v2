<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'phone_code_number' => $this->getMeta('phone_code_number',''),
            'phone_number_only' => $this->getMeta('phone_number_only',''),
            'profile_picture' => $this->profile_picture_url(),
            'role_name' => $this->role_name(),
            'role_label' => $this->role_name_label()
        ];
    }
}
