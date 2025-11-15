import asyncHandler from 'express-async-handler';
import Product from '../models/product.model.js';
import Cart from '../models/cart.model.js';

// @des    Add item to cart
// @route  POST api/cart/:id
// @access private
export const addItemToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.id;
  const { quantity, size } = req.body.items[0];

  const product = await Product.findById(productId);
  if (!product || product.isDeleted) {
    const error = new Error('Product not available.');
    error.statusCode = 404;
    throw error;
  }

  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = new Cart({ user: userId, items: [] });

  const areThereProducts = cart.items.find(item => item.product.toString() === productId && item.size === size
  );

  if (areThereProducts) areThereProducts.quantity += quantity;
  else
    cart.items.push({
      product: productId,
      name: product.name,
      size,
      quantity,
      price: product.price,
      image: product.images[0]
    })


  cart.totalPrice = cart.items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);

  await cart.save();
  res.status(201).json({ msg: `${product.name} added to cart.`, cart: cart });
});

// @des    Get all items in cart
// @route  GET api/cart/
// @access private
export const getAllItems = asyncHandler(async (req, res) => { });

// @des    delete item from cart
// @route  DELETE api/cart/:id
// @access private
export const removeItemFromCart = asyncHandler(async (req, res) => { });

