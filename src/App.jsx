import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import CartDrawer from '../components/CartDrawer';
import Checkout from '../components/Checkout';
import LogIn from '../pages/login page/Login';
import Register from '../pages/register page/Register';
import Footer from '../components/Footer';
import AllProductsPage from '../pages/product page/products';
import Deals from '../pages/deals page/Deals';
import Delivery from '../pages/admin pages/delivery page/Delivery';
import MyOrder from '../pages/my orders/MyOrders';
import MyAddresses from '../pages/my address/MyAddresses';
import ProductDetails from '../components/ProductDetails';
import MyProducts from '../pages/admin pages/my products/MyProducts';

function App() {
  const location = useLocation();

  const hideNavbarAndFooter = location.pathname === '/login' || location.pathname.startsWith('/register');

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}

      <CartDrawer />
      
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/checkout" element={<Checkout />} /> 
        <Route path='/login' element={<LogIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/address' element={<MyAddresses />} />
        <Route path='/admin' element={<Delivery />} />
        <Route path='/product' element={<AllProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/MyProducts/:id" element={<MyProducts />} />
        <Route path='/deals' element={<Deals />} />
        <Route path='/myorder' element={<MyOrder />} />
      </Routes>

      {!hideNavbarAndFooter && <Footer />}
    </>
  );
}

export default App;