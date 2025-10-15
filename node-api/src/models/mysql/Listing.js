const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.mysql');

const Listing = sequelize.define('Listing', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  property_id: { type: DataTypes.INTEGER, allowNull: false },
  agent_id: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(12,2), allowNull: false },
}, {
  tableName: 'listings',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Define associations (will be used in repository)
const Property = sequelize.define('Property', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  state: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  zip_code: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  beds: { type: DataTypes.INTEGER, allowNull: false },
  baths: { type: DataTypes.DECIMAL(3,1), allowNull: false },
}, {
  tableName: 'properties',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

const Agent = sequelize.define('Agent', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.STRING },
}, {
  tableName: 'agents',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Define associations
Listing.belongsTo(Property, { foreignKey: 'property_id', as: 'property' });
Listing.belongsTo(Agent, { foreignKey: 'agent_id', as: 'agent' });

module.exports = { Listing, Property, Agent };
