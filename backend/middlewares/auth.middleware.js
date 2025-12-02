import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/user.model.js';
import { JWT_SECRET } from '../config/env.js';
import { CustomError } from '../utils/error.utils.js';

export const protectRoute = asyncHandler(async (req, _res, next) => {
  const { token } = req.cookies;

  if (!token)
    throw new CustomError('Access denied: Missing or invalid token.', 401);

  const decodedToken = jwt.verify(token, JWT_SECRET);

  const user = await User.findById(decodedToken._id);

  if (!user)
    throw new CustomError('User not found.', 404);

  req.user = user;
  next();
});

export const adminRoute = (req, _res, next) => {
  const user = req.user;

  if (user && user.role === 'admin')
    next();
  else
    throw new CustomError('Access denied: Admin only.', 401);
}; 