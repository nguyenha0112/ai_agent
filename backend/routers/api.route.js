import express from 'express';

// Import các controller xử lý logic cho từng route
import {
  checkInventory,     // Kiểm tra tồn kho sản phẩm
  createOrder,        // Tạo đơn hàng mới
  getPromotions,      // Lấy danh sách khuyến mãi đang hoạt động
  createShipping,     // Tạo thông tin giao hàng
  addProduct ,         // Thêm sản phẩm mới vào kho
filterInventories    // Lấy danh sách sản phẩm trong kho
} from '../controllers/api.controller.js';

const router = express.Router();
router.get('/inventory/check', checkInventory);

router.post('/orders/create', createOrder);

router.get('/promotions/current', getPromotions);

router.post('/shipping/create', createShipping);

router.post('/products/add', addProduct);


// xuất ra sản phẩm theo tieu chí lọc
router.post('/inventory/filter', filterInventories);

export default router;
