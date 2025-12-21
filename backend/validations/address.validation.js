import Joi from 'joi';

const phoneRegex = /^(?:\+972-?|0)(?:[23489]|5[0-9])-?\d{7}$/;

export const addressSchema = Joi.object({
  fullName: Joi.string().required()
    .messages({
      'string.empty': 'Full name can not be empty.',
      'any.required': 'Full name is required.'
    }),

  phone: Joi.string().pattern(phoneRegex).required()
    .messages({
      'string.pattern.base': 'Phone must be valid Israeli phone number.',
      'string.empty': 'Phone can not be empty.',
      'any.required': 'Phone is required.'
    }),

  street: Joi.string().required()
    .messages({
      'string.empty': 'Street can not be empty.',
      'any.required': 'Street is required.'
    }),

  city: Joi.string().required()
    .messages({
      'string.empty': 'City can not be empty.',
      'any.required': 'City is required.'
    }),

  zip: Joi.string().min(7).max(7).required()
    .messages({
      'string.min': 'Zip must be 7 characters long.',
      'string.max': 'Zip must be 7 characters long.',
      'string.empty': 'Zip can not be empty.',
      'any.required': 'Zip is required.'
    }),

  country: Joi.string().required()
    .messages({
      'string.empty': 'Country can not be empty.',
      'any.required': 'Country is required.'
    }),

  isDefault: Joi.boolean().allow('')
});