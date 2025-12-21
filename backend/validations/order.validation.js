import Joi from 'joi';
import { addressSchema } from '../validations/address.validation.js';

export const orderSchema = Joi.object({
  address: addressSchema.required()
    .messages({
      'object.base': 'Address must be an object.',
      'any:required': 'Address is required.'
    }),
  paymentMethod: Joi.string().required().valid('stripe', 'paypal')
    .messages({
      'string.base': 'Payment method must be  string.',
      'any:required': 'Payment method is required.',
      'any.only': 'Payment method must be on of: stripe or paypal'
    }),
  shipping: Joi.number().min(0).required()
    .messages({
      'number.min': 'Shipping fee must be positive number.',
      'number.empty': 'Shipping fee can not be empty.',
      'any.required': 'Shipping fee is required.'
    })
}); 