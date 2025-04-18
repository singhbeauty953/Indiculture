import { useEffect } from 'react'

import React from 'react'
import Navbar from './Navbar'
import Slider from './Slider'
import MidSlide from './MidSlide'
import MidSection from './MidSection'
import Banner from './Banner'
import { Box ,styled} from '@mui/material'
import { getProducts } from '../../redux/actions/productActions'
import { useDispatch, useSelector } from 'react-redux'


const Component = styled(Box)({
    padding: '10px',
    background: '#F2F2F2',
    height: '100%',         
  });


function Home() {
  const {products} = useSelector(state => state.getProducts);
  console.log(products);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch (getProducts())

  },[dispatch])
  return (
    <>
    <Navbar/>
    <Component>
    <Banner />
    <MidSlide products={products} title= "Deal of the Day" timer={true}/>
    <MidSection/>
    <Slider products={products} title= "Discounts for You" timer={false}/>
    <Slider products={products} title= "Suggested Items" timer={false}/>
    <Slider products={products} title= "Top Selection" timer={false}/>
    <Slider products={products} title= "Recommended Items" timer={false}/>
    <Slider products={products} title= "Trending Offers" timer={false}/>
    <Slider products={products} title= "Season's Top Picks"timer={false}/>
    <Slider products={products} title= "Top deal on Accessories"timer={false}/>
    </Component>
    
    </>

  )
}

export default Home
