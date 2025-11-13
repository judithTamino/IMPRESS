import mongoose from 'mongoose';
import Item from './item.model.js';

const cartSchema = mongoose.Schema({
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
    default: 0
  },
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;