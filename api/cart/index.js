import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://mamr54451_db_user:aassdd@cluster0.qmpjren.mongodb.net/my-grocery-app?retryWrites=true&w=majority";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key"; // تأكد من مطابقة السيكرت كي

// 1. تعريف Schemas والموديلات
const productSchema = new mongoose.Schema({ name: String, price: Number, img: String });
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true });

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

// 2. دالة التحقق من التوكن واستخراج اليوزر
const getUserIdFromToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.id || decoded.userId;
  } catch (err) {
    return null;
  }
};

export default async function handler(req, res) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGO_URI);
    }

    // التحقق من هية اليوزر عبر التوكن
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: Invalid or missing token" });
    }

    // --- GET: جلب السلة ---
    if (req.method === 'GET') {
      let cart = await Cart.findOne({ userId }).populate('items.productId');
      if (!cart) {
        cart = await Cart.create({ userId, items: [] });
      }
      return res.status(200).json(cart);
    }

    // --- POST: إضافة منتج أو زيادة الكمية ---
    if (req.method === 'POST') {
      const { productId, quantity = 1 } = req.body || {};

      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }

      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += Number(quantity);
      } else {
        cart.items.push({ productId, quantity: Number(quantity) });
      }

      await cart.save();
      const updatedCart = await Cart.findById(cart._id).populate('items.productId');
      return res.status(200).json(updatedCart);
    }

    return res.status(405).json({ message: "Method Not Allowed" });

  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
}