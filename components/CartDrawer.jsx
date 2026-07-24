import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext'; 
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQty, removeFromCart, subtotal } = useCart();
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isCartOpen) {
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
    }
  }, [isCartOpen]);

  // دالة الإغلاق العادية
  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => setIsCartOpen(false), 300);
  };

  // دالة الانتقال للـ Checkout بعد انتهاء الأنيمايشن
  const handleCheckoutGo = () => {
    setAnimate(false);
    setTimeout(() => {
      setIsCartOpen(false);
      navigate('/checkout');
    }, 300);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed! inset-0! z-50! flex! justify-end! bg-black/50! backdrop-blur-xs! transition-opacity! duration-300!"
         style={{ opacity: animate ? 1 : 0 }}
    >
      <div className="flex-1!" onClick={handleClose} />

      <div 
        className={`w-full! max-w-md! bg-white! h-screen! flex! flex-col! shadow-2xl! transition-transform! duration-300! ease-in-out! ${
          animate ? 'translate-x-0!' : 'translate-x-full!'
        }`}
      >
        
        {/* 1. الهيدر */}
        <div className="p-5! border-b! border-gray-100! flex! items-center! justify-between! bg-white!">
          <div className="flex! items-center! gap-2!">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800!">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <path d="M3 6h18"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <h2 className="text-lg! font-bold! text-gray-900! m-0! p-0! border-0!">Your Cart</h2>
            <span className="bg-gray-100! text-gray-700! text-xs! px-2! py-0.5! rounded-full! font-semibold!">
              {cartItems.reduce((acc, item) => acc + item.qty, 0)} items
            </span>
          </div>
          <button 
            onClick={handleClose} 
            className="text-gray-400! hover:text-gray-600! bg-transparent! border-0! cursor-pointer! text-xl!"
          >
            ✕
          </button>
        </div>

        {/* 2. قائمة المنتجات */}
        <div className="flex-1! overflow-y-auto! p-5! space-y-4! bg-white!">
          {cartItems.length === 0 ? (
            <div className="text-center! py-20! text-gray-400! text-sm!">Your cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex! flex-row! gap-4! bg-[#fcfcfc]! rounded-2xl! p-4! border! border-gray-100/80! items-center! justify-between! max-w-full!">
                
                <div className="w-16! h-16! bg-white! rounded-xl! flex! items-center! justify-center! p-1! border! border-gray-100! shrink-0!">
                  <img 
                    src={
                      item.image 
                        ? item.image 
                        : new URL(`../src/assets/images/${item.img}`, import.meta.url).href
                    } 
                    alt={item.name} 
                    className="max-h-full! max-w-full! object-contain!" 
                  />
                </div>
                
                <div className="flex-1! flex! flex-col! gap-2! px-1! items-start! justify-center!">
                  <div className="text-left!">
                    <h4 className="text-sm! font-bold! text-gray-900! m-0! p-0! line-clamp-1! border-0! bg-transparent!">{item.name}</h4>
                    <p className="text-xs! text-gray-400! m-0! mt-0.5! p-0! border-0! bg-transparent!">${item.price}.00 {item.unit || '/1kg'}</p>
                  </div>
                  
                  <div className="flex! flex-row! items-center! border! border-gray-200! rounded-lg! w-fit! bg-white! overflow-hidden! shadow-none!">
                    <button onClick={() => updateQty(item.id, -1)} className="px-2.5! py-1! text-gray-500! hover:bg-gray-50! border-0! bg-transparent! cursor-pointer! font-medium! text-sm!">-</button>
                    <span className="px-3! text-xs! font-bold! text-gray-800! bg-transparent!">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="px-2.5! py-1! text-gray-500! hover:bg-gray-50! border-0! bg-transparent! cursor-pointer! font-medium! text-sm!">+</button>
                  </div>
                </div>
                
                <div className="flex! flex-col! items-end! justify-between! h-16! shrink-0! py-0.5!">
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="text-gray-400! hover:text-red-500! bg-transparent! border-0! cursor-pointer! p-0! m-0!"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    </svg>
                  </button>
                  <span className="text-sm! font-bold! text-gray-900! m-0! p-0! bg-transparent!">${(item.price * item.qty).toFixed(2)}</span>
                </div>

              </div>
            ))
          )}
        </div>

        {/* 3. الفوتر المالي وزر الـ Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5! border-t! border-gray-200! bg-white!">
            <div className="space-y-3! mb-5! text-sm!">
              <div className="flex! justify-between! text-gray-500! font-medium!">
                <span>Subtotal</span>
                <span className="font-bold! text-gray-900!">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex! justify-between! text-gray-500! font-medium!">
                <span>Delivery</span>
                <span className="text-emerald-600! font-bold!">Free</span>
              </div>
              
              <div className="border-t! border-gray-200! pt-2 flex! justify-between! text-base! font-black! text-gray-900!">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckoutGo}
              className="w-full! bg-[#f97316]! text-white! py-3.5! rounded-xl! font-bold! text-sm! flex! items-center! justify-center! gap-2! border-0! cursor-pointer! hover:bg-orange-600! transition-all! shadow-none!"
            >
              Proceed to Checkout 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline!">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}