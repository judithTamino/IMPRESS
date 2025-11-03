import Joi from 'joi';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

export const signupSchema = Joi.object({
  firstName: Joi.string().min(2).required()
    .messages({
      'string.min': 'First name must be at least 2 characters long.',
      'string.required': 'First name is required.'
    }),

  lastName: Joi.string().min(2).required()
    .messages({
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
    
  role: Joi.string().allow('')
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Email must be a valid email address.',
    }),

  password: Joi.string().pattern(passwordRegex).required()
    .messages({
      'string.pattern.base': 'Password must be 8-16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*-).',
      'string.empty': 'Password is required.'
    }),
});