import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';

import { CustomError } from '../utils/error.utils.js';
import { generateToken } from '../utils/token.utils.js';

import { ADMIN_EMAIL, SENDER_EMAIL } from '../config/env.js';
import transporter from '../config/nodemailer.js';


export const signup = async (userData) => {
  const user = await User.findOne({ email: userData.email });
  if (user)
    throw new CustomError('user already exsist', 400);

  let role = 'user';
  if (userData.email === ADMIN_EMAIL)
    role = 'admin';

  const token = generateToken(userData);
  const newUser = await User.create(userData);

  const mailOption = {
    from: SENDER_EMAIL,
    to: userData.email,
    subject: 'Customer account confirmation',
    text: `${userData.firstName.toUpperCase()}, Welcome to IMPRESS, your new obsession`
  }

  await transporter.sendMail(mailOption);

  return { user: newUser, token };
};

export const login = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    throw new CustomError('Invalid email or password.', 401);

  return generateToken(userData);
}

export const sendResetPasswordOTP = async (email) => {
  const user = await User.findOne({ email });
  if (!user)
    throw new CustomError('User not found', 404);

  // Generate OTP
  const otp = String(Math.floor(100000 + Math.random() * 900000));

  // Hash OTP
  const salt = await bcrypt.genSalt(10);
  const hashOtp = await bcrypt.hash(otp, salt);

  user.resetOtp = hashOtp;
  user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // 15 min

  await user.save({ validateBeforeSave: false });

  const mailOption = {
    from: SENDER_EMAIL,
    to: email,
    subject: 'Customer account password reset',
    text: `Your OTP for resetting your password is ${otp}. It will expires in 15 minutes.`
  }

  await transporter.sendMail(mailOption);
}

const verifyResetPasswordOTP = async (email, otp) => {
  const user = await User.findOne({ email });
  if (!user)
    throw new CustomError('User not found', 404);

  if(!user.resetOtp || Date.now() > user.resetOtpExpireAt)
    throw new CustomError('OTP invalid or expired', 400);

  const isMatch = await bcrypt.compare(otp, user.resetOtp);

  if(!isMatch)
    throw new CustomError('Incorrect OTP', 400);

  return user;
}

export const resetPassword = async (userData) => {
  const { email, otp, password } = userData;

  const user = await verifyResetPasswordOTP(email, otp);

  user.password = password;
  user.resetOtp = undefined;
  user.resetOtpExpireAt = undefined;
  await user.save();
} 