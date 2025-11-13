import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/user.model.js';
import { ADMIN_EMAIL, JWT_SECRET } from '../config/env.js';

// @des    Register a new user
// @route  POST api/auth/signup
// @access public
export const signup = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('Email already exist.');
    error.statusCode = 400;
    throw error;
  }

  // Create admin
  let role = 'user';
  if (email === ADMIN_EMAIL) role = 'admin';

  // Create new user
  await User.create({ firstName, lastName, email, password, role });
  res.status(201).json({ msg: 'User created successfully' });
});

// @des    Login user
// @route  POST api/auth/login
// @access public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;


  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user);
    res.status(200).json({ msg: `${user.firstName} ${user.lastName} logged-in successfully.`, token: token });
  } else {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;

  }
});

// generate JWT Token
const generateToken = user => jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });