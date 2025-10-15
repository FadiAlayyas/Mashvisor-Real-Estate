const ApiResponser = require('../utils/apiResponser');

module.exports = (err, req, res, next) => {
  console.error(err);

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return ApiResponser.badRequest(res, 'Validation Error', err.errors);
  }

  // Handle MongoDB duplicate key errors
  if (err.code === 11000) {
    return ApiResponser.badRequest(res, 'Duplicate Entry', {
      field: Object.keys(err.keyPattern)[0],
      value: Object.values(err.keyValue)[0]
    });
  }

  // Handle other errors
  return ApiResponser.error(
    res,
    err.message || 'Internal Server Error',
    err.status || 500,
    process.env.NODE_ENV === 'development' ? err.stack : undefined
  );
};
