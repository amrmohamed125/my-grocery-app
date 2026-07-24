const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        default: "guest_user_123"
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
            min: 1
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);