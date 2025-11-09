import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Address } from './address.model.js';

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, lowercase: true, minLength: 2, trim: true },
  lastName: { type: String, required: true, lowercase: true, minLength: 2, trim: true },
  email: { type: String, required: true, trim: true, unique: true, index: true, match: RegExp(emailRegex) },
  password: { type: String, required: true, minLength: 8, maxLength: 16, match: RegExp(passwordRegex) },
  addresses: { type: [Address], default: [] },
  role: { type: String, default: 'user' }
}, {timestamps: true});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();

  } catch (error) {
    next(error);
  }
});

// Compare password when login
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
export default User;