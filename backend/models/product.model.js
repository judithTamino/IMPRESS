import mongoose from 'mongoose';

const sizeSchema = mongoose.Schema({
  size: { type: String, required: true, lowercase: true, trim: true, enum: ['xxs', 'xs', 's', 'm', 'l'] },
  stock: { type: Number, required: true, min: 0 }
}, { _id: false });

const productSchema = mongoose.Schema({
  name: { type: String, required: true, lowercase: true, minLength: 2, maxLength: 50, trim: true },
  price: { type: Number, required: true, min: 0, index: true },
  images: { type: [String], default: [] },
  sizes: { type: [sizeSchema], required: true },
  shape: { type: String, required: true, lowercase: true, minLength: 2 },
  length: { type: String, required: true, enum: ['short', 'medium', 'long'] },
  category: { type: String, required: true, lowercase: true, minLength: 2 },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;