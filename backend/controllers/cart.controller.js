import asyncHandler from 'express-async-handler';
import * as cartService from '../services/cart.service.js';

// @des    Get all items in cart
// @route  GET api/cart
// @access private
export const getCartProducts = asyncHandler(async (req, res) => {
  const cart = await cartService.getCart(req.user.id);

  res.status(200).json({
    success: true,
    message: 'cart items',
    cart
  });
});

// @des    Add item to cart
// @route  POST api/cart/:id
// @access private
export const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.id;
  const { quantity, size } = req.body.items[0];

  const cart = await cartService.addToCart(userId, productId, quantity, size);

  res.status(201).json({
    success: true,
    message: 'item added to catr.',
    cart
  });
});


// @des    delete item from cart
// @route  DELETE api/cart/:id
// @access private
export const removeFromCart = asyncHandler(async (req, res) => {
  const { size } = req.body;
  const userId = req.user.id;
  const productId  = req.params.id;

  const cart = await cartService.removeFromCart(userId, productId, size);

    res.status(200).json({
    success: true,
    message: 'item removed from cart.',
    cart
  });
});

