import React from 'react'
import { Box, styled } from '@mui/material'
import Slider from './Slider';

const Components = styled(Box)`
display: flex;

`
const LeftComponents =styled(Box)(({theme})=>({
width: '83%',
[theme.breakpoints.down('md')]:{
    width: '100%'
}

}));


const RightComponents = styled(Box)(({theme})=>({
background: '#FFFFFF',
padding: 5,
marginTop: 10,
marginLeft: 10,
width: 17,
textAlign: 'center',
[theme.breakpoints.down('md')]:{
    display: 'none'
}
}));


function MidSlide({products,title, timer}) {
    const adURL = 'https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70';
  return (
    <Components>
      
            <LeftComponents>
                <Slider 
                products={products} 
                title= {title} 
                timer={timer}/>
            </LeftComponents>
            <RightComponents>
                <img src={adURL} alt="ad" style={{width: 217}} />
            </RightComponents>
       
    </Components>
  )
}

export default MidSlide