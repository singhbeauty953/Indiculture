import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Button } from '@mui/material';
import productList from './productStateData'; // Assuming this is where your state-wise product data is stored

const StateProducts = () => {
  const { stateName } = useParams(); // Get the state name from the URL
  const stateProducts = productList[stateName]; // Fetch the products based on the state

  if (!stateProducts) {
    return <Typography variant="h6">No products found for this state.</Typography>;
  }

  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 600, textAlign: 'center', mb: 4 }}>
        {stateName} Products
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {stateProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Box
              sx={{
                background: '#f9f9f9',
                padding: 2,
                borderRadius: 2,
                boxShadow: 2,
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'contain',
                  mb: 2,
                  borderRadius: 2,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {product.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#888', mb: 1 }}>
                {product.description}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#d32f2f' }}>
                {product.price}
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, background: 'rgb(38, 60, 205)', color: '#fff' }}
              >
                Buy Now
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StateProducts;
