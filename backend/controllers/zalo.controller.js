// backend/controllers/zalo.controller.js
import axios from 'axios';
import { ENV_VARS } from '../config/envVars.js';

const ZALO_ACCESS_TOKEN = ENV_VARS.ZALO_OA_ACCESS_TOKEN;

export const handleZaloWebhook = async (req, res) => {
  const { event_name, sender } = req.body;

  // Khi có tin nhắn mới từ người dùng
  if (event_name === 'user_send_text') {
    const userId = sender.id;

    // Gửi chào hỏi và CTA
    await sendTextMessage(userId, `🤖 Xin chào bạn đến với AI Agent!`);
    await sendTextMessage(userId, `Bạn cần tôi hỗ trợ gì hôm nay?\n\n👉 Gõ "1" để xem sản phẩm\n👉 Gõ "2" để tạo đơn hàng\n👉 Gõ "3" để kiểm tra tồn kho`);
  }

  res.sendStatus(200);
};

// Hàm gửi tin nhắn qua OA API
const sendTextMessage = async (userId, message) => {
  await axios.post('https://openapi.zalo.me/v3.0/oa/message', {
    recipient: { user_id: userId },
    message: {
      text: message
    }
  }, {
    headers: {
      access_token: ZALO_ACCESS_TOKEN
    }
  });
};
