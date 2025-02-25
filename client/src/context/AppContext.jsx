import { createContext, useEffect } from "react";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
      console.log('Auth response:', data); // For checking: the problem lies in this line, it is not consuming the data from api
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      } else {
        toast.error(data.message);
      }
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

  useEffect(() => {
    getAuthState();
}, []);

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
