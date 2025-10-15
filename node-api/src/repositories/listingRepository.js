const { Listing, Property, Agent } = require('../models/mysql/Listing');

exports.createListing = (data) => Listing.create(data);

exports.getAllListings = () => {
  return Listing.findAll({
    include: [
      {
        model: Property,
        as: 'property',
        attributes: ['city', 'beds', 'state', 'zip_code', 'address', 'baths']
      },
      {
        model: Agent,
        as: 'agent',
        attributes: ['name', 'email', 'phone']
      }
    ],
    attributes: ['id', 'title', 'price', 'created_at', 'updated_at']
  });
};

exports.getListingById = (id) => {
  return Listing.findByPk(id, {
    include: [
      {
        model: Property,
        as: 'property',
        attributes: ['city', 'beds', 'state', 'zip_code', 'address', 'baths']
      },
      {
        model: Agent,
        as: 'agent',
        attributes: ['name', 'email', 'phone']
      }
    ],
    attributes: ['id', 'title', 'price', 'created_at', 'updated_at']
  });
};

exports.updateListing = (id, data) => Listing.update(data, { where: { id } });

exports.deleteListing = (id) => Listing.destroy({ where: { id } });
