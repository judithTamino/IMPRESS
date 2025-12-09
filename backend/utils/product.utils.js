import Product from "../models/product.model.js"
import { CustomError } from '../utils/error.utils.js';

export const findProductById = async (productId) => {
  const product = await Product.findById(productId);
  if (!product)
    throw new CustomError('Product not found', 404);

  return product;
}

export const findProductByName = async(productData) => {
    const product = await Product.findOne({ name: productData.name });
  if (product)
    throw new CustomError(`${productData.name} already exists.`, 400);

  return product;
}


