import asyncHandler from 'express-async-handler';
import * as productService from '../services/product.service.js';

// @des    Add product
// @route  POST api/products
// @access admin
export const addProduct = asyncHandler(async (req, res) => {
  const product = await productService.addProduct(req.body, req.files);

  res.status(201).json({
    success: true,
    message: 'Product Added.',
    product
  });
});


// @des    Get all products
// @route  GET api/products/all?filter?sortBy
// @access public
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAllProducts(req.query, req.user.role);

  res.status(200).json({
    success: true,
    message: 'Product List.',
    products
  });
});

// @des    Get product by id
// @route  GET api/products/:id
// @access public
export const getProductInfo = asyncHandler(async (req, res) => {
  const product = await productService.getProductInfo(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Product Info.',
    product
  });
});

// @des    Get filters
// @route  GET api/products/filters
// @access public
export const getFilters = asyncHandler(async (req, res) => {
  const filters = await productService.getFilters();
  res.status(200).json({
    success: true,
    message: 'Product Filters.',
    filters
  })
});

// @des    Update product info
// @route  PUT api/products/:id
// @access admin
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(req.body, req.files, req.params.id);

  res.status(201).json({
    success: true,
    message: 'Product Updated.',
    product
  });
});

// @des    Delete Product
// @route  PATCH api/products/:id
// @access admin
export const deletepProduct = asyncHandler(async (req, res) => {
  const product = await productService.deleteProduct(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Product Deleted.',
    product
  });
});