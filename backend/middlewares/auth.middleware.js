import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import { JWT_SECRET } from '../config/env.js';

export const protectRoute = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer'))
    token = token.split(' ')[1];

  if (!token) {
    res.status = 401;
    throw new Error('Please login.');
  }

  const decodedToken = jwt.verify(jwt, JWT_SECRET);
  const user = await User.findById(decodedToken._id);

  if (!user) {
    res.status = 404;
    throw new Error('User not found.');
  }

  req.user = user;
  next();
});

export const admin = (req, res, next) => {
  const user = req.user;

  if (user && user.role === 'admin') next();
  else {
    res.status = 401;
    throw new Error('Unauthorized user.');
  }
}; 