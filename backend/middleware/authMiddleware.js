const jwt = require('jsonwebtoken');
const JWT_SECRET = "my_secret_key_12345";

const protect = (req, res, next) => {
  let token;

  // فحص وجود التوكن في الـ Headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // استخراج التوكن من "Bearer <TOKEN>"
      token = req.headers.authorization.split(' ')[1];

      // التثبت من صحة التوكن
      const decoded = jwt.verify(token, JWT_SECRET);

      // حفظ بيانات المستخدم في الطلب لاستخدامها في الكنترولر
      req.user = decoded;

      next(); // التوجه للـ Controller
    } catch (error) {
      return res.status(401).json({ message: 'you are not authhorized. the token is invaild.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'you are not authhorized. No token.' });
  }
};

module.exports = { protect };