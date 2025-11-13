import asyncHandler from 'express-async-handler';
import Product from '../models/product.model.js';
import fs from 'fs';

// @des    Create product
// @route  POST api/products
// @access admin
export const createProduct = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const existingProduct = await Product.findOne({ name });
  if (existingProduct) {
    const error = new Error('Product already exists.');
    error.statusCode = 400;
    throw error;
  }

  // Upload Images
  const images = [];
  if (req.files && req.files.length > 0)
    req.files.forEach(file => {
      const imageName = `${Date.now()}-${file.originalname}`;
      fs.writeFileSync(`uploads/${imageName}`, file.buffer);
      images.push(`${req.protocol}://${req.get('host')}/uploads/${imageName}`)
    });

  await Product.create({ ...req.body, images: images });
  res.status(201).json({ msg: 'Product create successfully' });
});

// @des    Get all active products
// @route  GET api/products?filter?sortBy
// @access public
export const getAllActiveProducts = asyncHandler(async (req, res) => {
  const { shape, length, category, sortBy } = req.query;
  const filter = {};
  const sort = {};

  if (shape) filter.shape = shape;
  else if (category) filter.category = category;
  else if (length) filter.length = length;

  if (sortBy) {
    const parts = sortBy.split(':');
    sort[parts[0]] = parts[1] === 'dec' ? -1 : 1;
  }

  const products = await Product.find({...filter, isDeleted: false}).sort(sort).select('name images price');
  res.status(200).json({ products: products });
});

// @des    Get all products
// @route  GET api/products/all?filter?sortBy
// @access public
export const getAllProducts = asyncHandler(async (req, res) => {
  const { shape, length, category, sortBy } = req.query;
  const filter = {};
  const sort = {};

  if (shape) filter.shape = shape;
  else if (category) filter.category = category;
  else if (length) filter.length = length;

  if (sortBy) {
    const parts = sortBy.split(':');
    sort[parts[0]] = parts[1] === 'dec' ? -1 : 1;
  }

  const products = await Product.find(filter).sort(sort).select('name images price');
  res.status(200).json({ products: products });
});

// @des    Get product by id
// @route  GET api/products/:id
// @access public
export const getProductInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    const error = new Error('Product not found.');
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({ product: product });
});

// @des    Update product info
// @route  PUT api/products/:id
// @access admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    const error = new Error('Product not found.');
    error.statusCode = 404;
    throw error;
  }

  // Upload Images
  const images = [];
  if (req.files && req.files.length > 0)
    req.files.forEach(file => {
      const imageName = `${Date.now()}-${file.originalname}`;
      fs.writeFileSync(`uploads/${imageName}`, file.buffer);
      images.push(`${req.protocol}://${req.get('host')}/uploads/${imageName}`)
    });

  await Product.findByIdAndUpdate(id, req.body);
  res.status(201).json({ msg: 'Product update successfully.' });
});

// @des    Delete Product
// @route  PATCH api/products/:id
// @access admin
export const deletepProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    const error = new Error('Product not found.');
    error.statusCode = 404;
    throw error;
  }

  product.isDeleted = true;
  product.save();

  res.status(200).json({ msg: 'Product deleted successfully.' });
});