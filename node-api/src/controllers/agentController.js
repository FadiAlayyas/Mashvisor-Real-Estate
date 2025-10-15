const service = require('../services/agentService');
const ApiResponser = require('../utils/apiResponser');

exports.getStats = async (req, res, next) => {
  try {
    const stats = await service.getActiveAgentsStats();
    return ApiResponser.success(res, stats, 'Agent statistics retrieved successfully');
  } catch (err) { next(err); }
};
