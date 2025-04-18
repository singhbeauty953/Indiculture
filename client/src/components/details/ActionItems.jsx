import { useState } from 'react';
import { Box, Button, styled } from '@mui/material';
import React from 'react';
import { ShoppingCart, FlashOn } from '@mui/icons-material';
import ProductDetail from './ProductDetail';
import { useNavigate } from 'react-router-dom';
import { useDispatch , } from 'react-redux';
import { addToCart } from '../../redux/actions/cartAction';


const LeftContainer = styled(Box)(({ theme }) => ({
  minWidth: '40%',
  padding: '40px 0 0 80px',
  [theme.breakpoints.down('md')]: {
      padding: '20px 40px'
  }
}))

const Image = styled('img')({
  padding: '15px 20px',
  maxHeight: '500px',
  border: '1px solid #f0f0f0',
  width: '85%'
});

const StyledButton = styled(Button)`
    width: 46%;
    border-radius: 2px;
    height: 50px;
    color: #FFF;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const ActionItems = ({ product }) => {
  
  const navigate = useNavigate();
    const { id } = product;
        
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

  const addItemToCart = () => {
    dispatch(addToCart(id, quantity));
    navigate('/cart');
}
  return (
    <LeftContainer>
      <Image src={product.url} alt="Product" />
      <ButtonContainer>
      <StyledButton 
  onClick={addItemToCart} 
  style={{ marginRight: 10, background: '#ff9f00' }} 
  variant="contained"
>
  <ShoppingCart style={{ marginRight: 8 }} /> Add to Cart
</StyledButton>
        <StyledButton variant="contained" style={{ background: '#fb541b' }}>
          <FlashOn style={{ marginRight: 8 }} /> Buy Now
        </StyledButton>
      </ButtonContainer>
    </LeftContainer>
  );
};

export default ActionItems;
