import React from "react";
import Sidebar from "../admin_pages/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import AddProduct from "../admin_pages/AddProduct";
import ViewProduct from "../admin_pages/ViewProduct";
import ModifyProduct from "../admin_pages/ModifyProduct";
import DeleteProduct from "../admin_pages/DeleteProduct";
const ProductManagment = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-[70%] mx-auto ml-[20%] my-8 text-gray-600 text-base">
        <Routes>
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/view-product" element={<ViewProduct />} />
          <Route path="/edit-product" element={<ModifyProduct />} />
          <Route path="/delete-product" element={<DeleteProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProductManagment;
