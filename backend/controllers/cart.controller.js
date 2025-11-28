import asyncHandler from 'express-async-handler';
import Product from '../models/product.model.js';
import Cart from '../models/cart.model.js';

// @des    Add item to cart
// @route  POST api/cart/:id
// @access private
export const addToCart = asyncHandler(async (req, res) => {
  // const userId = req.user._id;
  // const productId = req.params.id;
  // const { quantity, size } = req.body.items[0];

  // const product = await Product.findById(productId);
  // if (!product || product.isDeleted) {
  //   const error = new Error('Product not available.');
  //   error.statusCode = 404;
  //   throw error;
  // }

  // const isOutOfStock = product.sizes.find(s => s.size === size && s.stock === 0);
  // if (isOutOfStock) {
  //   const error = new Error(`${product.name} is out of stock.`);
  //   error.statusCode = 400;
  //   throw error;
  // }

  // let cart = await Cart.findOne({ user: userId });
  // if (!cart) cart = new Cart({ user: userId, items: [] });

  // const exsistingProduct = cart.items.find(item => item.product.toString() === productId && item.size === size);

  // if (exsistingProduct) {
  //   exsistingProduct.quantity = quantity;
  // } else
  //   cart.items.push({
  //     product: productId,
  //     name: product.name,
  //     size,
  //     quantity,
  //     price: product.price,
  //     image: product.images[0]
  //   })

  // cart.totalPrice = cart.calculateTotal();

  // await cart.save();
  // res.status(201).json({ msg: `${product.name} added to cart.`, cart: cart });
});

// @des    Get all items in cart
// @route  GET api/cart
// @access private
export const getCartProducts = asyncHandler(async (req, res) => {
  // const userId = req.user.id;
  // const updatedCartItems = [];

  // const cart = await Cart.findOne({ user: userId });
  // if (!cart) {
  //   const error = new Error('Cart empty.');
  //   error.statusCode = 404;
  //   throw error;
  // }

  // for (const item of cart.items) {
  //   const product = await Product.findById(item.product);

  //   if (!product || product.isDeleted) {
  //     updatedCartItems.push({ ...item.toObject(), isDeleted: true, msg: 'Discontinued' });
  //     continue;
  //   }

  //   const productSize = product.sizes.find(s => s.size === item.size);
  //   const isOutOfStock = !productSize || productSize.stock === 0;
  
  //   updatedCartItems.push({
  //     ...item.toObject(),
  //     name: product.name,
  //     image: product.images[0],
  //     price: product.price,
  //     oldPrice: item.price !== product.price ? item.price : null,
  //     outOfStock: isOutOfStock ? 'Out of stock' : null
  //   });
  // }

  // const totalPrice = updatedCartItems.reduce((accumulator, item) => item.isOutOfStock ? accumulator : accumulator + item.price * item.quantity, 0);


  // res.status(200).json({ items: updatedCartItems, totalPrice: totalPrice });
});

// @des    delete item from cart
// @route  DELETE api/cart
// @access private
export const removeAllFromCart = asyncHandler(async (req, res) => {
  // const { productId, size } = req.body;
  // const userId = req.user.id;

  // const cart = await Cart.findOne({ user: userId }).select('items totalPrice');
  // if (!cart) {
  //   const error = new Error('Cart empty.');
  //   error.statusCode = 404;
  //   throw error;
  // }

  // cart.items = cart.removePriductFromCart(productId, size);
  // cart.totalPrice = cart.calculateTotal();
  // await cart.save();

  // res.status(200).json({ msg: 'Product remove.', cart: cart });
});

