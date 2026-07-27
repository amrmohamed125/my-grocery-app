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
      const res = await fetch('/api/cart', {
        headers: getAuthHeaders()
      });

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
      console.error('❌ Error fetching cart from backend:', error);
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

  const addToCart = async (product, quantity = 1) => {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/login';
      return;
    }

    const productId = product._id || product.id || product;

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId: String(productId), quantity }),
      });

      if (res.ok) {
        await fetchCart();
        setIsCartOpen(true);
      } else {
        const errorData = await res.json();
        console.error('❌ Server error:', errorData);
      }
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
    }
  };

  const updateQty = async (id, delta) => {
    const currentItem = (cartItems || []).find((item) => item.id === id);
    if (currentItem && currentItem.qty + delta <= 0) {
      return removeFromCart(id);
    }

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId: String(id), quantity: delta }),
      });

      if (res.ok) {
        await fetchCart();
      }
    } catch (error) {
      console.error('❌ Error updating quantity:', error);
    }
  };

  const removeFromCart = async (id) => {
    const cleanId = typeof id === 'object' ? (id._id || id.id) : id;
    try {
      const res = await fetch('/api/cart/remove', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId: String(cleanId) }),
      });

      if (res.ok) {
        await fetchCart();
      }
    } catch (error) {
      console.error('❌ Error removing item from cart:', error);
    }
  };

  // حماية .reduce بحماية أمان في حالة كانت cartItems ليست Array لأي سبب
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