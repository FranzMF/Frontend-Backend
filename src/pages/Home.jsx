import React from 'react'
import Header from '../components/Header/Header.jsx'
import SliderPag from '../components/Slider/Slider.jsx'
import Banner from '../components/Banner/Banner.jsx'
import Product from '../components/Product/Product.jsx'
import Cart from '../components/cart/Cart.jsx'
import Categories from '../components/Categories/Categories.jsx'

const Home = () => {
  return (
    <div className=''>

      {/* <Header /> */}
      <SliderPag/>
      <Categories/>
      {/* <Banner/> */}
      <Product/>
    </div>

  )
}

export default Home
