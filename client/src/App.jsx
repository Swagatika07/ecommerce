import React from 'react'
import { Routes , Route } from 'react-router-dom';
import './index.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import Navbar from './components/Navbar';
import MyProfile from './pages/MyProfile';
import Collections from './pages/Collections';
import Footer from './components/Footer';
import ProductManagement from './pages/ProductManagement';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/verify-email' element={<EmailVerify/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/collection' element={<Collections/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
        <Route path='/product-management/*' element={<ProductManagement/>}/>
      </Routes>
      {/* {window.location.pathname.startsWith("/product-management") ? null : <Footer />} */}
      <ToastContainer/>
    </div>
  )
}

export default App
