import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: { type: String, required: true, lowercase: true, minLength: 2, maxLength: 50, trim: true },
  description: { type: String, required: true, lowercase: true, minLength: 2, maxLength: 1024, trim: true },
  price: { type: Number, required: true, minLength: 50 },
  images: { type: [String], required: true },
  sizes: { type: [String], required: true },
  shape: { type: String, required: true, lowercase: true, minLength: 2 },
  length: { type: String, required: true, enum: ['short', 'medium', 'long'] },
  collection: { type: String, default: '', lowercase: true, minLength: 2 },
  stock: { type: Number, required: true },
  category: { type: String, required: true, lowercase: true, minLength: 2 },
});

const Product = mongoose.model('Product', productSchema);
export default Product;