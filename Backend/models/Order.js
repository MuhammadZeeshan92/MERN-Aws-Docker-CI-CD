// server/models/Order.js
import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  quantity: Number,
  image: String,
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  userId: { type: String, default: null },
  name: String,
  email: String,
  phone: String,
  isUmtStudent: { type: Boolean, default: false },
  items: [OrderItemSchema],
  subtotal: Number,
  shipping: Number,
  tax: Number,
  total: Number,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
