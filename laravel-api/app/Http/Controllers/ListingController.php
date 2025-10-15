<?php

namespace App\Http\Controllers;

use App\Http\Resources\ListingResource;
use App\Services\ListingService;
use App\Traits\ApiResponser;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class ListingController extends Controller
{
    use ApiResponser;

    protected ListingService $listingService;

    public function __construct(ListingService $listingService)
    {
        $this->listingService = $listingService;
    }

    /**
     * Display a listing of the properties.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $listings = $this->listingService->getListingsWithRelations();
            return $this->successResponse(
                ListingResource::collection($listings)->response()->getData(true)
            );
        } catch (\Exception $e) {
            Log::error('Failed to fetch listings: ' . $e->getMessage());
            return $this->errorResponse('Failed to fetch listings', 500, ['error' => $e->getMessage()]);
        }
    }
}
