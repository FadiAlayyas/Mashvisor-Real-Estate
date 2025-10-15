const Joi = require('joi');

const base = {
  title: Joi.string()
    .min(3)
    .max(255)
    .messages({
      'string.base': 'Title must be a text string',
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 3 characters',
      'string.max': 'Title must be at most 255 characters',
    }),
  price: Joi.number()
    .positive()
    .precision(2)
    .messages({
      'number.base': 'Price must be a number',
      'number.positive': 'Price must be greater than 0',
      'number.precision': 'Price can have at most 2 decimal places',
      'any.required': 'Price is required',
    }),
  // maps to properties.id
  property_id: Joi.number()
    .integer()
    .positive()
    .messages({
      'number.base': 'Property ID must be a number',
      'number.integer': 'Property ID must be an integer',
      'number.positive': 'Property ID must be greater than 0',
      'any.required': 'Property ID is required',
    }),
  // maps to agents.id
  agent_id: Joi.number()
    .integer()
    .positive()
    .messages({
      'number.base': 'Agent ID must be a number',
      'number.integer': 'Agent ID must be an integer',
      'number.positive': 'Agent ID must be greater than 0',
      'any.required': 'Agent ID is required',
    })
};

const createListingSchema = Joi.object({
  title: base.title.required().messages({ 'any.required': 'Title is required' }),
  price: base.price.required(),
  property_id: base.property_id.required(),
  agent_id: base.agent_id.required()
}).messages({
  'object.unknown': 'The field "{{#label}}" is not allowed'
});

const updateListingSchema = Joi.object({
  title: base.title,
  price: base.price,
  property_id: base.property_id,
  agent_id: base.agent_id
})
  .min(1)
  .messages({
    'object.min': 'Provide at least one field to update (title, price, property_id, agent_id)',
    'object.unknown': 'The field "{{#label}}" is not allowed'
  });

module.exports = { createListingSchema, updateListingSchema };


