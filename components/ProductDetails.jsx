import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../components/CartContext';

const mockReviews = [
  { id: 1, name: "Ahmed Ali", date: "2026-07-15", rating: 5, comment: "Excellent quality and fast delivery!", helpful: 3 },
  { id: 2, name: "Sara Mohamed", date: "2026-07-12", rating: 4, comment: "Very good product, highly recommended.", helpful: 1 },
  { id: 1, name: "Ahmed Ali", date: "2026-07-15", rating: 5, comment: "Excellent quality and fast delivery!", helpful: 3 },
  { id: 2, name: "Sara Mohamed", date: "2026-07-12", rating: 4, comment: "Very good product, highly recommended.", helpful: 1 }
];

const getImageUrl = (name) => {
    if (!name) return '';
    if (name.startsWith('http://') || name.startsWith('https://')) return name;
    return new URL(`../src/assets/images/${name}`, import.meta.url).href;
};

function ProductDetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const { addToCart } = useCart();

  const handleAddToCart = async (itemToAdd, qty = 1) => {
    if (!itemToAdd) return;
    setAddingToCart(true);
    await addToCart(itemToAdd, qty);
    setAddingToCart(false);
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((productData) => {
        if (!isMounted) return;
        setProduct(productData);
        
        return fetch(`/api/products`)
          .then((res) => res.json())
          .then((allProducts) => {
            if (!isMounted) return;
            const related = allProducts.filter((item) => 
              item.category === productData.category && (item._id !== productData._id && item.id !== productData._id)
            ).slice(0, 5);
            setRelatedProducts(related);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error("Error fetching product data:", err);
        if (isMounted) setLoading(false);
      });

      return () => { isMounted = false; };
  }, [id]);

  if (loading) return <div className="text-center py-20 text-slate-600">Loading product...</div>;
  if (!product) return <div className="text-center py-20">Product not found!</div>;

  const isOutOfStock = product.stock === 0;

  return (
    <div className="min-h-screen! py-6! text-zinc-700!">
      <div className="max-w-7xl! mx-auto! px-4!">
        
        <nav className="flex! items-center! gap-2! text-xs! sm:text-sm! text-gray-500! mb-4! p-0!">
          <Link to="/" className="text-gray-400! capitalize! no-underline! hover:text-gray-800! transition-all! duration-300! flex! items-center!">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5!">
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
          </Link>
          <span className="mt-0.5! block! text-gray-400!">\</span>
          <Link to="/product" className="text-gray-400! capitalize! no-underline! hover:text-gray-800! transition-all! duration-300!">Products</Link>
          <span className="mt-0.5! block! text-gray-400!">\</span>
          <span className="text-gray-400! capitalize!">{product.category}</span>
          <span className="mt-0.5! block! text-gray-400!">\</span>
          <span className="text-gray-800! font-medium!">{product.name}</span>
        </nav>

        <button 
          onClick={() => window.history.back()} 
          className="flex items-center gap-1 text-sm font-medium bg-transparent border-0 p-0 pb-4"
        >
          <span className="flex items-center gap-1 text-gray-400 hover:text-gray-800 transition-all duration-300 cursor-pointer whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left size-4" aria-hidden="true">
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg> 
            Back
          </span>
        </button>

        <div className="bg-white! rounded-2xl! p-6! border! border-zinc-100! shadow-xs! grid! grid-cols-1! md:grid-cols-2! gap-8! mb-8!">
          <div className="relative! bg-zinc-50/70! flex! items-center! justify-center! p-8! rounded-xl! aspect-square! md:aspect-auto!">
            {product.discount && (
              <span className="absolute! top-4! left-4! bg-orange-500! text-white! text-xs! font-bold! px-2! py-1! rounded-md! uppercase! tracking-wide! border-0! z-10!">
                {product.discount}
              </span>
            )}
            <img src={getImageUrl(product.img || product.image)} alt={product.name} className="max-h-80! w-auto! object-contain! mix-blend-multiply!" />
          </div>

          <div className="flex! flex-col! justify-center!">
            <span className="text-xs! font-semibold! text-gray-400! capitalize! tracking-wider! mb-1!">{product.category}</span>
            <h1 className="text-2xl! sm:text-3xl! font-bold! text-slate-800! mt-0! mb-2! m-0! leading-tight!">{product.name}</h1>
            
            <div className="flex! items-center! gap-1! text-orange-400! text-sm! mb-4!">
              <div className="flex! text-amber-500! gap-0.5!">
                {"★".repeat(Math.floor(product.rating || 4))} <span className="text-gray-300!">★</span>
              </div>
              <span className="text-slate-800! font-bold! ml-1! mt-0.5!">{product.rating || 4.5}</span>
              <span className="text-gray-400! text-xs! ml-1! mt-0.5!">({product.reviewsCount || 0} reviews)</span>
            </div>

            <div className="flex! items-baseline! gap-3! mb-4!">
              <span className="text-3xl! font-black! text-slate-900!">${Number(product.price).toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm! text-gray-400! line-through!">${Number(product.originalPrice).toFixed(2)}</span>
              )}
            </div>

            <p className="text-gray-600! text-sm! mb-6! leading-relaxed! m-0!">{product.description || 'No description available for this product.'}</p>

            <div className="mb-6!">
              {isOutOfStock ? (
                <span className="text-red-600! font-semibold! text-sm!">Out of Stock</span>
              ) : (
                <span className="text-emerald-600! font-semibold! text-sm!">✓ In Stock ({product.stock || 10} available)</span>
              )}
            </div>

            <div className="flex! items-center! gap-4!">
              <div className={`flex! items-center! border! border-slate-200! rounded-xl! overflow-hidden! bg-slate-50! h-12! ${isOutOfStock ? 'opacity-50! pointer-events-none!' : ''}`}>
                <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className="w-10! h-full! hover:bg-slate-200! text-lg! font-bold! text-slate-600! transition-colors! bg-transparent! border-0! cursor-pointer! p-0!">-</button>
                <span className="w-12! text-sm! font-bold! text-slate-800! text-center!">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10! h-full! hover:bg-slate-200! text-lg! font-bold! text-slate-600! transition-colors! bg-transparent! border-0! cursor-pointer! p-0!">+</button>
              </div>

              <button
                disabled={isOutOfStock || addingToCart}
                onClick={() => handleAddToCart(product, quantity)}
                className={`flex-1! h-12! flex! items-center! justify-center! gap-2! font-bold! text-white! px-6! rounded-xl! transition-all! text-sm! shadow-sm! border-0! cursor-pointer! p-0!
                  ${isOutOfStock || addingToCart ? 'bg-gray-300! cursor-not-allowed! opacity-60!' : 'bg-[#f97316]! hover:bg-orange-600! active:scale-[0.98]!'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart w-4! h-4!" aria-hidden="true"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg> 
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white! rounded-2xl! p-6! border! border-zinc-100! shadow-xs! mb-8!">
          <h2 className="text-xl! font-bold! text-slate-800! mb-6! m-0!">Customer Reviews</h2>
          
          <div className="grid! grid-cols-1! md:grid-cols-3! gap-8! items-center! border-b! border-slate-100! pb-8! mb-8!">
            <div className="text-center! md:border-r! border-slate-100! py-4!">
              <p className="text-5xl! font-black! text-slate-800! mb-2! m-0!">{product.rating || 4.5}</p>
              <div className="flex! justify-center! text-orange-400! text-lg! mb-1!">{"★".repeat(4)}★</div>
              <p className="text-xs! text-gray-400! m-0!">{product.reviewsCount || 12} reviews</p>
            </div>

            <div className="md:col-span-2! space-y-2! max-w-2xl! mx-auto! w-full!">
              {[
                { stars: 5, count: 2, percent: "40%" },
                { stars: 4, count: 4, percent: "60%" },
                { stars: 3, count: 0, percent: "0%" },
                { stars: 2, count: 0, percent: "0%" },
                { stars: 1, count: 0, percent: "0%" },
              ].map((row, idx) => (
                <div key={idx} className="flex! items-center! text-xs! text-slate-600! gap-3!">
                  <span className="w-5! font-bold!">{row.stars}★</span>
                  <div className="flex-1! h-2! bg-slate-100! rounded-full! overflow-hidden!">
                    <div className="h-full! bg-orange-400! rounded-full!" style={{ width: row.percent }} />
                  </div>
                  <span className="w-5! text-right! text-gray-400!">{row.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6!">
            {mockReviews.map((rev) => (
              <div key={rev.id} className="border-b! border-slate-100! pb-6! last:border-0! last:pb-0!">
                <div className="flex! items-start! gap-3!">
                  <div className="w-9! h-9! rounded-full! bg-slate-100! flex! items-center! justify-center! font-bold! text-xs! text-slate-600! shrink-0!">
                    {rev.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1!">
                    <div className="flex! items-center! gap-2! mb-1!">
                      <span className="text-sm! font-bold! text-slate-800!">{rev.name}</span>
                      <span className="text-[11px]! text-gray-400!">• {rev.date}</span>
                    </div>
                    <div className="flex! text-orange-400! text-xs! mb-2!">
                      {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                    </div>
                    <p className="text-gray-600! text-xs! sm:text-sm! leading-relaxed! mb-3! m-0!">{rev.comment}</p>
                    <button className="text-xs! text-gray-400! hover:text-slate-700! flex! items-center! gap-1! transition-colors! bg-transparent! border-0! cursor-pointer! p-0!">
                      👍 Helpful ({rev.helpful})
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4! flex! items-center! justify-between! p-0!">
          <div>
            <h2 className="text-xl! font-bold! text-slate-800! m-0!">Related Products</h2>
          </div>
          <Link to="/product" className="text-sm! font-semibold! text-[#f97316]! hover:text-[#ea580c]! flex! items-center! gap-1! no-underline!">
            View All 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4! h-4!" aria-hidden="true">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>

        {/* Related Products Grid - 2 per row on mobile */}
        <div className="grid! grid-cols-2! sm:grid-cols-3! md:grid-cols-4! lg:grid-cols-5! gap-3! sm:gap-4! p-0!">
          {relatedProducts.length === 0 ? (
            <p className="col-span-full! text-xs! text-gray-400! py-4! m-0!">No related products found in this category.</p>
          ) : (
            relatedProducts.map((item) => (
              <Link 
                to={`/products/${item._id || item.id}`}
                key={item._id || item.id} 
                className="w-full! bg-white! rounded-2xl! p-3! border! border-slate-100! hover:shadow-md! transition-all! duration-300! group flex! flex-col! justify-between! no-underline!"
              >
                <div className="relative! aspect-square! bg-slate-50! rounded-xl! flex! items-center! justify-center! mb-2! overflow-hidden!">
                  {item.discount && (
                    <span className="absolute! top-2! left-2! bg-orange-500! text-[9px]! font-black! text-white! px-1.5! py-0.5! rounded! uppercase! border-0! z-10!">
                      {item.discount}
                    </span>
                  )}
                  <img src={getImageUrl(item.img || item.image)} alt={item.name} className="w-full! h-full! object-cover! p-4! group-hover:p-2! transition-all! duration-300!" />
                </div>
                
                <div className="text-zinc-700!">
                  <h3 className="text-xs! font-bold! text-slate-800! line-clamp-2! min-h-8! mb-1! m-0!">{item.name}</h3>
                  <div className="flex! items-center! gap-1! text-[10px]! text-orange-400! mb-2!">
                    <span>★ {item.rating || 4.5}</span>
                    <span className="text-gray-400!">({item.reviewsCount || 0})</span>
                  </div>
                </div>

                <div className="flex! items-center! justify-between! mt-1!">
                  <div className="flex! items-baseline! gap-0.5! truncate!">
                    <span className="text-xs! font-black! text-slate-900!">${Number(item.price).toFixed(2)}</span>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(item, 1);
                    }}
                    className="w-6! h-6! rounded-lg! bg-[#f97316]! text-white! flex! items-center! justify-center! shrink-0! hover:bg-[#ea580c]! transition-colors! border-0! active:scale-95! cursor-pointer! shadow-sm! p-0!"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-3.5!">
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </button>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;