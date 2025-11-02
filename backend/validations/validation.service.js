import { loginSchema, userSchema } from './user.validation.js';

export const userValidation = user => {
  const { error } = userSchema.validate(user);
  if (error) return error.details.map(detail => detail.message);
};

export const loginValidation = user => {
  const { error } = loginSchema.validate(user);
  if (error) return error.details.map(detail => detail.message);
}