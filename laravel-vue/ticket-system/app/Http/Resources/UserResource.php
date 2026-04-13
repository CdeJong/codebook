<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            "id" => $this->id,
            "first_name" => $this->first_name,
            "last_name" => $this->last_name,
            "is_admin" => $this->is_admin,
            "email" => $this->email,
            "phone_number" => "Add this to migration",
            "created_at" => $this->created_at,
        ];
    }

    /*
    id: number,
    first_name: string,
    last_name: string,
    is_admin: boolean,
    email: string,
    // phone_number: string,
    created_at: string
    */
}
