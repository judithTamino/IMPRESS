import Joi from 'joi';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

export const signupSchema = Joi.object({
  firstName: Joi.string().required()
    .messages({
      'string.empty': 'First name can not be empty.',
      'any.required': 'First name is required.'
    }),

  lastName: Joi.string().required()
    .messages({
      'string.empty': 'Last name can not be empty.',
      'any.required': 'Last name is required'
    }),

  email: Joi.string().email().required()
    .messages({
      'string.email': 'Email must be a valid email address.',
      'string.empty': 'Email can not be empty.',
      'any.required': 'Email is required.'
    }),

  password: Joi.string().pattern(passwordRegex).required()
    .messages({
      'string.pattern.base': 'Password must be 8-16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*-).',
      'string.empty': 'Password can not be empty.',
      'any.required': 'Password is required.'
    })
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.email': 'Email must be a valid email address.',
      'string.empty': 'Email can not be empty.',
      'any.required': 'Email is required.'
    }),

  password: Joi.string().pattern(passwordRegex).required()
    .messages({
      'string.pattern.base': 'Password must be 8-16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*-).',
      'string.empty': 'Password can not be empty.',
      'any.required': 'Password is required.'
    }),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.email': 'Email must be a valid email address.',
      'string.empty': 'Email can not be empty.',
      'any.required': 'Email is required.'
    }),
  otp: Joi.string().max(6).min(6).required()
    .messages({
      'string.empty': 'OTP can not be empty.',
      'string.min': 'OTP must be 6 digit.',
      'string.max': 'OTP must be 6 digit.',
      'any.required': 'OTP is required.'
    }),
  password: Joi.string().pattern(passwordRegex).required()
    .messages({
      'string.pattern.base': 'Password must be 8-16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*-).',
      'string.empty': 'Password can not be empty.',
      'any.required': 'Password is required.'
    }),
});

export const otpSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.email': 'Email must be a valid email address.',
      'string.empty': 'Email can not be empty.',
      'any.required': 'Email is required.'
    }),
});