import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

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

function MyAddresses() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [addressData, setAddressData] = useState({
        label: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        isDefault: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAddressData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // إظهار الرسالة
    const triggerToast = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
    };

    const handleSaveAddress = (e) => {
        e.preventDefault();
        triggerToast(e);
    };

    return (
        <div className="w-full! max-w-7xl! mx-auto! px-6! py-8! font-sans! text-zinc-800 min-h-screen! relative!">
            
            {/* الرسالة المنبثقة */}
            <DemoToast isVisible={showToast} />

            <div className="flex! items-center! justify-between! mb-8!">
                <h1 className="text-xl! font-extrabold! text-zinc-950! tracking-tight!">My Addresses</h1>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#1e3322]! hover:bg-[#2c4731]! text-white! text-xs! font-bold! px-5! py-3! rounded-full! border-0! transition-all! cursor-pointer! flex! items-center! gap-2! shadow-sm! active:scale-[0.98]!"
                >
                    <FontAwesomeIcon icon={faPlus} className="text-[10px]!" /> Add Address
                </button>
            </div>

            <div className="flex! flex-col! items-center! justify-center! py-24! text-center! bg-transparent!">
                <div className="text-zinc-200! mb-6!">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="size-24!">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                </div>
                <h2 className="text-base! font-bold! text-zinc-900! mb-2!">No addresses saved</h2>
                <p className="text-xs! text-zinc-400! font-semibold!">Add an address for faster checkout</p>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed! inset-0! bg-black/40! backdrop-blur-[1px]! flex! items-center! justify-center! z-50! p-4!">
                    <div className="bg-white! rounded-3xl! w-full! max-w-lg! p-8! shadow-2xl! relative! border! border-zinc-100! animate-[modalFadeIn_0.3s_ease-out]!">
                        
                        <div className="flex! items-center! justify-between! mb-6!">
                            <h2 className="text-sm! font-bold! text-zinc-900!">Add New Address</h2>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-zinc-400! hover:text-zinc-600! bg-transparent! border-0! cursor-pointer! p-1! transition-colors!"
                            >
                                <FontAwesomeIcon icon={faXmark} className="text-base!" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveAddress} className="flex! flex-col! gap-4.5!">
                            <div className="flex! flex-col! gap-1.5!">
                                <label className="text-xs! font-bold! text-zinc-700!">Label</label>
                                <input type="text" name="label" value={addressData.label} onChange={handleChange} placeholder="Home, Work, etc." className="w-full! border! border-zinc-300! focus:border-[#1e3322]! rounded-xl! px-4! py-2.5! text-xs! outline-none! transition-colors! font-medium! text-zinc-800! shadow-sm!" required />
                            </div>

                            <div className="flex! flex-col! gap-1.5!">
                                <label className="text-xs! font-bold! text-zinc-700!">Street Address</label>
                                <input type="text" name="streetAddress" value={addressData.streetAddress} onChange={handleChange} className="w-full! border! border-zinc-300! focus:border-[#1e3322]! rounded-xl! px-4! py-2.5! text-xs! outline-none! transition-colors! font-medium! text-zinc-800! shadow-sm!" required />
                            </div>

                            <div className="grid! grid-cols-2! gap-4!">
                                <div className="flex! flex-col! gap-1.5!">
                                    <label className="text-xs! font-bold! text-zinc-700!">City</label>
                                    <input type="text" name="city" value={addressData.city} onChange={handleChange} className="w-full! border! border-zinc-300! focus:border-[#1e3322]! rounded-xl! px-4! py-2.5! text-xs! outline-none! transition-colors! font-medium! text-zinc-800! shadow-sm!" required />
                                </div>
                                <div className="flex! flex-col! gap-1.5!">
                                    <label className="text-xs! font-bold! text-zinc-700!">State</label>
                                    <input type="text" name="state" value={addressData.state} onChange={handleChange} className="w-full! border! border-zinc-300! focus:border-[#1e3322]! rounded-xl! px-4! py-2.5! text-xs! outline-none! transition-colors! font-medium! text-zinc-800! shadow-sm!" required />
                                </div>
                            </div>

                            <div className="flex! items-end! gap-6! w-full!">
                                <div className="flex! flex-col! gap-1.5! flex-1!">
                                    <label className="text-xs! font-bold! text-zinc-700!">ZIP Code</label>
                                    <input type="text" name="zipCode" value={addressData.zipCode} onChange={handleChange} className="w-full! border! border-zinc-300! focus:border-[#1e3322]! rounded-xl! px-4! py-2.5! text-xs! outline-none! transition-colors! font-medium! text-zinc-800! shadow-sm!" required />
                                </div>
                                
                                <div className="flex! items-center! gap-2! mb-3.5! select-none! shrink-0!">
                                    <input type="checkbox" id="isDefault" name="isDefault" checked={addressData.isDefault} onChange={handleChange} className="size-4! rounded! border-zinc-300! text-[#1e3322]! focus:ring-[#1e3322]! cursor-pointer!" />
                                    <label htmlFor="isDefault" className="text-xs! font-bold! text-zinc-600! cursor-pointer!">Set as default</label>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className="w-full! mt-4! py-3.5! rounded-xl! bg-[#1e3322]! text-white! text-xs! font-bold! border-0! hover:bg-[#2c4731]! transition-all! cursor-pointer! active:scale-[0.98]! shadow-sm!"
                            >
                                Save Address
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes modalFadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}

export default MyAddresses;