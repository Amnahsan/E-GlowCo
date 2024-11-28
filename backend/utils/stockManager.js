const Product = require('../models/productModel');

exports.checkAndUpdateStock = async (items) => {
  const stockUpdates = [];
  
  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product || product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product: ${product?.name || item.productId}`);
    }
    stockUpdates.push({
      updateOne: {
        filter: { _id: item.productId },
        update: { $inc: { stock: -item.quantity } }
      }
    });
  }
  
  await Product.bulkWrite(stockUpdates);
}; 