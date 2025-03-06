import React, { useEffect } from 'react'
import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
const LatestCollection = () => {
    const {products} = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    // console.log(products);
    useEffect(() => {
    setLatestProducts(products.slice(0, 10));
    }, []);
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
      </div>
      {/* Rendering products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestProducts.map((item,index) => (
          <ProductItem key={index} id={item._id} {...item} />
        ))}
      </div>
    </div>
  )
}

export default LatestCollection