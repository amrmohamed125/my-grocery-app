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
  // استقبال الـ POST Request بس
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // 1. الاتصال بـ MongoDB Atlas لو مفيش اتصال
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGO_URI);
    }

    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // 2. البحث عن المستخدم في Atlas
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // 3. مقارنة الباسورد
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // 4. إرجاع بيانات المستخدم
    return res.status(200).json({ 
      message: 'Login successful', 
      user: { id: user._id, name: user.name, email: user.email } 
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}