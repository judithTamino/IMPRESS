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
    required: true, 
    min: 1
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
}, { timestamps: true });


const Cart = mongoose.model('Cart', cartSchema);
export default Cart;