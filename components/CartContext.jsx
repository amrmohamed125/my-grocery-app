import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // جلب السلة عند فتح الصفحة
  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCart(data);
      }
    } catch (err) {
      console.error("Fetch Cart Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // إضافة منتج للسلة
  const addToCart = async (productId, quantity = 1) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("يرجى تسجيل الدخول أولاً");
      return;
    }

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId: String(productId), quantity })
      });

      if (res.ok) {
        const updatedCart = await res.json();
        setCart(updatedCart);
      } else {
        const errorData = await res.json();
        alert(errorData.message || "حدث خطأ أثناء إضافة المنتج");
      }
    } catch (err) {
      console.error("Add To Cart Error:", err);
    }
  };

  // حذف منتج من السلة
  const removeFromCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    // استخراج الـ ID سواء كان أوبجيكت أو String
    const cleanProductId = typeof productId === 'object' ? productId._id : productId;

    try {
      const res = await fetch('/api/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId: String(cleanProductId) })
      });

      if (res.ok) {
        const updatedCart = await res.json();
        setCart(updatedCart);
      } else {
        const errorData = await res.json();
        alert(errorData.message || "فشل حذف المنتج");
      }
    } catch (err) {
      console.error("Remove From Cart Error:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, loading, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);