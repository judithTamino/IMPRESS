import Joi from 'joi';

const phoneRegex = /^(?:\+972-?|0)(?:[23489]|5[0-9])-?\d{7}$/;

export const addressSchema = Joi.object({
  fullName: Joi.string().min(2).required()
    .messages({
      'string.min': 'Full name must be at least 2 characters long.',
      'string.empty': 'Full name is required.'
    }),

  phone: Joi.string().pattern(phoneRegex).required()
    .messages({
      'string.pattern.base': 'Phone must be valid Israeli phone number.',
      'string.empty': 'Phone is required.'
    }),

  street: Joi.string().min(2).required()
    .messages({
      'string.min': 'Street must be at least 2 characters long.',
      'string.empty': 'Street is required.'
    }),

  city: Joi.string().min(2).required()
    .messages({
      'string.min': 'City must be at least 2 characters long.',
      'string.empty': 'City is required.'
    }),

  zip: Joi.string().min(7).max(7).required()
    .messages({
      'string.min': 'Zip must be 7 characters long.',
      'string.max': 'Zip must be 7 characters long.',
      'string.empty': 'Zip is required.'
    }),

  country: Joi.string().min(2).required()
    .messages({
      'string.min': 'Country must be at least 2 characters long.',
      'string.empty': 'Country is required.'
    }),

  isDefault: Joi.boolean().allow('')
});