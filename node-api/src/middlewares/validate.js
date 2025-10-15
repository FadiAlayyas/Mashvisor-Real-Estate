// Generic Joi validation middleware
module.exports = (schema) => {
  return (req, res, next) => {
    const options = { abortEarly: false, allowUnknown: false, stripUnknown: true };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      const details = error.details.map(d => ({ message: d.message, path: d.path }));
      const combined = details.map(d => d.message).join('; ');
      return res.status(400).json({
        error: true,
        message: combined || 'Validation error',
        details
      });
    }
    req.body = value;
    next();
  };
};


