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
    validate: imgs => imgs.length > 0
  },
  sizes: {
    type: [sizeSchema],
    required: true
  },
  shape: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
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
    lowercase: true,
    trim: true,
    default: ''
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

productSchema.index({ shape: 1 });
productSchema.index({ length: 1 });
productSchema.index({ category: 1 });
productSchema.index({ collectionName: 1 });

productSchema.index({ createdAt: -1 });
productSchema.index({ price: 1 });

productSchema.index({ "sizes.size": 1 });
productSchema.index({ "sizes.stock": 1 });

const Product = mongoose.model('Product', productSchema);
export default Product;