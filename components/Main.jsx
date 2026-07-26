import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext';

const CATEGORIES = [
    { id: 1, name: 'Fruits & Vegetables', img: 'fruits_vegetables-DKTFzdXr.png' },
    { id: 2, name: 'Personal Care', img: 'personal_care-DGCwg-ZT.png' },
    { id: 3, name: 'Pantry Staples', img: 'pantry_staples-CcPzJo59.png' },
    { id: 4, name: 'Bakery', img: 'bakery-B-i44uip.png' },
    { id: 5, name: 'Beverages', img: 'drinks-5Jevbc87.png' },
    { id: 6, name: 'Meat & Seafood', img: 'meat_seafood-B2LTBWqG.png' },
    { id: 7, name: 'Snacks', img: 'snacks-Br0zj0km.png' },
    { id: 8, name: 'Frozen Foods', img: 'frozen_foods-CJqLnA0J.png' },
    { id: 9, name: 'Baby care', img: 'baby_care-CoAR19dL.png' }
];

const getImageUrl = (name) => {
    if (!name) return '';
    if (name.startsWith('http://') || name.startsWith('https://')) {
        return name;
    }
    return new URL(`../src/assets/images/${name}`, import.meta.url).href;
};

function Main() {
    const { addToCart } = useCart();
    
    const [popularProducts, setPopularProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/products?page=home_page');
                if (!response.ok) {
                    throw new Error('Failed to fetch popular products');
                }
                
                const data = await response.json();
                
                setPopularProducts(Array.isArray(data) ? data : data.products || []);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <main className='min-h-screen'>
            <div className='min-h-screen max-w-7xl mx-auto px-4 sm:px-6 py-12'>
                {/* Hero */}
                <section className='relative overflow-hidden min-h-[540px] rounded-3xl flex items-center mb-5'>
                    <img src={getImageUrl('hero_bg-iD2fuyEl.jpeg')} alt="hero" className='absolute inset-0 object-cover w-full h-full' />
                    <div className='absolute inset-0 w-full h-full bg-gradient-to-r from-[#1b3022] via-[#1b3022]/65 to-transparent'></div>
                    
                    <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full'>
                        <div className='max-w-xl xl:pl-10'>
                            <span className='inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-orange-300 bg-orange-300/10 rounded-full mb-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-leaf size-3" aria-hidden="true">
                                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                                </svg> 
                                Farm-Fresh & Organic
                            </span>
                            <h1 className='font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4'>
                                Nourish your home with <span className='text-orange-300'>Earth's finest</span>
                            </h1>
                            <p className='text-base text-white/70 leading-relaxed mb-4 max-w-md'>Fresh, organic groceries delivered from local farms to your doorstep. Quality you can taste, convenience you deserve.</p>

                            <div className='flex flex-wrap items-center gap-4 mt-2'>
                                <Link to="/product" className='inline-flex items-center justify-center gap-2 px-7 py-3 bg-orange-400 text-white font-semibold rounded-full hover:bg-orange-500 transition-all active:scale-95 no-underline! h-fit'>
                                    Shop Now 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right size-4" aria-hidden="true">
                                        <path d="M5 12h14"></path>
                                        <path d="m12 5 7 7-7 7"></path>
                                    </svg>
                                </Link>

                                <Link to="/product" className='inline-flex items-center justify-center px-7 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all border border-white/10 no-underline! h-fit'>
                                    Browse Categories
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* info */}
                <section className='bg-white border border-[#e5e7eb]/80 rounded-xl py-2'>
                    <div className='mx-auto px-4 sm:px-6 lg:px-8'>
                        <div className='grid grid-cols-2 md:grid-cols-4 lg:px-8'>
                            <div className='flex items-center gap-3 py-3'>
                                <div className='size-10 rounded-lg flex items-center justify-center shrink-0 bg-[#faf7f2]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck size-5 text-[#1b3022]" aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg>
                                </div>
                                <div>
                                    <p className='text-sm font-semibold text-[#1b3022] mb-0'>Free Delivery</p>
                                    <p className='text-xs text-[#6b7280]'>Orders over $20</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-3 py-3'>
                                <div className='size-10 rounded-lg flex items-center justify-center shrink-0 bg-[#faf7f2]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-leaf size-5 text-[#1b3022]" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
                                </div>
                                <div>
                                    <p className='text-sm font-semibold text-[#1b3022] mb-0'>100% Organic</p>
                                    <p className='text-xs text-[#6b7280]'>Certified Products</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-3 py-3'>
                                <div className='size-10 rounded-lg flex items-center justify-center shrink-0 bg-[#faf7f2]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock size-5 text-[#1b3022]" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                                </div>
                                <div>
                                    <p className='text-sm font-semibold text-[#1b3022] mb-0'>Same Day</p>
                                    <p className='text-xs text-[#6b7280]'>Express Delivery</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-3 py-3'>
                                <div className='size-10 rounded-lg flex items-center justify-center shrink-0 bg-[#faf7f2]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check size-5 text-[#1b3022]" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
                                </div>
                                <div>
                                    <p className='text-sm font-semibold text-[#1b3022] mb-0'>Secure Pay</p>
                                    <p className='text-xs text-[#6b7280]'>Safe Checkout</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className='py-12 md:py-16'>
                    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                        <div>
                            <h2 className='text-2xl font-semibold text-zinc-800'>Browse Categories</h2>
                            <p className='text-sm text-[#6b7280] mt-1'>Find exactly what you need using</p>
                        </div>

                        <div className='flex items-center justify-start md:justify-between gap-4 sm:gap-6 mt-8 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-2'>
                            {CATEGORIES.map((category) => (
                                <Link 
                                    key={category.id} 
                                    to={`/product?category=${category.name}`} 
                                    className='group flex flex-col items-center gap-3 no-underline! shrink-0'
                                >
                                    <div className='size-20 sm:size-24 lg:size-25 p-3 rounded-2xl bg-orange-100/60 group-hover:bg-orange-100 group-hover:ring-2 ring-orange-300/75 transition-all duration-200 flex items-center justify-center'>
                                        <img 
                                            src={getImageUrl(category.img)} 
                                            alt={category.name} 
                                            className='w-full h-full object-contain transition-all' 
                                        />
                                    </div>
                                    <span className='text-xs font-medium text-zinc-600 group-hover:text-zinc-900 text-center leading-tight line-clamp-2 w-20 sm:w-24'>
                                        {category.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Popular Products */}
                <section className='py-16'>
                    <div className='max-w-7xl mx-auto px-4'>
                        <div className='flex items-center justify-between mb-8'>
                            <div>
                                <h2 className='text-2xl font-semibold'>Popular Products</h2>
                                <span className='text-sm text-[#6b7280] mt-1 block'>Top-rated products this season</span>
                            </div>
                            
                            <Link to="/product" className='text-sm font-semibold text-[#f97316]! hover:text-[#ea580c]! flex items-center gap-1 transition-all! duration-200! no-underline!'>
                                View All 
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right size-4" aria-hidden="true">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </Link>
                        </div>

                        {/* 3️⃣ حالة التحميل أو الخطأ أو عرض البيانات الـ Dynamic */}
                        {loading ? (
                            <div className="text-center py-10 font-medium text-gray-500">Loading products...</div>
                        ) : error ? (
                            <div className="text-center py-10 font-medium text-red-500">Error: {error}</div>
                        ) : popularProducts.length === 0 ? (
                            <div className="text-center py-10 font-medium text-gray-500">No products found.</div>
                        ) : (
                            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-8'>
                                {popularProducts.map((product) => (
                                    <div key={product._id || product.id} className='bg-white rounded-2xl overflow-hidden hover:shadow-lg! duration-300! group cursor-pointer border border-gray-100 flex flex-col justify-between'>
                                        
                                        <Link to={`/products/${product._id || product.id}`} className='no-underline! block flex-1 flex flex-col justify-between'>
                                            
                                            <div className='relative aspect-square overflow-hidden bg-gray-50/50 w-full'>
                                                <img 
                                                    src={getImageUrl(product.img)} 
                                                    alt={product.name} 
                                                    className='w-full h-full object-cover p-4 group-hover:p-2! transition-all! duration-300!' 
                                                />
                                                {product.discount && (
                                                    <div className='absolute left-3 top-3 flex flex-wrap gap-1.5'>
                                                        <span className='px-2 py-0.5 text-[10px] font-semibold uppercase bg-[#f97316] text-white rounded-full'>
                                                            {product.discount}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className='p-3.5 text-zinc-700! flex-1 flex flex-col justify-between'>
                                                <div>
                                                    <h3 className='text-sm! font-medium! text-gray-800 leading-snug! mb-1.5 line-clamp-2! min-h-10 text-start'>
                                                        {product.name}
                                                    </h3>
                                                    <div className='flex items-center gap-1 mb-2'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star size-3 text-[#f59e0b] fill-[#f59e0b]" aria-hidden="true">
                                                            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                                                        </svg>
                                                        <span className='text-xs font-medium text-[#1b3022]'>{product.rating || '4.5'}</span>
                                                        <span className='text-xs text-[#6b7280]'>({product.reviewsCount || '12'})</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>

                                        <div className='p-3.5 pt-0 text-zinc-700!'>
                                            <div className='flex items-center justify-between mt-2'>
                                                <div className='flex items-baseline gap-1 truncate'>
                                                    <span className='text-base font-bold text-gray-900'>${product.price}</span>
                                                    <span className='text-[10px] text-[#6b7280]'>{product.unit}</span>
                                                    {product.originalPrice && product.originalPrice > product.price && (
                                                        <span className='text-xs text-[#6b7280] line-through ml-1'>${product.originalPrice}</span>
                                                    )}
                                                </div>
                                                
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        addToCart(product);
                                                    }} 
                                                    className='size-7 rounded-xl! bg-[#f97316]! text-white flex items-center justify-center shrink-0 hover:bg-[#ea580c]! transition-colors border-0 active:scale-95! cursor-pointer'
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/xl" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus size-3.5" aria-hidden="true">
                                                        <path d="M5 12h14"></path>
                                                        <path d="M12 5v14"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* App Promo */}
                <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 my-14 bg-green-950 rounded-2xl'>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-8 xl:px-10'>
                        <div className='md:text-left text-center'>
                            <h2 className='font-serif text-3xl! sm:text-4xl text-white mb-3 text-start!'>Get fresh groceries in minutes</h2>
                            <p className='text-white/70 mb-6 max-w-md! text-start!'>Download the app for exclusive deals, real-time tracking, and the freshest selection delivered right to your door.</p>
                            <div className='flex flex-wrap gap-3 justify-center md:justify-start'>
                                <button className='px-6 py-2.5 bg-white text-green-950! font-semibold! rounded-xl! hover:bg-orange-100! transition-all!'>App Store</button>
                                <button className='px-6 py-2.5 bg-white/10 text-white font-semibold! rounded-xl! hover:bg-white/20! transition-all! border border-white/20'>Google Play</button>
                            </div>
                        </div>
                        <img src={getImageUrl('delivery_truck-BvY4lSkI.svg')} alt="Delivery Truck" className='max-w-60 sm:max-w-120 xl:pr-10'/>
                    </div>
                </section>

                {/* Newsletter */}
                <section className='bg-white py-18 px-4 sm:px-6 lg:px-8 rounded-3xl mx-auto shadow-sm mt-32 mb-20 border border-gray-100'>
                    <div className='max-w-2xl mx-auto text-center'>
                        <div className='size-16 bg-[#faf7f2] rounded-xl flex items-center justify-center mx-auto mb-6 text-[#1b3022]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail size-8" aria-hidden="true">
                                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                            </svg>
                        </div>
                        <h2 className='text-3xl font-semibold mb-4 text-[#1b3022]'>Subscribe to our newsletter</h2>
                        <p className='text-[#6b7280] mb-8 text-base'>Get weekly updates on fresh produce, seasonal offers, and exclusive discounts right to your inbox.</p>
                        <form className='flex flex-col sm:flex-row gap-3 max-w-md mx-auto' onSubmit={(e) => e.preventDefault()}>
                            <input type="email" className='flex-1 px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#1b3022] focus:ring-1 focus:ring-[#1b3022] bg-white text-sm transition-all' placeholder='Enter your email address' required/>
                            <button type='submit' className='px-8 py-3.5 bg-[#1b3022]! text-white font-semibold! rounded-xl! hover:bg-[#2d4a35]! transition-all! shadow-sm whitespace-nowrap active:scale-[0.98]!'>Subscribe</button>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Main;