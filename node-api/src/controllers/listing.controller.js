const listingService = require('../services/listing.service');
const ApiResponse = require('../utils/ApiResponse');
const AppError = require('../utils/AppError');
const asyncHandler = require('../middlewares/async');

/**
 * Get all listings
 * @route GET /api/listings
 */
exports.getListings = asyncHandler(async (req, res) => {
  const listings = await listingService.getListingsWithRelations();
  res.json(ApiResponse.success(listings));
});

/**
 * Get listing by ID
 * @route GET /api/listings/:id
 */
exports.getListing = asyncHandler(async (req, res) => {
  const listing = await listingService.getById(req.params.id);
  res.json(ApiResponse.success(listing));
});

/**
 * Create new listing
 * @route POST /api/listings
 */
exports.createListing = asyncHandler(async (req, res) => {
  const listing = await listingService.createListing(req.body);
  res.status(201).json(ApiResponse.success(listing, 'Listing created successfully'));
});

/**
 * Update listing
 * @route PUT /api/listings/:id
 */
exports.updateListing = asyncHandler(async (req, res) => {
  const listing = await listingService.update(req.params.id, req.body);
  res.json(ApiResponse.success(listing, 'Listing updated successfully'));
});

/**
 * Delete listing
 * @route DELETE /api/listings/:id
 */
exports.deleteListing = asyncHandler(async (req, res) => {
  await listingService.delete(req.params.id);
  res.json(ApiResponse.success(null, 'Listing deleted successfully'));
});