// Initialize MongoDB with data from JSON files
db = db.getSiblingDB('realestate');

// Clear existing collections
db.agents.drop();
db.listings.drop();
db.views.drop();

// Create collections
db.createCollection('agents');
db.createCollection('listings');
db.createCollection('views');

// Insert agents data from agents.json
db.agents.insertMany([
  { "_id": 101, "name": "Alice Smith", "active": true, "createdAt": new Date(), "updatedAt": new Date() },
  { "_id": 102, "name": "Bob Johnson", "active": false, "createdAt": new Date(), "updatedAt": new Date() },
  { "_id": 103, "name": "Carol Lee", "active": true, "createdAt": new Date(), "updatedAt": new Date() }
]);

// Insert listings data from listings.json
db.listings.insertMany([
  { "_id": 1, "title": "Modern Apartment", "city": "New York", "agentId": 101, "price": 250000, "bedrooms": 2, "createdAt": new Date(), "updatedAt": new Date() },
  { "_id": 2, "title": "Cozy Suburban Home", "city": "Chicago", "agentId": 102, "price": 320000, "bedrooms": 3, "createdAt": new Date(), "updatedAt": new Date() },
  { "_id": 3, "title": "Luxury Condo", "city": "New York", "agentId": 103, "price": 450000, "bedrooms": 4, "createdAt": new Date(), "updatedAt": new Date() }
]);

// Insert views data from views.json
db.views.insertMany([
  { "listingId": 1, "date": "2025-09-01", "views": 100, "createdAt": new Date() },
  { "listingId": 1, "date": "2025-09-10", "views": 80, "createdAt": new Date() },
  { "listingId": 2, "date": "2025-09-05", "views": 50, "createdAt": new Date() },
  { "listingId": 3, "date": "2025-09-08", "views": 200, "createdAt": new Date() }
]);

// Add views field to listings based on views collection
db.listings.find().forEach(function(listing) {
  var totalViews = 0;
  db.views.find({listingId: listing._id}).forEach(function(view) {
    totalViews += view.views;
  });
  db.listings.updateOne({_id: listing._id}, {$set: {views: totalViews}});
});

// Create indexes for better performance
db.listings.createIndex({ "agentId": 1 });
db.listings.createIndex({ "price": 1 });
db.listings.createIndex({ "city": 1 });
db.agents.createIndex({ "active": 1 });

// Verify data insertion
print("=== MongoDB Initialization Summary ===");
print("Agents inserted: " + db.agents.countDocuments());
print("Listings inserted: " + db.listings.countDocuments());
print("Views inserted: " + db.views.countDocuments());
print("Active agents: " + db.agents.countDocuments({ active: true }));
print("Listings with price > 300,000: " + db.listings.countDocuments({ price: { $gt: 300000 } }));

// Test aggregation for active agents stats
print("\n=== Testing Active Agents Aggregation ===");
const stats = db.agents.aggregate([
  { $match: { active: true } },
  {
    $lookup: {
      from: 'listings',
      localField: '_id',
      foreignField: 'agentId',
      as: 'listingsData'
    }
  },
  {
    $addFields: {
      listingsAbove300k: {
        $filter: {
          input: '$listingsData',
          as: 'l',
          cond: { $gt: ['$$l.price', 300000] }
        }
      },
      totalViews: {
        $sum: {
          $map: {
            input: {
              $filter: {
                input: '$listingsData',
                as: 'lv',
                cond: { $gt: ['$$lv.price', 300000] }
              }
            },
            as: 'v',
            in: { $ifNull: ['$$v.views', 0] }
          }
        }
      }
    }
  },
  {
    $project: {
      agent: '$name',
      listings: { $size: '$listingsAbove300k' },
      totalViews: { $ifNull: ['$totalViews', 0] }
    }
  },
  { $sort: { totalViews: -1 } }
]).toArray();

stats.forEach(stat => {
  print(`Agent: ${stat.agent}, Listings: ${stat.listings}, Total Views: ${stat.totalViews}`);
});

print("\nMongoDB initialization completed successfully!");
