import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 border-gray-300 fixed'>
      <div className='flex flex-col gap-4 pt-6 pl-[5%] text-[15px]'>
       <NavLink to='/product-management/add-product' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
        <img src={assets.add_icon} alt="add" className='w-5 h-5'/>
        <p className='hidden md:block'>Add Items</p>
       </NavLink>

       <NavLink to='/product-management/view-product' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
        <img src={assets.order_icon} alt="add" className='w-5 h-5'/>
        <p className='hidden md:block'>List Items</p>
       </NavLink>

       <NavLink to='/product-management/edit-product' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
        <img src={assets.edit_btn} alt="add" className='w-5 h-5'/>
        <p className='hidden md:block'>Modify Items</p>
       </NavLink>

       <NavLink to='/product-management/delete-product' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
        <img src={assets.delete_btn} alt="add" className='w-5 h-5'/>
        <p className='hidden md:block'>Remove Items</p>
       </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
