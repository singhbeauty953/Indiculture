import React from 'react'
import { Typography, Box, styled } from '@mui/material'


const Strike = styled(Box)`
  text-decoration: line-through;
  color: #878787;
  margin-left: 10px;
`;

const ProductDetail = ({product}) => {
  const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    
  return (
    <>
         <Typography variant="h5">{product.title.longTitle}</Typography>
            <Typography style={{ marginTop: 5, color: '#878787', fontSize: 14 }}>
              8 Ratings & 1 Reviews
              <Box component="span">
                <img src={fassured} alt="fassured" style={{ width: 77, marginLeft: 20 }} />
              </Box>
            </Typography>
            <Typography style={{ marginTop: 10 }}>
              <Box component="span" style={{ fontWeight: 600, fontSize: 28 }}>₹{product.price.cost}</Box>
              <Strike component="span" style={{color: '#878787'}}>₹{product.price.mrp}</Strike>
              <Box component="span" style={{ color: '#388E3C', marginLeft: 10 }}>{product.price.discount} off</Box>
            </Typography>
    </>
  )
}

export default ProductDetail