import React, { useState } from 'react';

const getImageUrl = (imageName) => {
    return new URL(`../../src/assets/images/${imageName}`, import.meta.url).href;
};

// 📦 مصفوفة المنتجات
const PRODUCTS_DATA = [
    {
        id: 1,
        name: 'Cheese 200g',
        category: 'dairy-eggs',
        price: '$130.00',
        stock: 0,
        image: getImageUrl('gek3mmiig3lixlkpxks8.png')
    },
    {
        id: 2,
        name: 'Knorr Cup Soup 70g',
        category: 'pantry-staples',
        price: '$30.00',
        stock: 0,
        image: getImageUrl('vnzb2qbwtpab5gnqvx0f.png')
    },
    {
        id: 3,
        name: 'Basmati Rice 5kg',
        category: 'pantry-staples',
        price: '$520.00',
        stock: 0,
        image: getImageUrl('evuovl2nlwdjukosfz23.png')
    },
    {
        id: 4,
        name: 'Amul Milk 1L',
        category: 'dairy-eggs',
        price: '$55.00',
        stock: 62,
        image: getImageUrl('ooamzy497lhsj2gjuwby.png')
    },
    {
        id: 5,
        name: 'Banana 1kg',
        category: 'fruits-vegetables',
        price: '$45.00',
        stock: 0,
        image: getImageUrl('dsnmko6gqtyw31okby80.png')
    },
    {
        id: 6,
        name: 'Potato 500g',
        category: 'fruits-vegetables',
        price: '$35.0',
        stock: '48',
        image: getImageUrl('potato.png')
    },
    {
        id: 7,
        name: 'Carrot 500g',
        category: 'fruits-vegetables',
        price: '$44.0',
        stock: '73',
        image: getImageUrl('carrot.png')
    },
    {
        id: 8,
        name: 'Maggi Noodles 280g',
        category: 'pantry-staples',
        price: '$40.0',
        stock: '0',
        image: getImageUrl('dsep7owmwvfrukzbslqo.png')
    },
    {
        id: 9,
        name: 'Orange 1 kg',
        category: 'fruits-vegetables',
        price: '$75.0',
        stock: '37',
        image: getImageUrl('orange.png')
    },
    {
        id: 10,
        name: 'Mango 1 kg',
        category: 'fruits-vegetables',
        price: '$140.0',
        stock: '0',
        image: getImageUrl('mango.png')
    },
    {
        id: 11,
        name: 'Grapes 500g',
        category: 'fruits-vegetables',
        price: '$65.0',
        stock: '71',
        image: getImageUrl('jsmb7caaokhnyci2coga.png')
    },
    {
        id: 12,
        name: 'Tomato 1 kg',
        category: 'fruits-vegetables',
        price: '$28.0',
        stock: '74',
        image: getImageUrl('tomato.png')
    },
    {
        id: 13,
        name: 'Brown Rice 1kg',
        category: 'pantry-staples',
        price: '$110.0',
        stock: '84',
        image: getImageUrl('dboutcrkdjhoxcvbbqne.png')
    },
    {
        id: 14,
        name: 'Paneer 200g',
        category: 'dairy-eggs',
        price: '$85.0',
        stock: '60',
        image: getImageUrl('panner.png')
    },
    {
        id: 15,
        name: 'Wheat Flour 5kg',
        category: 'pantry-staples',
        price: '$230.0',
        stock: '61',
        image: getImageUrl('ooitbkcjcky0gkjmkatb.png')
    },
    {
        id: 16,
        name: '7 Up 1.5L',
        category: 'beverages',
        price: '$70.0',
        stock: '61',
        image: getImageUrl('7up.png')
    },
    {
        id: 17,
        name: 'Eggs 12 pcs',
        category: 'dairy-eggs',
        price: '$85.0',
        stock: '40',
        image: getImageUrl('egg.png')
    },
    {
        id: 18,
        name: 'Sprite 1.5L',
        category: 'beverages',
        price: '$60.0',
        stock: '80',
        image: getImageUrl('daiglpvgna1dlhjplbve.png')
    },
    {
        id: 19,
        name: 'Barley 1kg',
        category: 'pantry-staples',
        price: '$140.0',
        stock: '34',
        image: getImageUrl('spb5sgy8g24rned9nwog.png')
    },
    {
        id: 20,
        name: 'Fanta 1.5L',
        category: 'beverages',
        price: '$65.0',
        stock: '35',
        image: getImageUrl('nexecd3mgyzrpeun1bee.png')
    },
    {
        id: 21,
        name: 'Onion 500g',
        category: 'fruits-vegetables',
        price: '$45.0',
        stock: '76',
        image: getImageUrl('wnvtwlm2tphqburhsmyc.png')
    },
    {
        id: 22,
        name: 'Spinach 500g',
        category: 'fruits-vegetables',
        price: '$15.0',
        stock: '93',
        image: getImageUrl('spinach.png')
    },
    {
        id: 23,
        name: 'Coca-Cola 1.5L',
        category: 'beverages',
        price: '$75.0',
        stock: '72',
        image: getImageUrl('coca.png')
    },
    {
        id: 24,
        name: 'Brown Bread 400g',
        category: 'bakery',
        price: '$35.0',
        stock: '74',
        image: getImageUrl('bakery-B-i44uip.png')
    },
    {
        id: 25,
        name: 'Apple 1 kg',
        category: 'fruits-vegetables',
        price: '$90.0',
        stock: '85',
        image: getImageUrl('apple.png')
    }
];

function MyProducts({ onAddProduct }) {
    const [showToast, setShowToast] = useState(false);

    // دالة إظهار التوست
    const triggerDemoToast = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 2500);
    };

    return (
        <div className="bg-white! border! border-zinc-100! rounded-2xl! p-6! shadow-[0_2px_8px_rgba(0,0,0,0.01)]! relative!">
            
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

            {/* 🔝 الهيدر مع زرار إضافة منتج جديد */}
            <div className="flex! items-center! justify-between! mb-6!">
                <h2 className="text-lg! font-bold! text-zinc-900!">Products</h2>
                
                <button 
                    onClick={onAddProduct}
                    className="bg-[#1c3021]! hover:bg-[#2c4432]! text-white! text-xs! font-bold! py-2.5! px-4! rounded-xl! flex! items-center! gap-2! transition-colors! border-0! cursor-pointer!"
                >
                    <span className="text-sm! font-normal!">+</span> Add Product
                </button>
            </div>

            {/* 📊 الجدول المتجاوب */}
            <div className="overflow-x-auto!">
                <table className="w-full! text-left! border-collapse!">
                    <thead>
                        <tr className="border-b! border-zinc-100!">
                            <th className="pb-3! text-[10px]! font-bold! text-zinc-400! tracking-wider! uppercase!">Product</th>
                            <th className="pb-3! text-[10px]! font-bold! text-zinc-400! tracking-wider! uppercase!">Price</th>
                            <th className="pb-3! text-[10px]! font-bold! text-zinc-400! tracking-wider! uppercase!">Stock</th>
                            <th className="pb-3! text-[10px]! font-bold! text-zinc-400! tracking-wider! uppercase! text-right!">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y! divide-zinc-50!">
                        
                        {PRODUCTS_DATA.map((product) => (
                            <tr key={product.id}>
                                
                                {/* المنتج (الصورة + الاسم والقسم) */}
                                <td className="py-4.5! flex! items-center! gap-3!">
                                    <div className="size-15! bg-zinc-50! rounded-lg! flex! items-center! justify-center! text-lg! border! border-zinc-100!">
                                        <img src={product.image} alt={product.name} className='w-full! h-full! object-cover!'/>
                                    </div>
                                    <div className="flex! flex-col!">
                                        <span className="text-xs! font-bold! text-zinc-800!">{product.name}</span>
                                        <span className="text-[10px]! text-zinc-400! font-medium!">{product.category}</span>
                                    </div>
                                </td>

                                {/* السعر */}
                                <td className="py-4.5! text-xs! font-bold! text-zinc-800!">{product.price}</td>

                                {/* حالة المخزن ديناميكية */}
                                <td className="py-4.5!">
                                    {Number(product.stock) === 0 ? (
                                        <span className="px-2.5! py-1! text-[9px]! font-bold! rounded-md! bg-red-50! text-red-500!">
                                            Out of stock
                                        </span>
                                    ) : (
                                        <span className="px-2.5! py-1! text-[9px]! font-bold! rounded-md! bg-emerald-50! text-emerald-600!">
                                            {product.stock} in stock
                                        </span>
                                    )}
                                </td>

                                {/* الأزرار التفاعلية (تعديل وحذف) */}
                                <td className="py-4.5! text-right!">
                                    <div className="flex! items-center! justify-end! gap-1.5!">
                                        
                                        {/* زر التعديل */}
                                        <button 
                                            onClick={triggerDemoToast}
                                            className="size-7! rounded-md! border! border-zinc-100! bg-white! text-zinc-400! hover:text-zinc-600! hover:bg-zinc-50! flex! items-center! justify-center! cursor-pointer! transition-colors!"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3.5!">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>

                                        {/* زر الحذف */}
                                        <button 
                                            onClick={triggerDemoToast}
                                            className="size-7! rounded-md! border! border-zinc-100! bg-white! text-zinc-400! hover:text-red-500! hover:bg-red-50! flex! items-center! justify-center! cursor-pointer! transition-colors!"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3.5!">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>  
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyProducts;