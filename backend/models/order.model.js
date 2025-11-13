import mongoose from 'mongoose';
import { Address } from './address.model.js';
import Item from './item.model.js';



const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: {
    type: [Item],
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
  paidAt: Date,
  shippedAt: Date,
  deliveredAt: Date
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;