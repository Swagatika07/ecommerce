import { createContext, useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import Cookies from "js-cookie";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data", {withCredentials: true});
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAuthState = async () => {
    axios.defaults.withCredentials = true;
  
    try {
      const { data } = await axios.get(
        backendUrl + '/api/auth/is-authenticated', { withCredentials: true }
      );
      // console.log('Auth response:', data); // When I have made the isAccountVerified false it still shows that account is authenticated, this is not getting updated properly
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      } else {
        toast.error(data.message);
      }
      // console.log('Auth response:', data); 
    } catch (error) {
      console.error('Auth error:', error); // Add this line for debugging
      toast.error(error.message);
    }
  };
  

  // const getAuthState = async () => {
  //   axios.defaults.withCredentials = true;

  //   try {
  //     const { data } = await axios.get(
  //       backendUrl + '/api/auth/is-authenticated', {withCredentials: true}
  //     );
  //     if (data.success) {
  //       setIsLoggedIn(true);
  //       getUserData();
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  // useEffect(() => {
  //   // Check for token in cookies when the component mounts
  //   const token = Cookies.get('token');
  //   console.log("Token after login:", token);
  //   if (token) {
  //     setIsLoggedIn(true);
  //     getAuthState();
  //   }
  // }, []);

  useEffect(() => {
    // const token = Cookies.get('token');
    // console.log("Token after login:", token);
    //After a lot of inspection, I found the solution to the problem. The problem was that the getAuthState function was not being called when the user is logged in. So, I added a condition to check if the user is logged in and then call the getAuthState function. This fixed the problem.
    // if(isLoggedIn) {
      // if(token){
        getAuthState();
      // }
      
    // }
    
}, [isLoggedIn]);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    getAuthState,
  };
  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
