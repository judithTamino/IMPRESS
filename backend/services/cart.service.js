import Cart from '../models/cart.model.js';
import Product from "../models/product.model.js";

import { CustomError } from '../utils/error.utils.js';
import { findProductSize, getProductsMap, validateCartItems } from '../utils/cart.utils.js';

export const getCart = async (user) => {
  const cart = await Cart.findOne({ user });
  if (!cart)
    return {
      items: [],
      totalPrice: 0
    };

  const products = await getProductsMap(cart.items);
  const { validItems, expired, totalPrice } = validateCartItems(cart.items, products);

  const items = [...validItems];

  if (expired.length > 0)
    items.push({ expired });

  return { items, totalPrice };
}

export const addToCart = async (userId, productId, quantity, size) => {
  const product = await Product.findById(productId);

  if (!product || product.isDeleted)
    throw new CustomError('Product not found', 404)

  const outOfStock = findProductSize(product, size).stock === 0;

  if (outOfStock)
    throw new CustomError('out of stock', 400);

  let cart = await Cart.findOne({ user: userId });

  if (!cart) cart = new Cart({
    user: userId,
    items: [],
  });

  const existingItem = cart.items.find(i => i.product.toString() === productId.toString())

  if (existingItem)
    existingItem.quantity += 1;
  else
    cart.items.push({
      product: productId,
      size,
      quantity,
    })

  await cart.save();
  return cart;
}

export const removeFromCart = async (userId, productId, size) => {
  const cart = await Cart.findOne({ user: userId }).select('items totalPrice');
  if (!cart)
    throw new CustomError('cart empty.', 404);

  cart.items = cart.items.filter(item => !(item.product.toString() === productId && item.size === size));


  await cart.save();
  return cart;
}