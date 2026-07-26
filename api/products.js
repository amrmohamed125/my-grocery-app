import mongoose from 'mongoose';
import Product from '../backend/models/Product.js';

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://mamr54451_db_user:3YHz7iIuYDmKXCXA@cluster0.qmpjren.mongodb.net/my-grocery-app?appName=Cluster0";

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