<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ListingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'price' => $this->price,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // Property details
            'property' => [
                'id' => $this->property->id,
                'state' => $this->property->state,
                'city' => $this->property->city,
                'zip_code' => $this->property->zip_code,
                'address' => $this->property->address,
                'beds' => $this->property->beds,
                'baths' => $this->property->baths,
                'created_at' => $this->property->created_at,
            ],

            // Agent details
            'agent' => [
                'id' => $this->agent->id,
                'name' => $this->agent->name,
                'email' => $this->agent->email,
                'phone' => $this->agent->phone,
                'created_at' => $this->agent->created_at,
            ],
        ];
    }

    /**
     * Get additional data that should be returned with the resource array.
     *
     * @param  Request  $request
     * @return array
     */
    public function with($request): array
    {
        return [
            'status' => 'success',
            'source' => 'laravel'
        ];
    }
}
