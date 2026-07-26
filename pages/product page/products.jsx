import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


const CATEGORIES = [
    { id: 'all', name: 'All Categories' },
    { id: 'fruits', name: 'Fruits & Vegetables' },
    { id: 'personal', name: 'Personal Care' },
    { id: 'pantry', name: 'Pantry Staples' },
    { id: 'bakery', name: 'Bakery' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'meat', name: 'Meat & Seafood' },
    { id: 'snacks', name: 'Snacks' },
    { id: 'frozen', name: 'Frozen Foods' },
    { id: 'baby', name: 'Baby Care' },
    { id: 'dairy', name: 'Dairy & Eggs' }
];

function AllProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [activeCategory, setActiveCategory] = useState('all');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState('Newest');

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // 🌐 جلب البيانات من الباك اند
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/products');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleClearFilters = () => {
        setActiveCategory('all');
        setMinPrice('');
        setMaxPrice('');
        setSortBy('Newest');
    };

    const currentCategoryName = CATEGORIES.find(cat => cat.id === activeCategory)?.name || 'All Products';

    const filteredProducts = products.filter((product) => {
        if (activeCategory !== 'all' && product.category?.toLowerCase() !== activeCategory.toLowerCase()) {
            return false;
        }
        if (minPrice !== '' && product.price < Number(minPrice)) {
            return false;
        }
        if (maxPrice !== '' && product.price > Number(maxPrice)) {
            return false;
        }
        return true;
    }).sort((a, b) => {
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        if (sortBy === 'A - Z') return a.name.localeCompare(b.name); 
        return 0;
    });

    // محتوى الفلاتر 
    const renderFilterContent = () => (
        <>
            <h2 className='text-xs! font-bold! text-zinc-900! mb-3! px-1!'>Categories</h2>
            
            <div className='flex! flex-col! gap-0.5! mb-6!'>
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => {
                            setActiveCategory(cat.id);
                            setIsMobileFilterOpen(false); // إغلاق الدروار بعد الاختيار في الموبايل
                        }}
                        className={`w-full! text-left! px-3! py-2! rounded-lg! text-xs! font-medium! transition-all! cursor-pointer! ${
                            activeCategory === cat.id
                                ? 'bg-[#1e3322]! text-white! font-semibold!' 
                                : 'text-zinc-600! hover:bg-zinc-50! hover:text-zinc-900!'
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Price Range */}
            <div className='pt-4! border-t! border-zinc-100! px-1!'>
                <h3 className='text-xs! font-bold! text-zinc-900! mb-3!'>Price Range</h3>
                <div className='flex! items-center! gap-2! mb-3!'>
                    <input 
                        type="number" 
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className='w-full! bg-white border! border-zinc-200! rounded-lg! p-2! text-xs! text-center! outline-none! focus:border-[#f97316]! transition-colors! font-medium! text-zinc-700! shadow-sm!'
                        placeholder="Min"
                    />
                    <span className='text-zinc-400! text-xs! font-bold!'>-</span>
                    <input 
                        type="number" 
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className='w-full! bg-white border! border-zinc-200! rounded-lg! p-2! text-xs! text-center! outline-none! focus:border-[#f97316]! transition-colors! font-medium! text-zinc-700! shadow-sm!'
                        placeholder="Max"
                    />
                </div>

                {(minPrice !== '' || maxPrice !== '' || activeCategory !== 'all') && (
                    <div className='text-center! mt-2! pt-1!'>
                        <button 
                            onClick={handleClearFilters}
                            className='text-red-500! hover:text-red-600! text-xs! font-semibold! bg-transparent! border-0! cursor-pointer! transition-colors! active:scale-95!'
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>
        </>
    );

    return (
        <div className='max-w-7xl! mx-auto! px-6! py-6! font-sans! text-zinc-800 min-h-screen! relative!'>

            {/* 🔴 Breadcrumbs */}
            <div className='flex! items-center! gap-2! text-xs! text-zinc-500! mb-6!'>
                <Link to="/" className='text-zinc-500! hover:text-zinc-800! transition-all! duration-300! flex! items-center!'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5!">
                        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    </svg>
                </Link>
                <span className='text-zinc-300!'>/</span>
                <span className='text-zinc-700! font-medium!'>{currentCategoryName}</span>
            </div>

            {/* 🖥️ Layout Grid */}
            <div className='grid! grid-cols-1 lg:grid-cols-4! gap-8! items-start!'>
                
                {/* 🔲 Desktop Sidebar */}
                <aside className='hidden! lg:block! w-full! bg-white rounded-2xl! p-4! border! border-zinc-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] lg:col-span-1! lg:sticky! lg:top-6! max-h-[calc(100vh-48px)]! overflow-y-auto!'>
                    {renderFilterContent()}
                </aside>

                {/* 📱 Mobile Drawer Overlay & Content */}
                {isMobileFilterOpen && (
                    <div 
                        className="fixed! inset-0! bg-black/40! z-40! lg:hidden! backdrop-blur-xs! transition-opacity!"
                        onClick={() => setIsMobileFilterOpen(false)}
                    />
                )}
                
                <div 
                    className={`fixed! top-0! right-0! z-50! h-full! w-[280px]! bg-white! p-5! shadow-2xl! transition-transform! duration-300! ease-in-out! overflow-y-auto! lg:hidden! ${
                        isMobileFilterOpen ? 'translate-x-0!' : 'translate-x-full!'
                    }`}
                >
                    <div className="flex! items-center! justify-between! pb-4! mb-4! border-b! border-zinc-100!">
                        <h2 className="text-sm! font-bold! text-zinc-900! m-0!">Filters</h2>
                        <button 
                            onClick={() => setIsMobileFilterOpen(false)}
                            className="size-8! rounded-full! bg-zinc-100! text-zinc-600! flex! items-center! justify-center! border-0! cursor-pointer! hover:bg-zinc-200! transition-colors!"
                        >
                            <FontAwesomeIcon icon={faXmark} className="text-sm!" />
                        </button>
                    </div>

                    {renderFilterContent()}
                </div>

                {/* 🔵 Main Section */}
                <main className='w-full! lg:col-span-3!'>
                    
                    <div className='flex! items-center! justify-between! gap-4! mb-6!'>
                        <div>
                            <h1 className='text-lg! font-bold! text-zinc-900! m-0!'>{currentCategoryName}</h1>
                            {!loading && !error && (
                                <p className='text-xs! text-zinc-400! mt-0.5! mb-0!'>{filteredProducts.length} products found</p>
                            )}
                        </div>

                        {/* 🎛️ أزرار التحكم الفلتر والترتيب للموبايل والـ Desktop */}
                        <div className='flex! items-center! gap-2!'>
                            
                            {/* 📱 زرار الفلتر بيظهر في الموبايل فقط */}
                            <button
                                onClick={() => setIsMobileFilterOpen(true)}
                                className='lg:hidden! flex! items-center! gap-2! bg-white! border! border-zinc-200! text-zinc-700! text-xs! font-medium! px-3.5! py-2! rounded-xl! shadow-sm! active:scale-95! transition-all! cursor-pointer!'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5!">
                                    <line x1="4" x2="20" y1="21" y2="21"></line>
                                    <line x1="4" x2="20" y1="14" y2="14"></line>
                                    <line x1="4" x2="20" y1="7" y2="7"></line>
                                    <circle cx="8" cy="21" r="2"></circle>
                                    <circle cx="16" cy="14" r="2"></circle>
                                    <circle cx="12" cy="7" r="2"></circle>
                                </svg>
                                <span>Filters</span>
                            </button>

                            {/* قائمة الترتيب Sort By */}
                            <div className='relative! w-32! sm:w-36!'>
                                <select 
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className='w-full! bg-white border! border-zinc-200! rounded-xl! px-3! py-2! text-xs! font-medium! text-zinc-700! shadow-sm! appearance-none! outline-none! focus:border-[#f97316]! cursor-pointer!'
                                >
                                    <option value="Newest">Newest</option>
                                    <option value="Price: Low to High">Price: Low to High</option>
                                    <option value="Price: High to Low">Price: High to Low</option>
                                    <option value="A - Z">A - Z</option>
                                </select>
                                <div className='absolute! inset-y-0! right-3! flex! items-center! pointer-events-none! text-zinc-400!'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3!">
                                        <path d="m6 9 6 6 6-6"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center! py-24! text-xs! text-zinc-500!">Loading products...</div>
                    ) : error ? (
                        <div className="text-center! py-24! text-xs! text-red-500!">{error}</div>
                    ) : filteredProducts.length === 0 ? (
                        <div className='flex! flex-col! items-center! justify-center! text-center! py-24! bg-transparent!'>
                            <h2 className='text-xl! font-bold! text-zinc-900! mb-2!'>No products found</h2>
                            <p className='text-xs! text-zinc-500! mb-5!'>Try adjusting your filters or search terms</p>
                            <button 
                                onClick={handleClearFilters}
                                className='bg-[#1e3322]! text-white! text-xs! font-semibold! px-6! py-2.5! rounded-full! border-0! hover:bg-[#2c4731]! transition-all! cursor-pointer! active:scale-95!'
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className='grid! grid-cols-2! md:grid-cols-3! xl:grid-cols-4! gap-4!'>
                            {filteredProducts.map((product) => {
                                const productId = product._id || product.id;

                                return (
                                    <Link 
                                        to={`/products/${productId}`} 
                                        key={productId} 
                                        className='no-underline!'
                                    >
                                        <div className='bg-white rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 group animate-fade-in! cursor-pointer relative!'>

                                            {/* حاوية الصورة */}
                                            <div className='relative! w-full! aspect-square! bg-zinc-50/40! flex! items-center! justify-center! p-6!'>
                                                <img 
                                                src={new URL(`../../src/assets/images/${product.img}`, import.meta.url).href} 
                                                alt={product.name} 
                                                className='w-full h-full object-cover p-4 group-hover:p-2! transition-all! duration-300!' />
                                                {product.discount && (
                                                    <div className='absolute! left-3! top-3!'>
                                                        <span className='px-1.5! py-0.5! text-[9px]! font-bold! bg-[#f97316]! text-white! rounded-md! uppercase! tracking-wider!'>
                                                            {product.discount}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* تفاصيل المنتج */}
                                            <div className='p-3! flex! flex-col! justify-between! flex-1! bg-white!'>
                                                <div>
                                                    <h3 className='text-xs! font-medium! text-zinc-800! leading-snug! line-clamp-2! min-h-8! mb-1!'>
                                                        {product.name}
                                                    </h3>
                                                    
                                                    <div className='flex! items-center! gap-1! mb-2!'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#f59e0b]! fill-[#f59e0b]!">
                                                            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                                                        </svg>
                                                        <span className='text-[10px]! font-bold! text-zinc-800!'>{product.rating || '4.5'}</span>
                                                        <span className='text-[9px]! text-zinc-400!'>(12)</span>
                                                    </div>
                                                </div>

                                                <div className='flex! items-center! justify-between! pt-1!'>
                                                    <div className='flex! items-baseline! gap-0.5! truncate!'>
                                                        <span className='text-xs! font-bold! text-zinc-950!'>${product.price}</span>
                                                        <span className='text-[9px]! text-zinc-400! font-medium!'>{product.unit || '/1kg'}</span>
                                                        {product.originalPrice && product.originalPrice > product.price && (
                                                            <span className='text-[9px]! text-zinc-300! line-through! ml-1.5!'>${product.originalPrice}</span>
                                                        )}
                                                    </div>
                                                    
                                                    {/* زر إضافة للسلة */}
                                                    <button 
                                                        type="button"
                                                        onClick={(e) => triggerDemoToast(e)}
                                                        className='size-6! rounded-lg! bg-[#f97316]! text-white! flex! items-center! justify-center! shrink-0! hover:bg-[#ea580c]! transition-colors! border-0! active:scale-95! cursor-pointer! shadow-sm!'
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-3.5!">
                                                            <path d="M5 12h14"></path>
                                                            <path d="M12 5v14"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default AllProductsPage;