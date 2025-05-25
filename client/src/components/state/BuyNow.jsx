import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  CardMedia,
} from '@mui/material';

const BuyNow = () => {
  const navigate = useNavigate();
  const product = JSON.parse(localStorage.getItem('checkoutProduct'));
  const deliveryFee = 0;
  const protectFee = 19;

  if (!product) {
    return (
      <Box
        sx={{
          p: 4,
          color: '#fff',
          textAlign: 'center',
          backgroundColor: '#121212',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h6">No product selected for checkout.</Typography>
      </Box>
    );
  }

  const total = Number(product.price.cost) + deliveryFee + protectFee;

  const handlePlaceOrder = () => {
    alert('🎉 Order placed using Cash on Delivery!');
    localStorage.removeItem('checkoutProduct');
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 6,
      }}
    >
      <Box
        sx={{
          backgroundColor: '#1e1e1e',
          color: '#fff',
          borderRadius: 4,
          padding: 4,
          width: '100%',
          maxWidth: 600,
          boxShadow: '0 0 20px rgba(255, 153, 51, 0.3)',
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3, color: '#ff9933', textAlign: 'center' }}
        >
          Cash on Delivery
        </Typography>

        {/* Product Details */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            backgroundColor: '#2a2a2a',
            color: '#fff',
            borderRadius: 3,
          }}
          elevation={2}
        >
          <Typography variant="h6" gutterBottom>
            Product Details
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
            }}
          >
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              sx={{
                width: 120,
                height: 120,
                objectFit: 'contain',
                backgroundColor: '#fff',
                borderRadius: 2,
              }}
            />
            <Box>
              <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                {product.name}
              </Typography>
              <Typography sx={{ mt: 1 }}>Price: ₹{product.price.cost}</Typography>
              <Typography sx={{ mt: 1, fontSize: 14 }}>
                {product.description}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Payment Summary */}
        <Paper
          sx={{
            p: 3,
            backgroundColor: '#2a2a2a',
            color: '#fff',
            borderRadius: 3,
          }}
          elevation={2}
        >
          <Typography variant="h6" gutterBottom>
            Payment Summary
          </Typography>
          <Typography>Product Price: ₹{product.price.cost}</Typography>
          <Typography>Delivery Fee: ₹{deliveryFee} (Free)</Typography>
          <Typography>Protection Fee: ₹{protectFee}</Typography>
          <Divider sx={{ my: 1, backgroundColor: '#555' }} />
          <Typography variant="h6" sx={{ color: '#33cc33' }}>
            Total Payable: ₹{total}
          </Typography>
        </Paper>

        <Button
          variant="contained"
          color="success"
          sx={{
            mt: 4,
            width: '100%',
            py: 1.5,
            fontWeight: 600,
            borderRadius: 3,
            fontSize: 16,
          }}
          onClick={handlePlaceOrder}
        >
          Place Order (Cash on Delivery)
        </Button>
      </Box>
    </Box>
  );
};

export default BuyNow;
