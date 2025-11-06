import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: { type: String, required: true, lowercase: true, minLength: 2, maxLength: 50, trim: true },
  price: { type: Number, required: true, minLength: 50, index:true },
  images: { type: [String], default: []},
  sizes: { type: [String], required: true },
  shape: { type: String, required: true, lowercase: true, minLength: 2 },
  length: { type: String, required: true, enum: ['short', 'medium', 'long'] },
  stock: { type: Number, required: true },
  category: { type: String, required: true, lowercase: true, minLength: 2 },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;