import asyncHandler from 'express-async-handler';
import * as authService from '../services/auth.service.js';
import { setAuthCookie, clearAuthCookie } from '../utils/token.utils.js';

// @des    Register a new user
// @route  POST api/auth/signup
// @access public
export const signup = asyncHandler(async (req, res) => {
  const { user, token } = await authService.signup(req.body);
  setAuthCookie(res, token);

  res.status(201).json({
    success: true,
    message: 'Sign Up',
    user
  });
});

// @des    Login user
// @route  POST api/auth/login
// @access public
export const login = asyncHandler(async (req, res) => {
  const token = await authService.login(req.body);
  setAuthCookie(res, token);

  res.status(200).json({
    success: true,
    message: 'Logged In',
    token
  });
});

// @des    Logout user
// @route  POST api/auth/logout
// @access public
export const logout = asyncHandler(async (req, res) => {
  clearAuthCookie(res);
  res.status(200).json({
    success: true,
    message: 'Logged Out',
  });
});

// @des    Send Reset Password OTP to Email
// @route  POST api/auth/send-reset-password-otp
// @access public
export const sendResetPasswordOTP = asyncHandler(async (req, res) => {
  await authService.sendResetPasswordOTP(req.body.email);
  res.status(200).json({
    success: true,
    message: 'OTP sent to your email.',
  });
});

// @des    Reset Password
// @route  POST api/auth/reset-password
// @access private
export const resetPassword = asyncHandler(async (req, res) => {
  await authService.resetPassword(req.body);
  res.status(200).json({
    success: true,
    message: 'Your password has been reset successfully.',
  })
});
