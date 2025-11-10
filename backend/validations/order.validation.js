import Joi from 'joi';
import { Address } from '../models/address.model';

const Item = Joi.object({
  quantity: Joi.number().min(1).required().integer()
    .messages({
      'number.min': 'Quantity must be positive number.'
    }),
});

export const orderSchema = Joi.object({
  items: Joi.array().items(Item).required(),
  address: Joi.object(Address).required()
});