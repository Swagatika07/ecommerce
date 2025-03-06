import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
const Collections = () => {
  const {products} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const toggleCategory = (e) => {
    if(selectedCategory.includes(e.target.value)){
      setSelectedCategory(prev => prev.filter((item) => item !== e.target.value));
    } else {
      setSelectedCategory(prev => [...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if(selectedSubCategory.includes(e.target.value)){
      setSelectedSubCategory(prev => prev.filter((item) => item !== e.target.value));
    } else {
      setSelectedSubCategory(prev => [...prev, e.target.value]);
    }
  }

 const applyFilter = () => {
  let productsCopy = [...products];
  if(selectedCategory.length > 0){
    productsCopy = productsCopy.filter((product) => selectedCategory.includes(product.category));
  }
  if(selectedSubCategory.length > 0){
    productsCopy = productsCopy.filter((product) => selectedSubCategory.includes(product.subCategory));
  }
  setFilteredProducts(productsCopy);
 }

 const sortProducts = () => {
  let fpCopy = [...filteredProducts];
  switch(sortType){
    case 'low-high':
      setFilteredProducts(fpCopy.sort((a,b) => a.price - b.price));
      break;

    case 'high-low':
      setFilteredProducts(fpCopy.sort((a, b) => b.price - a.price));
      break;
    
    default:
      applyFilter();
      break;
  }
 }

  // useEffect(() => {
  //   setFilteredProducts(products);
  // }, [])

  useEffect(()=>{
  applyFilter();
  },[selectedCategory,selectedSubCategory])

  useEffect(()=>{
    sortProducts();
  },[sortType])
  // useEffect(()=>{
  //   console.log(selectedSubCategory);
  // },[selectedSubCategory])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t mx-5'>
      {/* Filter Options*/}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
        <img src={assets.dropdown_icon} alt='dropdown' className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}/>
        </p>
        {/* Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? 'hidden' : ''}`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory}/>Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory}/>Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Kids'} onChange={toggleCategory}/>Children
            </p>
          </div>
        </div>
        {/* Subcategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? 'hidden' : ''}`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Topwear'} onChange={toggleSubCategory}/>Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          {/* Sorted products */}
          <select onChange={(e)=> setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map products */}
       <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filteredProducts.map((item,index) => (
           <ProductItem key={index} id={item._id} {...item} />
          ))}
       </div>
      </div>
    </div>
  )
}

export default Collections
