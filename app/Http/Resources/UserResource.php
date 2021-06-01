<?php

namespace App\Http\Resources;

use App\Traits\ResourceResponder;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    use ResourceResponder;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'surname' => $this->surname,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'type' => optional($this->type)->code,
        ];
    }
}
