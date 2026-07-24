const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: false },
    discount: { type: String, required: false },
    unit: { type: String, required: true },
    category: { type: String, required: true },
    appearsIn: { type: [String], default: ['home_page'] },
    stock: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;