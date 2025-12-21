import Product from "../models/product.model.js";

export const findProductSize = (product, size) => {
  return product.sizes.find(s => s.size === size);
}

export const getProductsMap = async cartItems => {
  const productsId = cartItems.map(item => item.product);
  const products = await Product.find({ _id: { $in: productsId } });

  return new Map(products.map(product => [String(product._id), product]));
}

export const validateCartItems = (cartItems, products) => {
  const validItems = [], expired = [];
  let totalPrice = 0;

  for (const item of cartItems) {
    const product = products.get(String(item.product));

    if (!product || product.isDeleted) {
      expired.push({
        product: item.product,
        reason: 'discontinued'
      })
      continue;
    }

    const productSize = findProductSize(product, item.size);

    if (!productSize) {
      expired.push({
        product: item.product,
        reason: 'size not available'
      })
      continue;
    }


    if (productSize.stock === 0 || productSize.stock < item.quantity) {
      expired.push({
        product: item.product,
        reason: 'out of stock'
      })
      continue;
    }
      

    const price = product.salePrice ?? product.price;

    validItems.push({
      product: product._id,
      name: product.name,
      price,
      size: item.size,
      quantity: item.quantity,
      image: product.images[0]
    });

    totalPrice += price * item.quantity;
  }

  return { validItems, expired, totalPrice };
};

