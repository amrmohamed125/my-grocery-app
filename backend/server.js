const express = require('express');
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://mamr54451_db_user:3YHz7iIuYDmKXCXA@cluster0.qmpjren.mongodb.net/my-grocery-app?appName=Cluster0";
const cors = require('cors');
const product = require('./models/Product');
const cartRouters = require('./routers/cartRoutes');
const authRoutes = require('./routers/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/cart', cartRouters);
app.use('/api/auth', authRoutes);

mongoose.connect(MONGO_URI)
  .then(() => console.log(' Connected to MongoDB Atlas'))
  .catch(err => console.log(' DB Connection Error:', err));

app.get('/api/products', async (req, res) => {
    const { page } = req.query;
    try {
        const filter = page ? { appearsIn: page } : {};
        const products = await product.find(filter);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const singleProduct = await product.findById(req.params.id);
        if (!singleProduct) {
            return res.status(404).json({ message: "product is not found" });
        }
        res.status(200).json(singleProduct);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));