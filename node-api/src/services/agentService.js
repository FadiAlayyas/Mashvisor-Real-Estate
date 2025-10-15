const Agent = require('../models/mongo/Agent');

exports.getActiveAgentsStats = async () => {
  return Agent.aggregate([
    { $match: { active: true } },
    // Join listings collection by agent id
    {
      $lookup: {
        from: 'listings',
        localField: '_id',
        foreignField: 'agentId',
        as: 'listingsData'
      }
    },
    // Filter and compute aggregates
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
  ]);
};
