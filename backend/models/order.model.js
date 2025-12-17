import mongoose from 'mongoose';
import { Address } from './address.model.js';

const orderItemsSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  size: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    enum: ['xxs', 'xs', 's', 'm', 'l']
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  }
});


const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  items: {
    type: [orderItemsSchema],
    required: true
  },

  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },

  address: {
    type: Address,
    required: true
  },

  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },

  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit-card', 'paypal', 'google-pay'],
  },

  isPaid: {
    type: Boolean,
    default: false
  },

  stripSessionId: {
    type: String,
    unique: true
  },

  paidAt: Date,
  shippedAt: Date,
  deliveredAt: Date
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;