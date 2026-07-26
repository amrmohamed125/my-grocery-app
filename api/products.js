import mongoose from 'mongoose';

// تعريف الموديل مباشرة عشان نضمن إنه يشتغل على Vercel بدون مشاكل مسارات
const productSchema = new mongoose.Schema({
  name: String,
  img: String,
  originalPrice: Number,
  price: Number,
  discount: String,
  unit: String,
  category: String,
  appearsIn: [String],
  stock: Number,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://mamr54451_db_user:aassdd@cluster0.qmpjren.mongodb.net/my-grocery-app?retryWrites=true&w=majority";

export default async function handler(req, res) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGO_URI);
    }

    const { page, category } = req.query;
    let filter = {};

    // الفلترة الصحيحة للمصفوفات في Mongoose
    if (page) {
      filter.appearsIn = { $in: [page] };
    }

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}