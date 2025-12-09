import Product from '../models/product.model.js';

import { CustomError } from '../utils/error.utils.js';
import { findProductById, findProductByName } from '../utils/product.utils.js';

import { uploadImages, deleteImages } from '../config/cloudinary.js';


export const addProduct = async (productData, images) => {
  await findProductByName(productData);
  const imagesUrl = await uploadImages(images);

  return await Product.create({ ...productData, images: imagesUrl });
}


export const getAllProducts = async (filterFields, userRole) => {
  const { shape, length, category, collectionName, sortBy, size, search } = filterFields;

  let filter;
  if (userRole === 'admin')
    filter = {};
  else
    filter = { isDeleted: false };

  const allowedFilters = { shape, length, category, collectionName };
  for (const key in allowedFilters)
    if (allowedFilters[key])
      filter[key] = allowedFilters[key].toLowerCase();

  if (size)
    filter['sizes.size'] = size.toLowerCase();

  if (search)
    filter.name = { $regex: search, $options: 'i' }

  const sort = {};
  const allowedSort = { price: 'price', date: 'createdAt' };

  if (sortBy) {
    const [filed, direction] = sortBy.split(':');

    if (allowedSort[filed])
      sort[allowedSort[filed]] = direction === 'desc' ? -1 : 1;
  }

  return Product.find(filter).sort(sort)
    .select('name images price salePrice sizes');
}

export const getProductInfo = async (productId) => {
  const product = await findProductById(productId);
  return product;
}

export const getFilters = async () => {
  let collection = await Product.distinct('collectionName');
  collection = collection.filter(col => col !== null);
  
   const categories = await Product.distinct('category');
   const lengths = await Product.distinct("length");
   const shapes = await Product.distinct("shape");

  return {
    collection,
     categories,
     lengths,
     shapes
  }
}

export const updateProduct = async (productData, images, productId) => {
  const product = await findProductById(productId);
  let imagesUrl;

  const isNameAvailable = await Product.findOne({ name: productData.name });
  if (isNameAvailable && isNameAvailable._id.toString() !== product._id.toString())
    throw new CustomError('Product with this name already exists.', 400);

  if (images && images.length > 0) {
    await deleteImages(product);
    imagesUrl = await uploadImages();
  } else
    imagesUrl = product.images;

  return await Product.findByIdAndUpdate(productId, { ...productData, images: imagesUrl });
}

export const deleteProduct = async (productId) => {
  const product = await findProductById(productId);

  product.isDeleted = true;
  product.save();

  return product;
}
