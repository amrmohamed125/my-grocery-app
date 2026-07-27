import mongoose from 'mongoose';

// 1. تعريف الموديل مباشرة لمنع أخطاء الـ Import في Vercel
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://mamr54451_db_user:aassdd@cluster0.qmpjren.mongodb.net/my-grocery-app?retryWrites=true&w=majority";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGO_URI);
    }

    const { name, email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // 1. التأكد إن المستخدم مش موجود قبل كده في Atlas
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // 2. إنشاء مستخدم جديد في Atlas
    const newUser = new User({ name, email, password });
    await newUser.save();

    return res.status(201).json({
      message: 'Registration successful',
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}