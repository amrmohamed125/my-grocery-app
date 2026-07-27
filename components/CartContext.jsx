import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/cart', { headers: getAuthHeaders() });
      const data = await res.json();

      if (res.ok && data && Array.isArray(data.items)) {
        const formattedItems = data.items
          .filter(item => item && item.productId)
          .map((item) => ({
            ...item.productId,
            id: item.productId._id || item.productId.id,
            qty: item.quantity,
          }));
        setCartItems(formattedItems);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('❌ Error fetching cart:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    const handleStorageChange = () => fetchCart();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // إضافة منتج استجابة لحظية
  const addToCart = async (product, quantity = 1) => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const productId = product._id || product.id || product;
    const previousCart = [...cartItems];

    // 1. تحديث الشاشة فوراً (Optimistic Update)
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => item.id === productId ? { ...item, qty: item.qty + quantity } : item);
      }
      return [...prev, { ...product, id: productId, qty: quantity }];
    });
    setIsCartOpen(true);

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId: String(productId), quantity }),
      });

      if (!res.ok) {
        // لو حصلت مشكلة يرجع الحسابات للوضع القديم
        setCartItems(previousCart);
      }
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      setCartItems(previousCart);
    }
  };

  // زيادة / نقصان العدد استجابة لحظية
  const updateQty = async (id, delta) => {
    const previousCart = [...cartItems];

    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId: String(id), quantity: delta }),
      });

      if (!res.ok) setCartItems(previousCart);
    } catch (error) {
      console.error('❌ Error updating quantity:', error);
      setCartItems(previousCart);
    }
  };

  // حذف منتج استجابة لحظية
  const removeFromCart = async (id) => {
    const cleanId = typeof id === 'object' ? (id._id || id.id) : id;
    const previousCart = [...cartItems];

    setCartItems(prev => prev.filter(item => item.id !== cleanId));

    try {
      const res = await fetch('/api/cart/remove', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId: String(cleanId) }),
      });

      if (!res.ok) setCartItems(previousCart);
    } catch (error) {
      console.error('❌ Error removing item from cart:', error);
      setCartItems(previousCart);
    }
  };

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  const subtotal = safeCartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.qty || 1)), 0);
  const delivery = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + delivery + tax;

  return (
    <CartContext.Provider
      value={{
        cartItems: safeCartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQty,
        removeFromCart,
        subtotal,
        delivery,
        tax,
        total,
        fetchCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);