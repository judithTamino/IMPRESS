import mongoose from 'mongoose';

const cartItemsSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
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
    required: true, min: 1
  },
}, { _id: false });

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: {
    type: [cartItemsSchema],
    required: true
  },
  totalPrice: {
    type: Number,
    default: 0
  },
}, { timestamps: true });

cartSchema.methods.removeProductFromCart = function (productId, size) {
  return this.items.filter(
    item => !(item.product.toString() === productId && item.size === size));
};

cartSchema.methods.calculateTotal = function () {
  return this.items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);
};

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;