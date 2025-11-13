import Joi from 'joi';
import { Address } from '../models/address.model';

export const orderSchema = Joi.object({
  address: Joi.object(Address).required()
    .messages({
      'object.base': 'Address must be an object.',
      'any:required': 'Address is required.'
    }),
  paymentMethod: Joi.string().required().valid('credit-card', 'paypal', 'google-pay')
    .messages({
      'string.base': 'Payment method must be  string.',
      'any:required': 'Payment method is required.',
      'any.only': 'Payment method must be on of: credit-card, paypal, google-pay'
    })
});