import React, { useState } from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const { cartItems, subtotal } = useCart();
  const [activeTab, setActiveTab] = useState('address'); 
  const [paymentMethod, setPaymentMethod] = useState('card');

  const safeSubtotal = subtotal || 0;
  const safeTax = safeSubtotal * 0.05; 
  const safeTotal = safeSubtotal + safeTax;

  const [showToast, setShowToast] = useState(false);
  
      // دالة إظهار التوست
      const triggerDemoToast = () => {
          setShowToast(true);
          setTimeout(() => {
              setShowToast(false);
          }, 2500);
      };

  const tabs = [
    { id: 'address', label: <><i className="fa-solid fa-location-dot"></i> Address</>, done: true },
    { id: 'payment', label: <><i className="fa-solid fa-credit-card"></i> Payment</>, done: activeTab === 'payment' || activeTab === 'review' },
    { id: 'review', label: <><i className="fa-solid fa-square-check"></i> Review</>, done: activeTab === 'review' }
  ];

  const getImageUrl = (name) => {
    if (!name) return '';
    if (name.startsWith('http://') || name.startsWith('https://')) return name;
    return new URL(`../src/assets/images/${name}`, import.meta.url).href;
};

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="text-center! py-20! bg-[#f9f9f6]! min-h-screen!">
        <h2 className="text-xl! font-bold! text-slate-800!">Your cart is empty to checkout!</h2>
        <Link to="/" className="text-orange-500! underline! mt-2! block!">Go Shopping</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f9f6]! min-h-screen! py-6! block!">

      {/* 🔔 رسالة الـ Demo Mode*/}
      <div 
          className={`fixed! top-6! right-6! z-50! flex! items-center! gap-3! bg-zinc-900! text-white! px-4! py-3! rounded-2xl! shadow-2xl! border! border-zinc-800! pointer-events-none! transition-all! duration-300! ease-out! ${
              showToast 
                  ? 'opacity-100! translate-y-0! scale-100!' 
                  : 'opacity-0! -translate-y-4! scale-95!'
          }`}
      >
          <div className="w-5! h-5! rounded-full! bg-red-500/20! text-red-500! flex! items-center! justify-center! text-xs! font-bold! shrink-0!">
              ✕
          </div>
          <span className="text-xs! font-medium! text-zinc-200! select-none!">
              Disabled in demo mode.
          </span>
      </div>

      <div className="max-w-4xl! mx-auto! px-4!">
        
        <button onClick={() => window.history.back()} className="text-sm! text-gray-600! hover:text-gray-900! mb-4! flex! items-center! gap-1! font-medium! bg-transparent! border-0! cursor-pointer!">
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>
        <h1 className="text-2xl! font-bold! text-slate-800! mb-6! border-0! bg-transparent! p-0! m-0!">Checkout</h1>

        {/* التابس العلوية */}
        <div className="flex! flex-row! gap-2! mb-8! overflow-x-auto! pb-2! border-0! bg-transparent!">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex! items-center! gap-2! px-4! py-2! rounded-xl! text-xs! sm:text-sm! font-bold! border-0! cursor-pointer! transition-all! shrink-0! ${
                activeTab === tab.id 
                  ? 'bg-slate-900! text-white! shadow-sm!' 
                  : 'bg-white! text-slate-600! hover:bg-slate-50! border! border-slate-100!'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid! grid-cols-1! lg:grid-cols-3! gap-8! items-start! border-0! bg-transparent!">
          
          {/* القسم الأيسر المتغير */}
          <div className="lg:col-span-2! space-y-6! border-0! bg-transparent!">
            
            {/* 1️⃣ تاب العنوان */}
            {activeTab === 'address' && (
              <div className="bg-white! rounded-2xl! p-6! shadow-none! border! border-slate-100!">
                <h3 className="text-md! font-bold! text-slate-800! mb-4! flex! items-center! gap-2! border-0! m-0! p-0!">
                  <i className="fa-solid fa-location-dot text-slate-600"></i> Delivery Address
                </h3>
                <Link to='/address'>
                    <button className="w-full! py-6! border-2! border-dashed! border-slate-200! rounded-xl! bg-slate-50! text-gray-500! font-medium! text-xs! sm:text-sm! hover:bg-slate-100! transition-colors! cursor-pointer! mb-6!">
                    Add New Address <i className="fa-solid fa-plus ms-1"></i>
                    </button>
                </Link>
                <button 
                  onClick={() => setActiveTab('payment')} 
                  className="bg-slate-900! hover:bg-slate-800! text-white! font-bold! py-3! px-6! rounded-xl! text-xs! sm:text-sm! border-0! cursor-pointer! flex! items-center! gap-2! shadow-none! transition-all!"
                >
                  Continue to Payment <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            )}

            {/* 2️⃣ تاب الدفع */}
            {activeTab === 'payment' && (
            <div className="bg-white! rounded-2xl! p-6! shadow-none! border! border-slate-100!">
                <h3 className="text-md! font-bold! text-slate-800! mb-4! flex! items-center! gap-2! border-0! m-0! p-0!">
                <i className="fa-solid fa-credit-card text-slate-600"></i> Payment Method
                </h3>
                <div className="space-y-3! mb-6! border-0! p-0!">
                
                {/* خيار الفيزا / الماستر كارد */}
                <label 
                    className={`flex! items-center! justify-between! p-4! border! rounded-xl! cursor-pointer! transition-all! ${
                    paymentMethod === 'card' 
                        ? 'border-emerald-600! bg-emerald-50/10!' 
                        : 'border-slate-200! hover:bg-slate-50!'
                    }`}
                >
                    <div className="flex! items-center! gap-3!">
                    <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === 'card'} 
                        onChange={() => setPaymentMethod('card')} 
                        className="accent-emerald-600!" 
                    />
                    <div className="text-left!">
                        <p className="text-xs! sm:text-sm! font-bold! text-slate-800! m-0! p-0!">Credit / Debit Card</p>
                        <p className="text-[11px]! text-gray-400! m-0! p-0!">Pay securely with your card</p>
                    </div>
                    </div>
                </label>

                {/* خيار الدفع عند الاستلام */}
                <label 
                    className={`flex! items-center! justify-between! p-4! border! rounded-xl! cursor-pointer! transition-all! ${
                    paymentMethod === 'cod' 
                        ? 'border-emerald-600! bg-emerald-50/10!' 
                        : 'border-slate-200! hover:bg-slate-50!'
                    }`}
                >
                    <div className="flex! items-center! gap-3!">
                    <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === 'cod'} 
                        onChange={() => setPaymentMethod('cod')} 
                        className="accent-emerald-600!" 
                    />
                    <div className="text-left!">
                        <p className="text-xs! sm:text-sm! font-bold! text-slate-800! m-0! p-0!">Cash on Delivery</p>
                        <p className="text-[11px]! text-gray-400! m-0! p-0!">Pay when you receive</p>
                    </div>
                    </div>
                </label>

                </div>
                <button 
                onClick={() => setActiveTab('review')} 
                className="bg-slate-900! hover:bg-slate-800! text-white! font-bold! py-3! px-6! rounded-xl! text-xs! sm:text-sm! border-0! cursor-pointer! flex! items-center! gap-2! shadow-none! transition-all!"
                >
                Review Order <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
            )}

            {/* 3️⃣ تاب المراجعة */}
            {activeTab === 'review' && (
              <div className="bg-white! rounded-2xl! p-6! shadow-none! border! border-slate-100!">
                <h3 className="text-md! font-bold! text-slate-800! mb-4! flex! items-center! gap-2! border-0! m-0! p-0!">
                  <i className="fa-solid fa-square-check text-slate-600"></i> Review Your Order
                </h3>
                
                <div className="bg-amber-50/30! rounded-xl! p-4! mb-6! border! border-amber-100/50!">
                  <p className="text-xs! font-bold! text-slate-700! mb-1! border-0! m-0!">
                    <i className="fa-solid fa-truck text-slate-600 me-1"></i> Delivery Address
                  </p>
                  <p className="text-xs! text-gray-500! m-0!">Home — Cairo, Egypt</p>
                </div>

                <div className="divide-y! divide-slate-100! mb-6! border-0! p-0!">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex! flex-row! justify-between! items-center! py-3! first:pt-0! last:pb-0! bg-transparent!">
                      <div className="flex! items-center! gap-3! bg-transparent!">
                        <img src={getImageUrl(item.img || item.image)} alt={item.name} className="w-8! h-8! object-contain!" />
                        <div className="text-left!">
                          <p className="text-xs! font-bold! text-slate-800! m-0! p-0! border-0! bg-transparent!">{item.name}</p>
                          <p className="text-[10px]! text-gray-400! m-0! p-0! border-0! bg-transparent!">Qty: {item.qty}</p>
                        </div>
                      </div>
                      <span className="text-xs! font-black! text-slate-900! bg-transparent!">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <button onClick={triggerDemoToast} className="w-full! bg-[#f97316]! hover:bg-orange-600! text-white! font-bold! py-3.5! rounded-xl! text-sm! border-0! cursor-pointer! shadow-none! transition-all! active:scale-[0.99]!">
                  Place Order — ${safeTotal.toFixed(2)}
                </button>
              </div>
            )}
          </div>

          {/* 📊 القسم الثابت للفاتورة التلخيصية على اليمين */}
          <div className="bg-white! rounded-2xl! p-6! shadow-none! border! border-slate-100!">
            <h3 className="text-sm! font-bold! text-slate-800! mb-4! border-0! m-0! p-0!">Order Summary</h3>
            <div className="space-y-3! text-xs! border-b! border-slate-100! pb-4! mb-4! p-0!">
              <div className="flex! justify-between! text-gray-500! bg-transparent!">
                <span>Subtotal ({cartItems.reduce((acc, i) => acc + i.qty, 0)} items)</span>
                <span className="font-bold! text-slate-800!">${safeSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex! justify-between! text-gray-500! bg-transparent!">
                <span>Delivery</span>
                <span className="text-emerald-600! font-bold!">Free</span>
              </div>
              <div className="flex! justify-between! text-gray-500! bg-transparent!">
                <span>Tax (5%)</span>
                <span className="font-bold! text-slate-800!">${safeTax.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex! justify-between! text-sm! font-black! text-slate-900! bg-transparent!">
              <span>Total</span>
              <span>${safeTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}