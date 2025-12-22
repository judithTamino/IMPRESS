import asyncHandler from 'express-async-handler';
import * as orderService from '../services/order.service.js';

// @des    Creates an order before payment
// @route  POST api/orders
// @access private
export const createOrder = asyncHandler(async (req, res) => {
  const user = req.user.id;
  const orderData = req.body;

  const order = await orderService.createOrder(user, orderData);
  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    order
  });
});

// @des    Get user orders
// @route  GET api/orders/my
// @access private
export const getUserOrders = asyncHandler(async (req, res) => {
  const user = req.user.id;
  const orderQuery = req.query;

  const orders = await orderService.getMyOrders(user, orderQuery);
  res.status(200).json({
    success: true,
    message: 'Orders retrieved successfully.',
    orders
  });
});

// @des    Get all Orders 
// @route  GET api/orders
// @access admin
export const getAllOrders = asyncHandler(async (req, res) => {
  const orderQuery = req.query;

  const orders = await orderService.getAllOrders(orderQuery);
  res.status(200).json({
    success: true,
    message: 'Orders retrieved successfully.',
    orders
  });
});

// @des    Get single order
// @route  GET api/orders/:id
// @access private
export const getOrderById = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const user = req.user;

  const order = await orderService.getSingleOrder(user, orderId);
  res.status(200).json({
    success: true,
    message: 'Order retrieved successfully.',
    order
  });
});

// @des    Cancel order 
// @route  PATCH api/orders/:id/cancel  
// @access private
export const cancelOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const user = req.user;

  const order = await orderService.cancelOrder(user, orderId);
  res.status(200).json({
    success: true,
    message: 'Order cancelled successfully.',
    order
  });
});

// @des    Update order status
// @route  PATCH api/orders/:id/status
// @access admin
export const updateOrderStatus = asyncHandler(async (req, res) => { });

