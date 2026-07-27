import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://mamr54451_db_user:aassdd@cluster0.qmpjren.mongodb.net/my-grocery-app?retryWrites=true&w=majority";

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
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGO_URI);
    }

    const authHeader = req.headers.authorization || '';
    const userId = authHeader.replace('Bearer ', '').trim();

    if (!userId || userId === 'undefined' || userId === 'null') {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { productId } = req.body || req.query || {};

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId && item.productId.toString() !== productId);

    await cart.save();
    const updatedCart = await Cart.findById(cart._id).populate('items.productId');
    return res.status(200).json(updatedCart);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}