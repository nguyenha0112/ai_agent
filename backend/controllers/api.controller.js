// Import các model tương ứng
import { Inventory } from '../models/Inventory.model.js';
import { getActivePromotions, findPromotion } from '../models/Promotion.model.js';
import { createNewOrder } from '../models/Order.model.js'; 


/**
 * Thêm sản phẩm mới vào kho
 * POST /api/products/add
 */
export const addProduct = async (req, res) => {
  try {
    const { productId, name, quantity } = req.body;

    // Kiểm tra nếu sản phẩm đã tồn tại
    const exists = await Inventory.findOne({ productId });
    if (exists) {
      return res.status(400).json({ error: 'Sản phẩm đã tồn tại' });
    }

    // Tạo sản phẩm mới và lưu vào MongoDB
    const newProduct = new Inventory({ productId, name, quantity });
    await newProduct.save();

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi thêm sản phẩm', message: error.message });
  }
};


/**
 * Kiểm tra tồn kho theo productId
 * GET /api/inventory/check?productId=xxx
 */
export const checkInventory = async (req, res) => {
  try {
    const { productId } = req.query;
    const product = await Inventory.findOne({ productId });

    if (!product) {
      return res.status(404).json({ error: 'Sản phẩm không tồn tại' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi kiểm tra tồn kho', message: error.message });
  }
};

/**
 * Tạo đơn hàng mới
 * POST /api/orders/create
 */
export const createOrder = async (req, res) => {
  try {
    const { userId, cartItems, promotionCode, shippingInfo } = req.body;

    const order = await createNewOrder({ userId, cartItems, promotionCode, shippingInfo });

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(400).json({ error: 'Tạo đơn hàng thất bại', message: error.message });
  }
};


/**
 * Lấy danh sách khuyến mãi đang hoạt động
 * GET /api/promotions/current
 */
export const getPromotions = (req, res) => {
  try {
    const promotions = getActivePromotions();
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi lấy khuyến mãi', message: error.message });
  }
};


/**
 * Gửi thông tin vận chuyển (giả lập)
 * POST /api/shipping/create
 */
export const createShipping = (req, res) => {
  try {
    const { orderId, address, shippingMethod } = req.body;

    // Trả về thông tin giao hàng giả lập
    res.json({
      success: true,
      shippingInfo: {
        orderId,
        address,
        shippingMethod,
        status: 'Scheduled',
        estimatedDate: new Date(Date.now() + 3 * 86400000), // +3 ngày
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi tạo thông tin vận chuyển', message: error.message });
  }
};


// Lấy danh sách tồn kho với các điều kiện lọc
// controllers/api.controller.js

export const filterInventories = async (req, res) => {
  try {
    const { productId, name, minQty, maxQty } = req.body || {};

    const filter = {};

    if (productId) {
      filter.productId = productId;
    }

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    if (minQty || maxQty) {
      filter.quantity = {};
      if (minQty) filter.quantity.$gte = Number(minQty);
      if (maxQty) filter.quantity.$lte = Number(maxQty);
    }

    const results = await Inventory.find(filter);
    res.json(results);
  } catch (error) {
    console.error('Lỗi filter tồn kho:', error);
    res.status(500).json({ error: 'Lỗi server khi filter tồn kho' });
  }
};

