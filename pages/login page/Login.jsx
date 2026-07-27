import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-down';
import heroBg from '../../src/assets/images/hero_bg-iD2fuyEl.jpeg'; 

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // 🟢 التأكد من حماية الـ Token ومنع تخزين undefined
      const tokenToSave = data.token || (data.user && data.user.id);

      if (!tokenToSave) {
        throw new Error('Authentication token is missing from server response.');
      }

      localStorage.setItem('token', tokenToSave);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      window.dispatchEvent(new Event("storage"));
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-full overflow-hidden bg-white">
      
      {/* الجزء الشمال: الصورة والترحيب */}
      <div className="relative hidden lg:flex flex-col justify-center px-12 h-full text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-[#1b3022]/85" />
        
        <div className="relative z-10 text-center!">
          <h1 className="text-4xl font-semibold text-white mb-4">
            Welcome back to Instacart
          </h1>
          <p className="text-white/60 font-serif text-xl max-w-sm mx-auto">
            Fresh groceries and organic produce, delivered to your doorstep.
          </p>
        </div>
      </div>

      {/* الجزء اليمين: الفورم */}
      <div className="flex flex-col justify-center px-6 sm:px-16 lg:px-24 xl:px-32 h-full bg-white">
        <div className="w-full max-w-md mx-auto">
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <Link to='/' className='text-2xl font-semibold no-underline!'>
              <i className="fa-solid fa-person-biking text-[#108910] mr-1"></i>
              <span className='text-[#1b3022]!'>Instacart</span>
            </Link>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 mb-1">
            Sign in to your account
          </h2>
          <p className="text-sm text-center text-slate-500 mb-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-orange-500! font-semibold hover:text-orange-600! transition-all! no-underline!">
              Create one
            </Link>
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <i className="fa-regular fa-envelope text-base"></i>
                </span>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <i className="fa-solid fa-lock text-base"></i>
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-950! hover:bg-green-900! text-white font-semibold py-2.5 px-4 rounded-xl! transition-all! duration-300! text-sm shadow-sm! disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

        </div>
      </div>

    </div>
  );
}

export default LogIn;