import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().min(2).max(50).required()
    .messages({
      'string.min': 'Name must be at least 2 characters long.',
      'string.max': 'Name must be less than 50 characters long.',
      'string.required': 'Name is required.'
    }),
  price: Joi.number().min(50).required()
    .messages({
      'number.min': 'Price must be at least 50.',
      'number.required': 'Price is required.'
    }),
  images: Joi.array().items(Joi.string())
    .messages({
      'array.base': 'Images must be array of string.',
      // 'array.required': 'Images is required.'
    }),
  sizes: Joi.array().items(Joi.string()).required()
    .messages({
      'array.base': 'Sizes must be array of string.',
      'array.required': 'Sizes is required.'
    }),
  shape: Joi.string().min(2).required().
    messages({
      'string.min': 'Shape must be at least 2 characters long.',
      'string.required': 'Shape is required.'
    }),
  length: Joi.string().valid('short', 'medium', 'long').min(2).required().
    messages({
      'string.min': 'Length must be at least 2 characters long.',
      'string.required': 'Length is required.'
    }),
  stock: Joi.number().min(0).required()
    .messages({
      'number.min': 'Stock must be positive number.',
      'number.required': 'Stock is required.'
    }),
  category: Joi.string().min(2).required()
    .messages({
      'string.min': 'Category must be at least 2 characters long.',
      'string.required': 'Category is required.'
    })
});