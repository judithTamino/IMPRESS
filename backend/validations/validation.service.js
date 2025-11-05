import { signupSchema, loginSchema } from './auth.validation.js';
import { productSchema } from './product.validation.js';

// AUTH
export const signupValidation = user => {
  const { error } = signupSchema.validate(user);
  if (error) return error.details.map(detail => detail.message);
};

export const loginValidation = user => {
  const { error } = loginSchema.validate(user);
  if (error) return error.details.map(detail => detail.message);
}

// PRODUCT
export const productValidation = product => {
const {error} = productSchema.validate(product);
if (error) return error.details.map(detail => detail.message);
}

// USER
