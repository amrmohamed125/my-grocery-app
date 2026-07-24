const Cart = require('../models/Cart');

// 1. جلب الكارت الخاصة باليوزر المسجل
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await Cart.findOne({ userId }).populate('items.productId');
    
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }
    
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
};

// 2. إضافة منتج للكارت أو زيادة كميته
exports.addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += Number(quantity);
    } else {
      cart.items.push({ productId, quantity: Number(quantity) });
    }

    await cart.save();
    
    // 👈 إعادة جلب الكارت مع عمل populate بشكل صحيح
    const updatedCart = await Cart.findById(cart._id).populate('items.productId');
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
};

// 3. حذف منتج معين من الكارت
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    await cart.save();
    const updatedCart = await Cart.findById(cart._id).populate('items.productId');
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error: error.message });
  }
};