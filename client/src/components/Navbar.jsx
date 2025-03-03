import React, { useContext, useState } from "react";
import "../index.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContent);
  console.log(userData);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        navigate("/verify-email");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedIn(false);
      data.success && setUserData(null);
      navigate("/");
    } catch (error) {
      toast(error.message);
    }
  };
  return (
    <div className="flex items-center justify-between p-5 font-medium">
      <Link to='/'><img src={assets.logo} className="w-36" alt="logo" /></Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          alt="search"
          className="w-5 cursor-pointer"
        />

      {userData ? (<div className="group relative">
          <img
            src={assets.profile_icon}
            alt="person"
            className="w-5 cursor-pointer"
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p onClick={()=>navigate('/my-profile')} className="cursor-pointer hover:text-black">My profile</p>
              {userData.isAccountVerified ? null : (
              <p onClick={sendVerificationOtp} className="cursor-pointer hover:text-black">Verify Email</p>)}
              <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>) : (
           <button
           onClick={() => navigate("/login")}
           className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
         >
           Login <img src={assets.arrow_icon} />
         </button>
      )}

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            10
          </p>
        </Link>

        <img onClick={()=>setVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden"/>
      </div>

      {/** Mobile Menu */}
      <div className={`absolute top-0 right-0 botton-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
          <div className="flex flex-col text-gray-600">
            <div onClick={()=>setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
              <img className="h-4 rotate-180" src={assets.dropdown_icon}/>
              <p>Back</p>
            </div>
            <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border" to='/'>Home</NavLink>
            <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border" to='/collection'>Collection</NavLink>
            <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border" to='/about'>About</NavLink>
            <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border" to='/contact'>Contact</NavLink>
          </div>
      </div>
    </div>
  );
  // return (
  //   <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 bg-[#f9ede0]">
  //     <img src={assets.ecomm_logo} alt="logo" className="w-28 sm:2-32" />
  //     <div className="flex gap-4">
  //     <Link to="/">Home</Link>
  //       <Link to="/about">About</Link>
  //       <Link to="/contact">Contact</Link>
  //     </div>
  //     {userData ? (
  //       <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
  //         {userData.name[0].toUpperCase()}
  //         <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
  //           <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
  //             {!userData.isAccountVerified && (
  //               <li onClick={sendVerificationOtp} className="py-1 px-2 hover:bg-gray-200 cursor-pointer">
  //                 Verify Email
  //               </li>
  //             )}
  //             <li
  //               onClick={logout}
  //               className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
  //             >
  //               Logout
  //             </li>
  //           </ul>
  //         </div>
  //       </div>
  //     ) : (
        // <button
        //   onClick={() => navigate("/login")}
        //   className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
        // >
        //   Login <img src={assets.arrow_icon} />
        // </button>
  //     )}
  //   </div>
  // );
};

export default Navbar;
