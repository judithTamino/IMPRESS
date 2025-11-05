import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import { JWT_SECRET } from '../config/env.js';

export const protectRoute = asyncHandler(async (req, _res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer'))
    token = token.split(' ')[1];

  if (!token) {
    const error = new Error('Please login.');
    error.statusCode = 401;
    throw error;
  }

  const decodedToken = jwt.verify(token, JWT_SECRET);
  const user = await User.findById(decodedToken._id);

  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    throw error;
  }

  req.user = user;
  next();
});

export const admin = (req, _res, next) => {
  const user = req.user;

  if (user && user.role === 'admin') next();
  else {
    const error = new Error('Unauthorized user.');
    error.statusCode = 401;
    throw error;
  }
}; 