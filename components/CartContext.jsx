import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setCartItems([]);
        return;
      }

      const res = await fetch('/api/cart', {
        headers: getAuthHeaders()
      });

      const data = await res.json();
      
      if (res.ok && data && data.items) {
        const formattedItems = data.items
          .filter(item => item.productId)
          .map((item) => ({
            ...item.productId, 
            id: item.productId._id, 
            qty: item.quantity,
          }));
        setCartItems(formattedItems);
      }
    } catch (error) {
      console.error('❌ Error fetching cart from backend:', error);
    }
  };

  useEffect(() => {
    fetchCart();

    // 👈 تحديث السلة تلقائياً أول ما اليوزر يسجل دخول ويتم تغيير التوكن
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

    const productId = product._id || product.id;

    try {
      const res = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId, quantity }),
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
    const currentItem = cartItems.find((item) => item.id === id);
    if (currentItem && currentItem.qty + delta <= 0) {
      return removeFromCart(id);
    }

    try {
      const res = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId: id, quantity: delta }),
      });

      if (res.ok) {
        await fetchCart();
      }
    } catch (error) {
      console.error('❌ Error updating quantity:', error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/cart/remove/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (res.ok) {
        await fetchCart();
      }
    } catch (error) {
      console.error('❌ Error removing item from cart:', error);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = subtotal > 0 ? 0 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + delivery + tax;

  return (
    <CartContext.Provider
      value={{
        cartItems,
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);