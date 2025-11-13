import Joi from 'joi';

const itemSchema = Joi.object({
  quantity: Joi.number().required().integer().min(1)
    .messages({
      'number.base': 'Quantity must be a number.',
      'number.required': 'Quantity is required.',
      'number.min': 'Quantity must be at least 1.'
    }),
  size: Joi.string().required().valid('XXS', 'XS', 'S', 'M', 'L')
    .messages({
      'string.base': 'Size must be a string.',
      'string.required': 'Size is required.',
      'any.only': 'Size must be one of: xxs, xs, s, m, l.'
    })
});

export const cartSchema = Joi.object({
  items: Joi.array().items(itemSchema).min(1).required()
    .messages({
      'any.required': 'Cart items are required.',
      'array.min': 'Cart must contain at least one item.',
      'array.base': 'Items must be an array.'
    })
});