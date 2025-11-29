import mongoose from 'mongoose';

const sizeSchema = mongoose.Schema({
  size: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    enum: ['xxs', 'xs', 's', 'm', 'l']
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  }
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  salePrice: {
    type: Number,
    min: 0
  },
  images: {
    type: [String],
    required: true,
  },
  sizes: {
    type: [sizeSchema],
    required: true
  },
  shape: {
    type: String,
    required: true,
    lowercase: true
  },
  length: {
    type: String,
    required: true,
    enum: ['short', 'medium', 'long']
  },
  category: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  collectionName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;