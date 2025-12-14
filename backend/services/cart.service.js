import Cart from '../models/cart.model.js';
import Product from "../models/product.model.js";

import { CustomError } from '../utils/error.utils.js';
import { addExpired, calculateTotal, findProductSize } from '../utils/cart.utils.js';

export const getCart = async (user) => {
  let onSale = [], expired = [], totalPrice = 0;

  const cart = await Cart.findOne({ user });
  if (!cart)
    return {
      items: [],
      totalPrice: 0
    };

  const productsId = cart.items.map(item => item.product);
  const products = await Product.find({ _id: { $in: productsId } });
  const productsMap = new Map(products.map(product => [String(product._id), product]));

  for (const item of cart.items) {
    const product = productsMap.get(String(item.product));

    const baseItem = {
      product: item.product,
      size: item.size,
      quantity: item.quantity
    };

    if (!product) {
      addExpired(baseItem, 'discontinued', expired);
      continue;
    }

    const cartItem = {
      ...baseItem,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice || null,
      image: product.images?.[0],
    }

    if (product.isDeleted) {
      addExpired(cartItem, 'discontinued', expired);
      continue;
    }

    const productSize = findProductSize(product, item.size);

    if (!productSize) {
      addExpired(cartItem, 'size not available', expired);
      continue;
    }

    const stock = productSize.stock;

    if (stock === 0) {
      addExpired(cartItem, 'out of stock', expired);
      continue;
    }

    if (stock < item.quantity) {
      addExpired(cartItem, 'partial stock', expired);
      continue;
    }

    // Product is valid & fully available
    const finalPrice = product.salePrice || product.price;

    onSale.push(cartItem);
    totalPrice += finalPrice * item.quantity;
  }

  const items = [...onSale];
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
    totalPrice: 0
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

  cart.totalPrice = await calculateTotal(cart.items);

  await cart.save();
  return cart;
}