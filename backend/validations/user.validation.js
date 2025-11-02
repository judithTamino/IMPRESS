import Joi from 'joi';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;
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

export const userSchema = Joi.object({
  firstName: Joi.string().alphanum().min(2).required()
    .messages({
      'string.alphanum': 'First name must contain only letters.',
      'string.min': 'First name must be at least 2 characters long.',
      'string.required': 'First name is required.'
    }),

  lastName: Joi.string().alphanum().min(2).required()
    .messages({
      'string.alphanum': 'Last name must contain only letters.',
      'string.min': 'Last name must be at least 2 characters long.',
      'string.empty': 'Last name is required'
    }),

  email: Joi.string().email().required()
    .messages({
      'string.email': 'Email must be a valid email address.',
      'string.empty': 'Email is required.'
    }),

  password: Joi.string().pattern(passwordRegex).required()
    .messages({
      'string.pattern.base': 'Password must be 8-16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*-).',
      'string.empty': 'Password is required.'
    }),

  addresses: Joi.array().items(addressSchema).allow('')
    .messages({
      'array.base': 'Addresses must be an array of address objects.'
    }),
  role: Joi.string().allow('')
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.empty':'Email is required.',
      'string.email': 'Email must be a valid email address.',
    }),

  password: Joi.string().pattern(passwordRegex).required()
    .messages({
      'string.pattern.base': 'Password must be 8-16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*-).',
      'string.empty': 'Password is required.'
    }),
});

