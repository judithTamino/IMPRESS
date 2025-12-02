import jwt from 'jsonwebtoken';
import { JWT_SECRET, ENV } from '../config/env.js';

export const generateToken = user => jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

export const setAuthCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: ENV === 'production',
    sameSite: ENV === 'production' ? 'none' : 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};

export const clearAuthCookie = (res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: ENV === 'production',
    sameSite: ENV === 'production' ? 'none' : 'strict',
  });
}