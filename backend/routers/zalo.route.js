import express from 'express';
import { handleZaloWebhook } from '../controllers/zalo.controller.js';

const router = express.Router();

router.post('/webhook', handleZaloWebhook);

export default router;