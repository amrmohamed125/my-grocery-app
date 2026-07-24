import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function AddProduct({ onBack }) {
    const categories = ['Fruits & Vegetables', 'Personal Care', 'Pantry Stables', 'Bakery', 'Beverages', 'Meat & Seafood', 'Snacks', 'Frozen Foods', 'Baby Care', 'Dairy & Eggs'];

    const [formData, setFormData] = useState({
        name: '',
        category: 'Select a category',
        price: '',
        originalPrice: '',
        unit: '',
        stock: '',
        description: '',
        isOrganic: false
    });

    const [selectedImageName, setSelectedImageName] = useState('Capture.PNG');
    const [showToast, setShowToast] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImageName(e.target.files[0].name);
        }
    };

    const handleSaveProduct = (e) => {
        e.preventDefault();
        console.log("Saving Product (Demo Mode):", formData);
        
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 2500);
    };

    return (
        <div className="bg-white! border! border-zinc-100! rounded-2xl! p-8! shadow-[0_2px_12px_rgba(0,0,0,0.01)]! w-full! relative!">
            
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

            {/* هيدر الصفحة مع زرار الرجوع */}
            <div className="flex! items-center! gap-4! mb-8!">
                <button 
                    type="button"
                    onClick={onBack}
                    className="size-8! bg-zinc-100! hover:bg-zinc-200! rounded-xl! flex! items-center! justify-center! border-0! text-zinc-600! cursor-pointer! transition-colors!"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="text-xs!" />
                </button>
                <h1 className="text-base! font-bold! text-zinc-900!">New Product</h1>
            </div>

            <form onSubmit={handleSaveProduct} className="flex! flex-col! gap-6!">
                
                {/* الصف الأول: الاسم والتصنيف */}
                <div className="grid! grid-cols-1 md:grid-cols-2! gap-6!">
                    <div className="flex! flex-col! gap-1.5!">
                        <label className="text-xs! font-bold! text-zinc-700!">Name</label>
                        <input 
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full! border! border-zinc-300! focus:border-emerald-700! rounded-xl! px-4! py-3! text-xs! outline-none! transition-colors! font-medium! text-zinc-800! shadow-sm!"
                            required
                        />
                    </div>
                    
                    <div className="flex! flex-col! gap-1.5! relative!">
                        <label className="text-xs! font-bold! text-zinc-700!">Category</label>
                        <select 
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full! bg-white! border! border-zinc-300! focus:border-emerald-700! rounded-xl! px-4! py-3! text-xs! outline-none! transition-colors! font-medium! text-zinc-700! shadow-sm! appearance-none! cursor-pointer!"
                        >
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <div className="absolute! right-4! bottom-4! pointer-events-none! text-zinc-500!">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-3!">
                                <path d="m6 9 6 6 6-6"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* الصف الثاني: السعر والـ Original Price */}
                <div className="grid! grid-cols-1 md:grid-cols-2! gap-6!">
                    <div className="flex! flex-col! gap-1.5!">
                        <label className="text-xs! font-bold! text-zinc-700!">Price ($)</label>
                        <input 
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            className="w-full! border! border-zinc-300! focus:border-emerald-700! rounded-xl! px-4! py-3! text-xs! outline-none! transition-colors! font-medium! text-zinc-800! shadow-sm!"
                            required
                        />
                    </div>
                    
                    <div className="flex! flex-col! gap-1.5!">
                        <label className="text-xs! font-bold! text-zinc-700!">Original Price ($) - Optional</label>
                        <input 
                            type="number"
                            name="originalPrice"
                            value={formData.originalPrice}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            className="w-full! border! border-zinc-300! focus:border-emerald-700! rounded-xl! px-4! py-3! text-xs! outline-none! transition-colors! font-medium! text-zinc-800! shadow-sm!"
                        />
                    </div>
                </div>

                {/* الصف الثالث: الـ Unit والـ Stock */}
                <div className="grid! grid-cols-1 md:grid-cols-2! gap-6!">
                    <div className="flex! flex-col! gap-1.5!">
                        <label className="text-xs! font-bold! text-zinc-700!">Unit</label>
                        <input 
                            type="text"
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            placeholder="e.g., kg, piece, liter"
                            className="w-full! border! border-zinc-300! focus:border-emerald-700! rounded-xl! px-4! py-3! text-xs! outline-none! transition-colors! font-medium! text-zinc-800! shadow-sm!"
                            required
                        />
                    </div>
                    
                    <div className="flex! flex-col! gap-1.5!">
                        <label className="text-xs! font-bold! text-zinc-700!">Stock</label>
                        <input 
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            step="1"
                            min="0"
                            placeholder="0"
                            className="w-full! border! border-zinc-300! focus:border-emerald-700! rounded-xl! px-4! py-3! text-xs! outline-none! transition-colors! font-medium! text-zinc-800! shadow-sm!"
                            required
                        />
                    </div>
                </div>

                {/* حقل رفع صورة المنتج */}
                <div className="flex! flex-col! gap-2!">
                    <label className="text-xs! font-bold! text-zinc-700!">Product Image</label>
                    <div className="flex! items-center! gap-4! border! border-zinc-200! rounded-2xl! p-4! bg-white!">
                        <label className="cursor-pointer! bg-[#ff7214]! hover:bg-[#e05e0a]! text-white! text-xs! font-bold! px-5! py-2.5! rounded-xl! transition-colors! shadow-sm!">
                            Choose File
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden!" 
                            />
                        </label>
                        <span className="text-xs! font-medium! text-zinc-500!">{selectedImageName}</span>
                    </div>
                </div>

                {/* حقل الوصف Description */}
                <div className="flex! flex-col! gap-1.5!">
                    <label className="text-xs! font-bold! text-zinc-700!">Description</label>
                    <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full! border! border-zinc-300! focus:border-emerald-700! rounded-2xl! px-4! py-3! text-xs! outline-none! transition-colors! font-medium! text-zinc-800! shadow-sm! resize-none!"
                    />
                </div>

                {/* حقل Organic Checkbox */}
                <div className="flex! items-center! gap-2.5! py-2!">
                    <input 
                        type="checkbox"
                        id="isOrganic"
                        name="isOrganic"
                        checked={formData.isOrganic}
                        onChange={handleChange}
                        className="size-4! rounded! border-zinc-300! text-emerald-700! focus:ring-emerald-700! cursor-pointer!"
                    />
                    <label htmlFor="isOrganic" className="text-xs! font-bold! text-zinc-700! cursor-pointer! select-none!">
                        Organic
                    </label>
                </div>

                <div className="border-t! border-zinc-100! pt-6! flex! justify-end!">
                    <button 
                        type="submit"
                        className="bg-[#ff7214]! hover:bg-[#e05e0a]! text-white! text-xs! font-bold! px-8! py-3! rounded-2xl! border-0! transition-all! cursor-pointer! shadow-md! active:scale-[0.98]!"
                    >
                        Save Product
                    </button>
                </div>

            </form>
        </div>
    );
}

export default AddProduct;