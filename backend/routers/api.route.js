import express from 'express';
import {
  checkInventory,
  createOrder,
  getPromotions,
  createShipping,
   addProduct,
} from '../controllers/api.controller.js';

const router = express.Router();

router.get('/inventory/check', checkInventory);
router.post('/orders/create', createOrder);
router.get('/promotions/current', getPromotions);
router.post('/shipping/create', createShipping);
router.post('/products/add', addProduct);

export default router;