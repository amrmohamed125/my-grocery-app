const mongoose = require('mongoose');

// ربط الداتابيز
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://mamr54451_db_user:3YHz7iIuYDmKXCXA@cluster0.qmpjren.mongodb.net/my-grocery-app?appName=Cluster0";

// تعريف الـ Model لو مش مستدعيه
const ProductSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default async function handler(req, res) {
  try {
    // الاتصال بالداتابيز لو مش متصل
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGO_URI);
    }

    const { page } = req.query;
    const filter = page ? { appearsIn: page } : {};

    const products = await Product.find(filter);
    
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
}