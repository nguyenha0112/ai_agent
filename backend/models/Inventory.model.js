// models/Inventory.model.js
import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

// Đảm bảo tên export là "Inventory"
export const Inventory = mongoose.model('Inventory', inventorySchema);
