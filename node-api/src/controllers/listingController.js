const service = require('../services/listingService');
const ApiResponser = require('../utils/apiResponser');

exports.create = async (req, res, next) => {
  try {
    const listing = await service.createListing(req.body);
    return ApiResponser.created(res, listing, 'Listing created successfully');
  } catch (err) { next(err); }
};

exports.getAll = async (req, res, next) => {
  try {
    const listings = await service.getAllListings();
    return ApiResponser.collection(res, listings);
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const listing = await service.getListingById(req.params.id);
    if (!listing) {
      return ApiResponser.notFound(res, 'Listing not found');
    }
    return ApiResponser.success(res, listing);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await service.updateListing(req.params.id, req.body);
    res.json(updated);
  } catch (err) { next(err); }
};

exports.delete = async (req, res, next) => {
  try {
    await service.deleteListing(req.params.id);
    res.json({ message: 'Listing deleted' });
  } catch (err) { next(err); }
};
