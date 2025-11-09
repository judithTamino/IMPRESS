import mongoose from 'mongoose';

const phoneRegex = /^0(([23489]\d{7})|(5[0-9]{8}))$/;

export const Address = mongoose.Schema({
  fullName: { type: String, required: true, lowercase: true, minLength: 2, trim: true },
  phone: { type: String, required: true, match: phoneRegex },
  street: { type: String, required: true, lowercase: true, minLength: 2, trim: true },
  city: { type: String, required: true, lowercase: true, minLength: 2, trim: true },
  zip: { type: String, required: true, minLength: 7, maxLength: 7 },
  country: { type: String, required: true, lowercase: true, minLength: 2, trim: true },
  isDefault: { type: Boolean, default: false }
});