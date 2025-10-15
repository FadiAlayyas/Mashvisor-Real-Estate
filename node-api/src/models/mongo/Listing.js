const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Listing', ListingSchema);


