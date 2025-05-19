import { useState } from 'react';
import { Box, Button, styled, CircularProgress } from '@mui/material';
import React from 'react';
import { ShoppingCart, FlashOn as Flash } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartAction';
import { payUsingPaytm } from '../../service/api';
import { post } from '../../utils/paytm';

const LeftContainer = styled(Box)(({ theme }) => ({
  minWidth: '40%',
  padding: '40px 0 0 80px',
  [theme.breakpoints.down('md')]: {
    padding: '20px 40px',
  },
}));

const Image = styled('img')({
  padding: '15px 20px',
  maxHeight: '500px',
  border: '1px solid #f0f0f0',
  width: '85%',
});

const StyledButton = styled(Button)`
  width: 46%;
  border-radius: 2px;
  height: 50px;
  color: #fff;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const QuantitySelect = styled('select')({
  padding: '8px',
  marginTop: '10px',
  fontSize: '16px',
  width: '60px',
});

const ActionItems = ({ product }) => {
  const navigate = useNavigate();
  const { id, price } = product;
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const addItemToCart = () => {
    dispatch(addToCart(id, quantity));
    navigate('/cart');
  };

  const buyNow = async () => {
    try {
      setLoading(true);
      const response = await payUsingPaytm({
        amount: price * quantity, // Using the actual product price and selected quantity
        email: 'codeforinterview01@gmail.com',
      });

      if (!response || typeof response !== 'object') {
        alert('Payment initiation failed. Please try again later.');
        setLoading(false);
        return;
      }

      const information = {
        action: 'https://securegw-stage.paytm.in/order/process',
        params: response,
      };

      post(information); // Trigger redirection to Paytm
    } catch (error) {
      console.error('Buy Now error:', error);
      alert('Something went wrong during payment. Please try again.');
      setLoading(false);
    }
  };

  return (
    <LeftContainer>
      <Image src={product.url} alt="Product" />
      <Box>
        <label>Quantity:</label>
        <QuantitySelect value={quantity} onChange={handleQuantityChange}>
          {[...Array(10).keys()].map((i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </QuantitySelect>
      </Box>
      <ButtonContainer>
        <StyledButton
          onClick={addItemToCart}
          style={{ marginRight: 10, background: '#ff9f00' }}
          variant="contained"
        >
          <ShoppingCart style={{ marginRight: 8 }} /> Add to Cart
        </StyledButton>
        <StyledButton
          onClick={buyNow}
          style={{ background: '#fb641b' }}
          variant="contained"
        >
          {loading ? (
            <CircularProgress size={24} style={{ color: 'white' }} />
          ) : (
            <>
              <Flash /> Buy Now
            </>
          )}
        </StyledButton>
      </ButtonContainer>
    </LeftContainer>
  );
};

export default ActionItems;
