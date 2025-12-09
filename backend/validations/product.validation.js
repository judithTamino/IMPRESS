import Joi from 'joi';

const sizeSchema = Joi.object({
  size: Joi.string().required().valid('xxs', 'xs', 's', 'm', 'l')
    .messages({
      'string.empty': 'Size can not be empty.',
      'any.required': 'Size is required.',
      'any.only': 'Size must be one of: xxs, xs, s, m, l.'
    }),
    
  stock: Joi.number().min(0).required()
    .messages({
      'number.min': 'Stock must be positive number.',
      'any.required': 'Stock is required.'
    })
});

export const productSchema = Joi.object({
  name: Joi.string().required()
    .messages({
      'string.empty': 'Name can not be empty.',
      'any.required': 'Name is required.'
    }),

  price: Joi.number().min(0).required()
    .messages({
      'number.min': 'Price must be positive number.',
      'number.empty': 'Price can not be empty.',
      'any.required': 'Price is required.'
    }),

  salePrice: Joi.number().min(0).optional()
    .messages({
      'number.min': 'Price must be positive number.',
    }),

  sizes: Joi.array().items(sizeSchema).required().min(1)
    .messages({
      'array.min': 'You must provide at least 1 size option.',
      'any.required': 'Sizes are required.'
    }),

  shape: Joi.string().required().
    messages({
      'string.empty': 'Shape can not be empty.',
      'any.required': 'Shape is required.'
    }),

  length: Joi.string().valid('short', 'medium', 'long').required().
    messages({
      'string.empty': 'Length can not be empty.',
      'any.required': 'Length is required.',
      'any.only': 'Length must be one of: short, medium, long.'
    }),

  category: Joi.string().required()
    .messages({
      'string.empty': 'Category can not be empty.',
      'any.required': 'Category is required.'
    }),

  collectionName: Joi.string().optional()
    .messages({
      'string.empty': 'Collection can not be empty.',
    })
}).custom((product, helper) => {
  if (product.salePrice && product.salePrice >= product.price)
    return helper.error('any.invalid');

  return product;
}).messages({
  'any.invalid': 'Sale price must be lower than the regular price.'
});