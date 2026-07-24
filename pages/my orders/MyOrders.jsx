import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MyOrders(onMyOrders) {
    const tabs = [
        { id: 'all', label: 'All Orders' },
        { id: 'placed', label: 'Placed' },
        { id: 'out-for-delivery', label: 'Out for Delivery' },
        { id: 'delivered', label: 'Delivered' }
    ];

    const [activeTab, setActiveTab] = useState('all');
    const [isLoading, setIsLoading] = useState(false);

    // تأثير الـ Loading لما المستخدم يغير الـ Tab
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800); // مدة التحميل (800 مللي ثانية) عشان الحركة تكون سريعة ومريحة للعيد

        return () => clearTimeout(timer);
    }, [activeTab]);

    return (
        <div className="w-full! max-w-7xl! mx-auto! px-6! py-8! font-sans! text-zinc-800 min-h-screen! flex! flex-col! gap-8!">
    
            <h1 className="text-xl! font-extrabold! text-zinc-950! tracking-tight!">My Orders</h1>

            {/* التابات الأربعة */}
            <div className="flex! flex-wrap! items-center! gap-3!">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => {
                                if (activeTab !== tab.id) {
                                    setActiveTab(tab.id);
                                }
                            }}
                            className={`px-5! py-2.5! text-xs! font-bold! rounded-full! border! transition-all! cursor-pointer! shadow-sm! ${
                                isActive
                                    ? 'bg-[#1e3322]! text-white! border-[#1e3322]!'
                                    : 'bg-white! text-zinc-500! border-zinc-100! hover:text-zinc-800! hover:bg-zinc-50!'
                            }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* منطقة العرض الرئيسية */}
            <div className="flex! items-center! justify-center! min-h-[350px]! bg-transparent! relative!">
                
                {isLoading ? (
                    /* ⏳ مؤشر التحميل (Spinner) اللطيف والدائري */
                    <div className="flex! flex-col! items-center! justify-center! gap-3! animate-pulse!">
                        <div className="size-10! border-4! border-zinc-200! border-t-[#1e3322]! rounded-full! animate-spin!"></div>
                        <span className="text-[11px]! font-bold! text-zinc-400! tracking-wider!">Loading...</span>
                    </div>
                ) : (
                    /* 📦 محتوى الرسالة بحركة Fade-in ناعمة وسلسة جداً */
                    <div className="flex! flex-col! items-center! justify-center! text-center! animate-[fadeIn_0.4s_ease-out]!">
                        
                        <div className="text-zinc-200! mb-6!">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth="1.2" 
                                stroke="currentColor" 
                                className="size-24!"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" 
                                />
                            </svg>
                        </div>

                        {/* النصوص المكتوبة */}
                        <h2 className="text-base! font-bold! text-zinc-900! mb-2!">
                            No orders yet
                        </h2>
                        <p className="text-xs! text-zinc-400! font-semibold! mb-6!">
                            Start shopping to see your orders here
                        </p>

                        {/* زرار البداية في التسوق */}
                        <Link 
                            to="/product" // 👈 هنا بنقوله يروح لصفحة التسوق الرئيسية
                            className="bg-[#1c3021]! hover:bg-[#2c4432]! transition-all text-white! px-6 py-2 rounded-lg text-sm inline-block text-center no-underline!"
                            >
                            Start Shopping
                        </Link>

                    </div>
                )}
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

        </div>
    );
}

export default MyOrders;