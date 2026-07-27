import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://mamr54451_db_user:aassdd@cluster0.qmpjren.mongodb.net/my-grocery-app?retryWrites=true&w=majority";
const JWT_SECRET = process.env.JWT_SECRET || "my_fixed_secret_key_123456789_grocery";

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

export default async function handler(req, res) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGO_URI);
    }

    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '').trim();

    if (!token || token === 'undefined' || token === 'null') {
      return res.status(401).json({ message: "Unauthorized: Missing Token" });
    }

    let userId;

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      userId = decoded.id;
    } catch (err) {
      userId = token;
    }

    if (req.method === 'GET') {
      let cart = await Cart.findOne({ userId }).populate('items.productId');
      if (!cart) cart = await Cart.create({ userId, items: [] });
      return res.status(200).json(cart);
    }

    if (req.method === 'POST') {
      const { productId, quantity = 1 } = req.body || {};

      let cart = await Cart.findOne({ userId });
      if (!cart) cart = new Cart({ userId, items: [] });

      const itemIndex = cart.items.findIndex(item => item.productId && item.productId.toString() === productId);

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