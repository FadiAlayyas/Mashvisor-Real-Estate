const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
  views: { type: Number, default: 0 },
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Agent', AgentSchema);
