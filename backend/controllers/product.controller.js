import asyncHandler from 'express-async-handler';
import Product from '../models/product.model.js';
import fs from 'fs';
import { productValidation } from '../validations/validation.service.js';

// @des    Create product
// @route  POST api/products
// @access admin
export const createProduct = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const validationError = productValidation(req.body);
  if (validationError) {
    const error = new Error(validationError);
    error.statusCode = 400;
    throw error;
  }

  const existingProduct = await Product.findOne({ name });
  if (existingProduct) {
    const error = new Error('Product already exists.');
    error.statusCode = 400;
  }

  // Upload Images
  const images = [];
  if (req.files && req.files.length > 0)
    req.files.forEach(file => {
      fs.writeFileSync(`uploads/${Date.now()} - ${file.originalname}`, file.buffer);
      images.push(`${req.protocol}://${req.get('host')}/uploads/${file.originalname}`)
    })


  const product = await Product.create({ ...req.body, images: images });
  res.status(201).json({ msg: 'Product create successfully', product: product });
});

// @des    Get all products
// @route  GET api/products
// @access public
export const getAllProducts = asyncHandler(async (req, res) => {

});

// @des    Get product by id
// @route  GET api/products/:id
// @access public
export const getProductInfo = asyncHandler(async (req, res) => { });

// @des    Create product
// @route  POST api/products
// @access admin
// export const CreateProduct = asyncHandler(async(req, res) => {});