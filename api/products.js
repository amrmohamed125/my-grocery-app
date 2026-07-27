import mongoose from 'mongoose';

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
  description: String,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://mamr54451_db_user:aassdd@cluster0.qmpjren.mongodb.net/my-grocery-app?retryWrites=true&w=majority";

export default async function handler(req, res) {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGO_URI);
    }

    const { page, category, id } = req.query;

    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid product ID format" });
      }
      
      const singleProduct = await Product.findById(id);
      if (!singleProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      return res.status(200).json(singleProduct);
    }

    let filter = {};

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