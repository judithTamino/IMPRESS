import Product from "../models/product.model.js";

export const addExpired = (item, reason, expired) => {
  expired.push({
    ...item,
    reason
  })
};

export const findProductSize = (product, size) => {
  return product.sizes.find(s => s.size === size);
}

export const calculateTotal = async (cartItems) => {
  const products = await Product.find({
    _id: { $in: cartItems.map(i => i.product) }
  });

  const productsMap = new Map(products.map(product => [product._id.toString(), product]));

  return cartItems.reduce((acc, item) => {
    const product = productsMap.get(item.product.toString());
    if (!product) return acc;

    return acc + product.price * item.quantity;
  }, 0);
}