import React, { useContext,useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
const BestSellers = () => {
    const {products} = useContext(ShopContext);
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((product) => product.bestseller);
        setBestSellers(bestProduct.slice(0,5))
    }, [])
  return (
    <div className='my-10'>
      <div className="text-center text-3xl py-8">
        <Title text1={'BEST'} text2={'SELLERS'}></Title>
        <p className='w-3/4 m-auto text-xs m:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque recusandae aliquid, eaque eligendi adipisci corrupti.</p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            bestSellers.map((item,index) => (
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}></ProductItem>
            )
            )
        }
      </div>
    </div>
  )
}

export default BestSellers;
