import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';

function Navbar() {
  const { cartItems, setIsCartOpen } = useCart();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // حساب إجمالي عدد القطع في السلة ديناميكياً
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // متابعة حالة التسجيل وجلب اليوزر
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();

    // للاستجابة فوراً عند تسجيل الدخول أو الخروج
    window.addEventListener('storage', checkUser);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('storage', checkUser);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // دالة تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsDropdownOpen(false);
    window.dispatchEvent(new Event("storage"));
    navigate('/login');
  };

  // أول حرف من اسم المستخدم
  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <nav className="bg-white! sticky! top-0! z-50! border-b! border-gray-200!">
      <div className="max-w-7xl! mx-auto! px-4! py-2! sm:px-6! lg:px-8! flex! items-center! justify-between! h-16! gap-4!">
        
        {/* اللوجو */}
        <Link className="font-extrabold! text-xl! flex! items-center! text-black! no-underline! m-0! p-0!" to="/">
          <i className="fa-solid fa-person-biking text-[#108910]! mr-2!"></i>
          <span className="tracking-tight! font-black! text-black!">Instacart</span>
        </Link>

        {/* الروابط وشريط البحث */}
        <div className="w-full! flex! items-center! justify-end! gap-4! lg:gap-6!">
          <div className="hidden! md:flex! items-center! text-sm!">
            <ul className="flex! items-center! gap-5! m-0! p-0! list-none!">
              <li>
                <Link to="/" className="text-zinc-600! font-bold! no-underline! text-sm! hover:text-black!">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/product" className="text-zinc-600! font-bold! no-underline! text-sm! hover:text-black!">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-[#f97316]! font-bold! no-underline! text-sm!">
                  Deals
                </Link>
              </li>
            </ul>
          </div>

          <form className='hidden! sm:flex! flex-1! max-w-sm! text-xs! sm:text-sm!' onSubmit={(e) => e.preventDefault()}>
            <div className='relative! w-full!'>
              <i className="fa-solid fa-magnifying-glass absolute! left-4! top-1/2! -translate-y-1/2! text-gray-400! text-sm!"></i>
              <input 
                type="text" 
                placeholder="Search for groceries..." 
                className="w-full! bg-[#fcf5ee]! border! border-[#f7eade]! rounded-full! py-2! pl-11! pr-4! text-sm! focus:outline-none! focus:border-[#e2cbba]! transition-all! text-gray-700! font-medium!"
              />
            </div>
          </form>
        </div>

        {/* أيقونة السلة وحساب المستخدم */}
        <div className="flex! items-center! gap-3!">
          
          {/* زر فتح السلة */}
          <div 
            onClick={() => setIsCartOpen(true)} 
            className="relative! p-2! cursor-pointer! text-lg! text-gray-800!"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="lucide lucide-shopping-cart size-5! text-zinc-900!" 
            >
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>

            <span className="absolute! top-0! right-0! bg-[#f97316]! text-white! text-[10px]! rounded-full! w-4! h-4! flex! items-center! justify-center! font-bold!">
              {totalItems}
            </span>
          </div>

          {/* الجزء الخاص بالمستخدم */}
          <div className='relative!' ref={dropdownRef}>
            <div className='flex! items-center! gap-2!'>
              {user ? (
                /* 🟢 القائمة المنسدلة */
                <div className="relative!">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex! items-center! gap-2! cursor-pointer! bg-transparent! border-0! p-0! focus:outline-none! shadow-none!"
                  >
                    <div className="w-9! h-9! rounded-full! bg-black! text-white! font-bold! text-sm! flex! items-center! justify-center! shadow-sm! uppercase! select-none!">
                      {firstLetter}
                    </div>
                    <i className={`fa-solid fa-chevron-down text-[11px]! text-gray-500! transition-transform! duration-200! ${isDropdownOpen ? 'rotate-180!' : ''}`}></i>
                  </button>

                  {/* القائمة المنسدلة مع تأثير Fade in / Slide down سلس */}
                  <div className={`absolute! right-0! mt-2! w-64! bg-white! rounded-3xl! shadow-2xl! border! border-gray-100! p-4! z-50! text-slate-700! transition-all! duration-200! ease-out! ${
                    isDropdownOpen 
                      ? 'opacity-100! translate-y-0! pointer-events-auto!' 
                      : 'opacity-0! -translate-y-2! pointer-events-none!'
                  }`}>
                    
                    {/* الاسم والإيميل */}
                    <div className="pb-3! border-b! border-gray-100! mb-2! px-2!">
                      <p className="font-bold! text-slate-800! text-sm! m-0! tracking-wide!">{user.name || 'User'}</p>
                      <p className="text-xs! text-gray-400! truncate! m-0! font-normal!">{user.email || 'user@example.com'}</p>
                    </div>

                    {/* الروابط والأيقونات مع استخدام group للـ Hover التزامني */}
                    <div className="flex! flex-col! gap-1!">
                      <Link
                        to="/myorder"
                        onClick={() => setIsDropdownOpen(false)}
                        className="group flex! items-center! gap-3! px-2! py-2! text-sm! font-medium! text-zinc-500! hover:text-zinc-900! hover:bg-[#faf7f2]! rounded-xl! transition-all! duration-300! no-underline!"
                      >
                        <i className="fa-solid fa-box text-gray-400! group-hover:text-zinc-900! transition-all! duration-300! text-base! w-5! text-center!"></i>
                        <span>My Orders</span>
                      </Link>

                      <Link
                        to="/address"
                        onClick={() => setIsDropdownOpen(false)}
                        className="group flex! items-center! gap-3! px-2! py-2! text-sm! font-medium! text-zinc-500! hover:text-zinc-900! hover:bg-[#faf7f2]! rounded-xl! transition-all! duration-300! no-underline!"
                      >
                        <i className="fa-solid fa-location-dot text-gray-400! group-hover:text-zinc-900! transition-all! duration-300! text-base! w-5! text-center!"></i>
                        <span>Addresses</span>
                      </Link>

                      <Link
                        to="/product"
                        onClick={() => setIsDropdownOpen(false)}
                        className="group flex! items-center! gap-3! px-2! py-2! text-sm! font-medium! text-zinc-500! hover:text-zinc-900! hover:bg-[#faf7f2]! rounded-xl! transition-all! duration-300! no-underline!"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square text-gray-400! group-hover:text-zinc-900! transition-all! duration-300! text-sm! w-5! text-center!"></i>
                        <span>Products</span>
                      </Link>

                      <Link
                        to="/deals"
                        onClick={() => setIsDropdownOpen(false)}
                        className="group flex! items-center! gap-3! px-2! py-2! text-sm! font-medium! text-zinc-500! hover:text-zinc-900! hover:bg-[#faf7f2]! rounded-xl! transition-all! duration-300! no-underline!"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square text-gray-400! group-hover:text-zinc-900! transition-all! duration-300! text-sm! w-5! text-center!"></i>
                        <span>Deals</span>
                      </Link>

                      <Link
                        to="/admin"
                        onClick={() => setIsDropdownOpen(false)}
                        className="group flex! items-center! gap-3! px-2! py-2! text-sm! font-medium! text-amber-600! hover:text-amber-800! hover:bg-[#faf7f2]! rounded-xl! transition-all! duration-300! no-underline!"
                      >
                        <i className="fa-solid fa-shield-halved text-amber-500! group-hover:text-amber-700! transition-all! duration-300! text-base! w-5! text-center!"></i>
                        <span>Admin Panel</span>
                      </Link>
                    </div>

                    {/* زرار Logout */}
                    <div className="border-t! border-gray-100! pt-2! mt-2!">
                      <button
                        onClick={handleLogout}
                        className="group w-full! flex! items-center! gap-3! px-2! py-2! text-sm! font-medium! text-rose-400! hover:text-rose-600! hover:bg-[#faf7f2]! rounded-xl! transition-all! duration-300! bg-transparent! border-0! cursor-pointer! text-left!"
                      >
                        <i className="fa-solid fa-arrow-right-from-bracket text-rose-400! group-hover:text-rose-600! transition-all! duration-300! text-base! w-5! text-center!"></i>
                        <span>Logout</span>
                      </button>
                    </div>

                  </div>
                </div>
              ) : (
                /* ⚪ زرار Sign In */
                <Link to="/login" className="flex! items-center! gap-2! bg-[#00291b]! text-white! px-4! py-2! rounded-full! font-bold! text-sm! border-0! cursor-pointer! whitespace-nowrap! no-underline!">
                  <button className="bg-transparent! border-0! text-white! p-0! cursor-pointer! flex! items-center! gap-2!">
                    <i className="fa-regular fa-user text-base!"></i> Sign In
                  </button>
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;