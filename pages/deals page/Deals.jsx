import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../components/CartContext';

function Deals() {
    const navigate = useNavigate();
    const [dealsProducts, setDealsProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { addToCart } = useCart();

    const handleAddToCart = async (itemToAdd, qty = 1) => {
        if (!itemToAdd) return;
        await addToCart(itemToAdd, qty);
    };

    useEffect(() => {
        axios.get('http://localhost:5000/api/products?page=deals')
            .then(res => {
                setDealsProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching deals:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="w-full! overflow-x-hidden!">
            <main className='min-h-screen!'>
                {/* البانر */}
                <div className='bg-linear-to-r! from-[#f97316]! to-[#ea580c]! text-white! py-10!'>
                    <div className='max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8! text-center!'>
                        <div className='flex! items-center! justify-center! gap-2! mb-2!'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='lucide lucide-zap size-6! fill-white!' aria-hidden="true"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
                            <h1 className='text-3xl! font-semibold! text-white! m-0!'>Flash Deals</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='lucide lucide-zap size-6! fill-white!' aria-hidden="true"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
                        </div>
                        <p className='text-white/80! max-w-md! mx-auto! mb-0!'>Limited-time offers on your favorite organic products. Grab them before they're gone!</p>
                    </div>
                </div>

                {/* المنتجات */}
                <section className='max-w-7xl! mx-auto! px-4! sm:px-6! lg:px-8! py-8!'>
                    <div className="w-full! max-w-[1400px]! mx-auto!">
                        <div className="mb-6!">
                            <h2 className="text-xl! font-semibold! text-zinc-800! m-0!">Today's Best Deals</h2>
                            <p className="text-sm! text-zinc-500! mt-1!">Grab the best discounts before they are gone!</p>
                        </div>

                        {loading ? (
                            <div className="text-center! py-10! text-zinc-500! font-medium!">Loading Deals...</div>
                        ) : (
                            <div className='grid! grid-cols-2! sm:grid-cols-3! lg:grid-cols-4! xl:grid-cols-5! gap-4! xl:gap-6! p-0!'>
                                {dealsProducts.map((product) => (
                                    <div 
                                        key={product._id} 
                                        onClick={() => navigate(`/products/${product._id}`)}
                                        className='bg-white rounded-2xl overflow-hidden hover:shadow-lg! duration-300! group cursor-pointer border border-gray-100 flex flex-col justify-between'
                                    >
                                        <div className='relative! aspect-square! overflow-hidden! bg-zinc-50/50! flex! items-center! justify-center!'>
                                            <img 
                                                src={new URL(`../../src/assets/images/${product.img}`, import.meta.url).href} 
                                                alt={product.name} 
                                                className='w-full h-full object-cover p-4 group-hover:p-2! transition-all! duration-300!' 
                                            />
                                            {product.discount && (
                                                <div className='absolute! left-3! top-3! flex! flex-wrap! gap-1.5! z-10!'>
                                                    <span className='px-2.5! py-0.5! text-[10px]! font-bold! uppercase! bg-orange-500! text-white! rounded-full! tracking-wide! border-0!'>
                                                        {product.discount}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className='p-3.5! text-zinc-700!'>
                                            <h3 className='text-sm! font-medium! leading-snug! mb-1.5! line-clamp-2! h-10! text-zinc-800! transition-colors! m-0!'>
                                                {product.name}
                                            </h3>
                                            
                                            <div className='flex! items-center! gap-1! mb-3!'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star size-3! text-amber-500! fill-amber-500!" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                                                <span className='text-xs! font-semibold! text-zinc-800!'>{product.rating || 4.5}</span>
                                                <span className='text-xs! text-zinc-400!'>({product.reviewsCount || 12})</span>
                                            </div>
                                            
                                            <div className='flex! items-center! justify-between! gap-1!' onClick={(e) => e.stopPropagation()}>
                                                <div className='flex! items-baseline! gap-1! truncate!'>
                                                    <span className='text-base! font-bold! text-zinc-900!'>${product.price}.0</span>
                                                    <span className='text-[11px]! text-zinc-400! block!'>{product.unit}</span>
                                                    {product.originalPrice && (
                                                        <span className='text-xs! text-zinc-400! line-through! ml-1.5!'>${product.originalPrice}.0</span>
                                                    )}
                                                </div>
                                                
                                                <button 
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleAddToCart(product, 1);
                                                    }}
                                                    className='w-8! h-8! rounded-full! bg-orange-500! text-white! flex! items-center! justify-center! shrink-0! hover:bg-orange-600! transition-colors! active:scale-95! shadow-sm! border-0! p-0! cursor-pointer!'
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus size-4!" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Deals;