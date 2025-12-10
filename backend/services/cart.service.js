import Cart from '../models/cart.model.js';
import Product from "../models/product.model.js";

import { CustomError } from '../utils/error.utils.js';

export const getCart = async (user) => {
  let onSale = [], expired = [], totalPrice = 0;

  const cart = await Cart.findOne({ user });
  if (!cart)
    return {
      items: [],
      totalPrice: 0
    };

  for (const item of cart.items) {
    const product = await Product.findById(item.product);
    const cartItem = {
      product: product._id,
      name: product.name,
      size: item.size,
      quantity: item.quantity,
      price: product.price,
      salePrice: product.salePrice ? product.salePrice : null,
      image: product.images[0],
    }

    if (!product)
      continue;

    if (product.isDeleted) {
      expired.push({
        ...cartItem,
        reason: 'no longer available'
      });
      continue;
    }

    const productSize = product.sizes.find(s => s.size === item.size);
    if (!productSize) {
      expired.push({
        ...cartItem,
        reason: 'size not available'
      });
      continue;
    }

    const stock = productSize.stock;
    if (stock === 0) {
      expired.push({
        ...cartItem,
        reason: 'out of stock'
      });
      continue;
    }

    if (stock < item.quantity) {
      expired.push({
        ...cartItem,
        reason: 'partial stock'
      });
      continue;
    }

    const price = product.salePrice || product.price;

    onSale.push(cartItem);
    totalPrice += price * item.quantity
  }

  const items = [...onSale];
  if (expired > 0) items.push({ expired });

  return {
    items,
    totalPrice
  }
}

export const addToCart = async (userId, productId, quantity, size) => {
  const product = await Product.findById(productId);

  if (!product || product.isDeleted)
    throw new CustomError('Product not found', 404)
}