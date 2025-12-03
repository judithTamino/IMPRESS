import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/product.model.js';
import { CustomError } from '../utils/error.utils.js';

export const addProduct = async (productData, images) => {
  const product = Product.findOne({ name: productData.name });
  if (!product)
    throw new CustomError(`${productData.name} already exists.`)

  const imagesUrl = await Promise.all(
    images.map(async (image) => {
      let result = await cloudinary.uploader.upload(image.path, {
        resource_type: 'image'
      })
      return result.secure_url
    })
  )

  return await Product.create({ ...productData, images: imagesUrl });
}


export const getAllProducts = async (filterFields, userRole) => {
  const { shape, length, category, collectionName, sortBy, size,  availability} = filterFields;

  let filter;
  if (userRole === 'admin')
    filter = {};
  else
    filter = { isDeleted: false };

  const allowedFilters = { shape, length, category, collectionName };
  for (const key in allowedFilters)
    if (allowedFilters[key])
      filter[key] = allowedFilters[key].toLowerCase();

  if(size)
    filter['sizes.size'] = size.toLowerCase();

  if(availability === 'in stock')
    filter['sizes.stock'] = {$gt: 0};
  else if(availability === 'out of stock')
    filter['sizes.stock'] = 0;

  const sort = {};
  const allowedSort = { price: 'price', date: 'createdAt' };

  if(sortBy) {
    const [filed, direction] = sortBy.split(':');

    if(allowedSort[filed])
      sort[allowedSort[filed]] = direction === 'desc' ? -1 : 1;
  }

  return await Product.find(filter).sort(sort)
  .select('name images price salePrice');
}
