const repo = require('../repositories/listingRepository');
const { capitalize, formatPrice } = require('../utils/format');

exports.createListing = async (data) => {
  const created = await repo.createListing(data);
  return {
    ...created.dataValues,
    price: formatPrice(created.price)
  };
};

exports.getAllListings = async () => {
  const listings = await repo.getAllListings();
  return listings.map(l => {
    const listingData = l.dataValues;
    return {
      id: listingData.id,
      title: listingData.title,
      city: capitalize(listingData.property.city),
      price: formatPrice(listingData.price),
      bedrooms: listingData.property.beds,
      agentId: listingData.agent_id,
      agentName: listingData.agent.name,
      state: listingData.property.state,
      address: listingData.property.address,
      zipCode: listingData.property.zip_code,
      baths: listingData.property.baths,
      createdAt: listingData.created_at,
      updatedAt: listingData.updated_at
    };
  });
};

exports.getListingById = async (id) => {
  const l = await repo.getListingById(id);
  if (!l) throw { status: 404, message: "Listing not found" };
  
  const listingData = l.dataValues;
  return {
    id: listingData.id,
    title: listingData.title,
    city: capitalize(listingData.property.city),
    price: formatPrice(listingData.price),
    bedrooms: listingData.property.beds,
    agentId: listingData.agent_id,
    agentName: listingData.agent.name,
    state: listingData.property.state,
    address: listingData.property.address,
    zipCode: listingData.property.zip_code,
    baths: listingData.property.baths,
    createdAt: listingData.created_at,
    updatedAt: listingData.updated_at
  };
};

exports.updateListing = async (id, data) => {
  const updatedCount = await repo.updateListing(id, data);
  if (!updatedCount || (Array.isArray(updatedCount) && updatedCount[0] === 0)) {
    throw { status: 404, message: 'Listing not found' };
  }
  const after = await repo.getListingById(id);
  const listingData = after.dataValues;
  return {
    id: listingData.id,
    title: listingData.title,
    city: capitalize(listingData.property.city),
    price: formatPrice(listingData.price),
    bedrooms: listingData.property.beds,
    agentId: listingData.agent_id,
    agentName: listingData.agent.name,
    state: listingData.property.state,
    address: listingData.property.address,
    zipCode: listingData.property.zip_code,
    baths: listingData.property.baths,
    createdAt: listingData.created_at,
    updatedAt: listingData.updated_at
  };
};

exports.deleteListing = async (id) => {
  const deleted = await repo.deleteListing(id);
  if (!deleted) throw { status: 404, message: 'Listing not found' };
  return true;
};
