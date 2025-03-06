import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection';
import BestSellers from '../components/Bestsellers';
import OurPolicy from '../components/Ourpolicy';
import NewsletterBox from '../components/NewsletterBox';
const Home = () => {
  return (
    <div className='mx-5'>
      <Hero/>
      <LatestCollection/>
      <BestSellers/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
