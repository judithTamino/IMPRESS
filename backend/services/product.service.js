import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/product.model.js';
import { CustomError } from '../utils/error.utils.js';

export const addProduct = async (productData, images) => {
  const product = Product.findOne({ name: productData.name });
  if(!product)
    throw new CustomError(`${productData.name} already exists.`)

  const imagesUrl = await Promise.all(
    images.map(async (image) => {
      let result = await cloudinary.uploader.upload(image.path, {
        resource_type: 'image'
      })
      return result.secure_url
    })
  )

  return await Product.create({...productData, images: imagesUrl});
}
