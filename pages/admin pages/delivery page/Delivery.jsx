import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Dashboard from '../dashboard page/Dashboard';
import MyProducts from '../my products/MyProducts';
import Orders from '../orders/Orders';
import AddProduct from '../add product/AddProduct'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faChartSimple, 
    faPlus, 
    faBox, 
    faClipboardList, 
    faMotorcycle, 
    faRightFromBracket,
    faEnvelope,
    faPhone,
    faXmark
} from '@fortawesome/free-solid-svg-icons';

// 🔔 مكون الـ Toast المعزول بأنيميشن ناعم وسلس
function DemoToast({ isVisible }) {
    return (
        <div 
            className={`fixed! top-6! right-6! z-50! flex! items-center! gap-3! bg-zinc-900! text-white! px-4! py-3! rounded-2xl! shadow-2xl! border! border-zinc-800! transition-all! duration-300! ease-out! pointer-events-none! ${
                isVisible 
                    ? 'opacity-100! translate-y-0! scale-100!' 
                    : 'opacity-0! -translate-y-4! scale-95!'
            }`}
        >
            <div className="w-5! h-5! rounded-full! bg-red-500/20! text-red-500! flex! items-center! justify-center! text-xs! font-bold! flex-shrink-0!">
                <FontAwesomeIcon icon={faXmark} className="text-[11px]!" />
            </div>
            <span className="text-xs! font-medium! tracking-tight! text-zinc-200! select-none!">
                Disabled in demo mode.
            </span>
        </div>
    );
}

const SIDEBAR_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: faChartSimple },
    { id: 'add-product', label: 'Add Product', icon: faPlus },
    { id: 'products', label: 'Products', icon: faBox },
    { id: 'orders', label: 'Orders', icon: faClipboardList },
    { id: 'delivery-partners', label: 'Delivery Partners', icon: faMotorcycle },
    { id: 'exit', label: 'Exit', icon: faRightFromBracket }
];

function Delivery() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('delivery-partners');

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard onOrders={() => setActiveTab('orders')} />;
            case 'add-product':
                return <AddProduct onBack={() => setActiveTab('products')} />;
            case 'products':
                return <MyProducts onAddProduct={() => setActiveTab('add-product')} />;
            case 'orders':
                return <Orders onBack={() => setActiveTab('dashboard')} />;
            case 'delivery-partners':
                return <DeliveryPartnersTab />;
            case 'exit':
                return <Navigate to="/" replace />;
            default:
                return null;
        }
    };

    return (
        <div className='max-w-7xl! mx-auto! px-6! py-8! font-sans! text-zinc-800 min-h-screen!'>
            <div className='grid! grid-cols-1 lg:grid-cols-4! gap-8! items-start!'>
                
                {/* 🔲 Sidebar */}
                <aside className='w-full! bg-white rounded-2xl! p-4! border! border-zinc-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] lg:col-span-1! lg:sticky! lg:top-6!'>
                    <div className='flex! items-center! gap-2! mb-6! px-2!'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e3322" strokeWidth="2" className="shrink-0!">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        <h2 className='text-sm! font-bold! text-[#1e3322]!'>Admin Panel</h2>
                    </div>
                    
                    <div className='flex! flex-col! gap-1!'>
                        {SIDEBAR_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full! flex! items-center! gap-3! px-4! py-3! rounded-xl! text-xs! font-semibold! transition-all! border-0! cursor-pointer! ${
                                    activeTab === item.id
                                        ? 'bg-[#1e3322]! text-white!' 
                                        : 'text-zinc-500! hover:bg-zinc-50! hover:text-zinc-900!'
                                }`}
                            >
                                <FontAwesomeIcon icon={item.icon} className="text-sm! w-4! h-4! text-center!" />
                                {item.label}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* 🔵 Content Area */}
                <main className='w-full! lg:col-span-3! bg-transparent!'>
                    {renderContent()}
                </main>

            </div>
        </div>
    );
}

// 🚴 Delivery Partners Component
function DeliveryPartnersTab() {
    const partner = { 
        id: 1, 
        name: 'Avash', 
        role: 'Bike', 
        email: 'partner1@greatstack.dev', 
        phone: '9876543210', 
        status: 'Active' 
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // دالة إظهار التنبيه
    const triggerToast = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
    };

    const handleDemoSubmit = (e) => {
        e.preventDefault();
        triggerToast(e);
    };

    return (
        <div className="relative!">
            {/* التوست مدمج بفرص انيميشن سلسة */}
            <DemoToast isVisible={showToast} />

            <div className='flex! items-center! justify-between! mb-6!'>
                <h1 className='text-lg! font-bold! text-zinc-900!'>Delivery Partners</h1>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className='bg-[#1e3322]! text-white! text-xs! font-bold! px-4! py-2! rounded-full! border-0! hover:bg-[#2c4731]! transition-all! cursor-pointer! flex! items-center! gap-1.5!'
                >
                    <FontAwesomeIcon icon={faPlus} className="text-[10px]!" /> Add Partner
                </button>
            </div>

            <div className='grid! grid-cols-1 md:grid-cols-2! gap-4!'>
                <div className='bg-white! border! border-zinc-100! rounded-2xl! p-5! shadow-[0_2px_8px_rgba(0,0,0,0.01)]! flex! flex-col! gap-2! max-w-sm!'>
                    
                    <div className='flex! items-center! justify-between!'>
                        <div className='flex! items-center! gap-3!'>
                            <div className='size-10! bg-[#1e3322]! text-white! rounded-full! flex! items-center! justify-center! font-bold! text-sm! shrink-0!'>
                                {partner.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className='text-xs! font-bold! text-zinc-900!'>{partner.name}</h3>
                                <p className='text-[10px]! text-zinc-400! font-medium! m-0'>{partner.role}</p>
                            </div>
                        </div>
                        
                        <span className='px-2! py-0.5! text-[9px]! font-bold! text-green-700! bg-green-50! rounded-md!'>
                            {partner.status}
                        </span>
                    </div>

                    <div className='flex! flex-col! gap-2! text-[11px]! text-zinc-600! border-t! border-b! border-zinc-50! py-3!'>
                        <div className='flex! items-center! gap-2.5!'>
                            <FontAwesomeIcon icon={faEnvelope} className="text-zinc-400! w-3.5! text-center!" />
                            <span className="font-medium!">{partner.email}</span>
                        </div>
                        
                        <div className='flex! items-center! gap-2.5! font-medium!'>
                            <FontAwesomeIcon icon={faPhone} className="text-zinc-400! w-3.5! text-center!" />
                            <span>{partner.phone}</span>
                        </div>
                    </div>

                    {/* زر الـ Deactivate بيشغل الرسالة */}
                    <button 
                        onClick={(e) => triggerToast(e)}
                        className='w-full! py-2! rounded-lg! bg-red-50! text-red-500! hover:bg-red-100! text-xs! font-bold! border-0! transition-colors! cursor-pointer!'
                    >
                        Deactivate
                    </button>

                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed! inset-0! bg-white/85! backdrop-blur-[1px]! flex! items-center! justify-center! z-50! p-4!">
                    <div className="bg-white! rounded-3xl! w-full! max-w-xl! p-8! shadow-2xl! relative! border! border-zinc-100!">
                        
                        <div className="flex! items-center! justify-between! mb-6!">
                            <h2 className="text-sm! font-bold! text-zinc-900!">Onboard Delivery Partner</h2>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-zinc-400! hover:text-zinc-600! bg-transparent! border-0! cursor-pointer! p-1! transition-colors!"
                            >
                                <FontAwesomeIcon icon={faXmark} className="text-base!" />
                            </button>
                        </div>

                        <form onSubmit={handleDemoSubmit} className="flex! flex-col! gap-4!">
                            <div className="flex! flex-col! gap-1.5!">
                                <label className="text-xs! font-bold! text-zinc-950!">Full Name</label>
                                <input type="text" placeholder="Enter full name" className="w-full! border! border-zinc-300! rounded-xl! px-4! py-2.5! text-xs! outline-none! focus:border-[#1e3322]! transition-colors! font-medium! text-zinc-800! shadow-sm!" required />
                            </div>

                            <div className="grid! grid-cols-1 md:grid-cols-2! gap-4!">
                                <div className="flex! flex-col! gap-1.5!">
                                    <label className="text-xs! font-bold! text-zinc-950!">Email</label>
                                    <input type="email" placeholder="Enter email" className="w-full! border! border-zinc-300! rounded-xl! px-4! py-2.5! text-xs! outline-none! focus:border-[#1e3322]! transition-colors! font-medium! text-zinc-800! shadow-sm!" required />
                                </div>
                                <div className="flex! flex-col! gap-1.5!">
                                    <label className="text-xs! font-bold! text-zinc-950!">Password</label>
                                    <input type="password" placeholder="Enter password" className="w-full! border! border-zinc-300! rounded-xl! px-4! py-2.5! text-xs! outline-none! focus:border-[#1e3322]! transition-colors! font-medium! text-zinc-800! shadow-sm!" required />
                                </div>
                            </div>

                            <div className="grid! grid-cols-1 md:grid-cols-2! gap-4!">
                                <div className="flex! flex-col! gap-1.5!">
                                    <label className="text-xs! font-bold! text-zinc-950!">Phone</label>
                                    <input type="tel" placeholder="Enter phone number" className="w-full! border! border-zinc-300! rounded-xl! px-4! py-2.5! text-xs! outline-none! focus:border-[#1e3322]! transition-colors! font-medium! text-zinc-800! shadow-sm!" required />
                                </div>
                                <div className="flex! flex-col! gap-1.5! relative!">
                                    <label className="text-xs! font-bold! text-zinc-950!">Vehicle Type</label>
                                    <select className="w-full! bg-white! border! border-zinc-300! rounded-xl! px-4! py-2.5! text-xs! outline-none! focus:border-[#1e3322]! transition-colors! font-medium! text-zinc-700! shadow-sm! appearance-none! cursor-pointer!">
                                        <option value="Bike">Bike</option>
                                        <option value="Car">Car</option>
                                        <option value="Scooter">Scooter</option>
                                    </select>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className="w-full! mt-4! py-3.5! rounded-2xl! bg-[#1e3322]! text-white! text-xs! font-bold! border-0! hover:bg-[#2c4731]! transition-all! cursor-pointer! active:scale-[0.98]!"
                            >
                                Create Partner
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Delivery;