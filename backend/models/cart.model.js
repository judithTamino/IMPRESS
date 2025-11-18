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

cartSchema.methods.findCartItem = function(productId, size) {
  return this.items.find(item => item.product.toString() === productId && item.size === size);
};

cartSchema.methods.calculateTotal = function() {
  return this.items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);
};

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;