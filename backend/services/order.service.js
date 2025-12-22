import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';

import { CustomError } from '../utils/error.utils.js';
import { getProductsMap, validateCartItems } from '../utils/cart.utils.js';
import { orderFilter } from '../utils/order.utils.js';
import User from '../models/user.model.js';

export const createOrder = async (user, orderData) => {
  const { address, shipping, paymentMethod } = orderData;

  const cart = await Cart.findOne({ user });
  if (!cart || cart.items.length === 0)
    throw new CustomError('cart empty', 400);

  const products = await getProductsMap(cart.items);
  const { validItems, totalPrice } = validateCartItems(cart.items, products);

  const finalPrice = totalPrice + shipping;

  const order = await Order.create({
    user,
    items: validItems,
    totalPrice: finalPrice,
    address,
    paymentMethod
  });

  return order;

};

export const getMyOrders = async (user, orderQuery) => {
  const filter = orderFilter({ user }, orderQuery);
  console.log(filter);

  return await Order.find(filter)
    .sort({ createdAt: -1 })
    .select('_id address totalPrice status');
};

export const getAllOrders = async (orderQuery) => {
  const filter = orderFilter({}, orderQuery);

  if (orderQuery.email) {
    console.log(orderQuery.email)
    const user = await User.findOne(
      { email: new RegExp(orderQuery.email, 'i') },
      { _id: 1 });

    if (user) filter.user = user._id;
    else filter.user = null;
  }

  return await Order.find(filter)
    .populate('user', 'firstName lastName')
    .sort({ createdAt: -1 })
    .select('_id address totalPrice status');
};

export const getSingleOrder = async (user, orderId) => {
  const order = await Order.findById(orderId);

  if (!order)
    throw new CustomError('Order not found.', 404);

  if (String(order.user) !== String(user._id) && user.role !== 'admin')
    throw new CustomError('You are not authorized to view this user`s order info.', 403);

  return order;
}

export const cancelOrder = async (user, orderId) => {
  const order = await Order.findById(orderId);

  if (!order)
    throw new CustomError('Order not found.', 404);

  if (String(order.user) !== String(user._id) && user.role !== 'admin')
    throw new CustomError('You are not authorized to cancel this user`s order.', 403);

  if (order.status !== 'pending')
    throw new CustomError('Order cannot be cancelled at this stage.', 400);

  order.status = 'cancelled';
  await order.save();
  return order;
};