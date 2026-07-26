import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://mamr54451_db_user:3YHz7iIuYDmKXCXA@cluster0.qmpjren.mongodb.net/my-grocery-app?appName=Cluster0";

// تعريف الـ Model مباشرة لتجنب مشاكل الـ Imports والمقاسات النسبية في Vercel
const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.models.Product || mongoose.model('Product', productSchema, 'products');

export default async function handler(req, res) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGO_URI);
    }

    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}