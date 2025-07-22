import mongoose from 'mongoose';
import { findPromotion } from './Promotion.model.js';

// Khai báo schema cho item trong giỏ hàng
const CartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: String,
  price: Number,
  quantity: Number,
}, { _id: false });

// Schema chính cho Order
const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cartItems: [CartItemSchema],
  subtotal: Number,
  total: Number,
  promotionCode: String,
  shippingInfo: {
    address: String,
    method: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Tạo model
const Order = mongoose.model('Order', OrderSchema);

/**
 * Hàm tạo đơn hàng mới và lưu vào MongoDB
 */
export const createNewOrder = async ({ userId, cartItems, promotionCode, shippingInfo }) => {
  // Tính tổng phụ
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Áp dụng khuyến mãi nếu có
  let discountPercent = 0;
  if (promotionCode) {
    const promo = findPromotion(promotionCode);
    if (promo) {
      discountPercent = promo.discountPercent;
    }
  }

  // Tính tổng cuối cùng sau khi giảm giá
  const total = subtotal * (1 - discountPercent / 100);

  // Tạo đơn hàng
  const newOrder = new Order({
    userId,
    cartItems,
    subtotal,
    total,
    promotionCode,
    shippingInfo,
  });

  // Lưu vào MongoDB
  await newOrder.save();

  return newOrder;
};

export { Order };
