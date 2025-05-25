import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Button,
  CardMedia,
  styled,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { LocalOffer as Badge } from '@mui/icons-material';

import productList from '../../Constant/stateProducts';
import { addToCart } from '../../redux/actions/cartAction';

// Styled components
const Strike = styled(Box)`
  text-decoration: line-through;
  color: #878787;
  margin-left: 10px;
`;

const StyledBadge = styled(Badge)`
  margin-right: 10px;
  color: #00CC00;
  font-size: 15px;
`;

const SmallText = styled(Box)`
  font-size: 14px;
  color: #fff;
  vertical-align: baseline;
  & > p {
    font-size: 14px;
    margin-top: 10px;
  }
`;

const ColumnText = styled(TableRow)`
  font-size: 14px;
  color: #fff;
  vertical-align: baseline;
  & > td {
    font-size: 14px;
    margin-top: 10px;
  }
`;

const StateproductsDetails = ({ setProductId }) => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allProducts = Object.values(productList).flat();
  const product = allProducts.find((p) => p.id.toString() === productId);

  const date = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);

  if (!product) {
    return (
      <Typography sx={{ mt: 4, textAlign: 'center', color: '#fff' }}>
        Product not found.
      </Typography>
    );
  }

  const handleAddToCart = (id) => {
    setProductId(id);
    dispatch(addToCart(product));
  };

  const handleBuyNow = () => {
    localStorage.setItem('checkoutProduct', JSON.stringify(product));
    navigate('/checkout');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        p: { xs: 2, sm: 4 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          width: '100%',
          maxWidth: 1000,
          bgcolor: '#1e1e1e',
          borderRadius: 4,
          boxShadow: '0 0 10px rgba(255, 153, 51, 0.4)',
          p: 3,
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{
              width: '100%',
              maxWidth: 400,
              maxHeight: 400,
              objectFit: 'contain',
              bgcolor: '#fff',
              p: 2,
              borderRadius: 2,
            }}
          />
        </Box>

        {/* Details Section */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            sx={{ color: '#ff9933', fontWeight: 600, mb: 1 }}
          >
            {product.name}
          </Typography>

          <Typography sx={{ color: '#33cc33', fontSize: 13, mb: 2 }}>
            8 Ratings & 1 Review
          </Typography>

          <SmallText>
            <Typography>
              <StyledBadge />
              Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card
            </Typography>
            <Typography>
              <StyledBadge />
              Bank Offer 10% Off on Bank of Baroda Mastercard debit card first time transaction
            </Typography>
            <Typography>
              <StyledBadge />
              Purchase this Furniture or Appliance and Get Extra ₹500 Off on Select ACs
            </Typography>
            <Typography>
              <StyledBadge />
              Partner OfferExtra 10% off upto ₹500 on next furniture purchase
            </Typography>
          </SmallText>

          <Table>
            <TableBody>
              <ColumnText>
                <TableCell style={{ color: '#fff' }}>Delivery</TableCell>
                <TableCell style={{ fontWeight: 600, color: '#fff' }}>
                  Delivery by {date.toDateString()} | ₹40
                </TableCell>
              </ColumnText>
              <ColumnText>
                <TableCell style={{ color: '#fff' }}>Warranty</TableCell>
                <TableCell style={{ color: '#fff' }}>No Warranty</TableCell>
              </ColumnText>
              <ColumnText>
                <TableCell style={{ color: '#fff' }}>Seller</TableCell>
                <TableCell>
                  <span style={{ color: '#fff' }}>SuperComNet</span>
                  <Typography style={{ color: '#fff' }}>
                    GST invoice available
                  </Typography>
                  <Typography style={{ color: '#fff' }}>
                    View more sellers starting from ₹329
                  </Typography>
                </TableCell>
              </ColumnText>
              <ColumnText>
                <TableCell style={{ color: '#fff' }}>Description</TableCell>
                <TableCell style={{ color: '#fff' }}>
                  {product.description}
                </TableCell>
              </ColumnText>
            </TableBody>
          </Table>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography
              component="span"
              sx={{ color: '#ff9933', fontSize: 20, fontWeight: 600 }}
            >
              ₹{product.price.cost}
            </Typography>
            <Strike component="span">₹{product.price.mrp}</Strike>
            <Box component="span" sx={{ color: '#33cc33', ml: 1 }}>
              {product.price.discount} off
            </Box>
          </Box>

          <Typography variant="body2" sx={{ color: '#ccc', mb: 3 }}>
            {product.description}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => handleAddToCart(product.id)}
              sx={{
                borderRadius: 20,
                fontSize: 14,
                color: '#ff9933',
                borderColor: '#ff9933',
                '&:hover': {
                  backgroundColor: '#ff9933',
                  color: '#000',
                },
                width: { xs: '100%', sm: '50%' },
              }}
            >
              Add to Cart
            </Button>

            <Button
              variant="contained"
              onClick={handleBuyNow}
              sx={{
                borderRadius: 20,
                fontSize: 14,
                backgroundColor: '#33cc33',
                color: '#000',
                '&:hover': {
                  backgroundColor: '#28a745',
                },
                width: { xs: '100%', sm: '50%' },
              }}
            >
              Buy Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StateproductsDetails;
