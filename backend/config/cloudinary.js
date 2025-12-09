import { v2 as cloudinary } from 'cloudinary';
import { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } from './env.js';

export const connectCloudniray = async () => {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET
  })
};

export const uploadImages = async (images) => {
  const imagesUrl = await Promise.all(
    images.map(async (image) => {
      let result = await cloudinary.uploader.upload(image.path, {
        resource_type: 'image'
      })
      return result.secure_url
    })
  )

  return imagesUrl;
}

export const deleteImages = async (product) => {
    for (const url of product.images) {
      const publicId = url.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

}
