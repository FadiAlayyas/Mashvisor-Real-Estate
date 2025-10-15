<?php

namespace App\Services;

use App\Models\Listing;

class ListingService extends BaseService
{
    public function __construct(Listing $listing)
    {
        $this->model = $listing;
    }

    /**
     * Get listings with related data
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getListingsWithRelations()
    {
        return $this->model->with(['property', 'agent'])->get();
    }
}
