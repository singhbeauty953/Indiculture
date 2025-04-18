import { useState, useContext } from 'react';
import { Box, Button, styled, Badge, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginDialog from '../login/LoginDialog';
import { DataContext } from '../../context/Dataprovider';
import Profile from './Profile';

// Wrapper for layout
const Wrapper = styled(Box)(({ theme }) => ({
  margin: '0 3% 0 auto',
  display: 'flex',
  '& > *': {
    marginRight: '40px !important',
    textDecoration: 'none',
    color: '#FFFFFF',
    fontSize: 12,
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      color: '#2874f0',
      flexDirection: 'column',
      marginTop: 10,
      alignItems: 'flex-start',
    },
  },
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    alignItems: 'flex-start',
  },
}));

// Highlighted "State" button
const HighlightedStateButton = styled(Button)`
  background: linear-gradient(90deg, #ff9933, #ffffff 50%, #138808);
  color: #000;
  text-transform: none;
  font-weight: 600;
  padding: 6px 24px;
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }
`;

const LoginButton = styled(Button)(({ theme }) => ({
  color: 'black',
  background: '#FFFFFF',
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: 2,
  padding: '5px 40px',
  height: 32,
  boxShadow: 'none',
  [theme.breakpoints.down('sm')]: {
    background: '#2874f0',
    color: '#FFFFFF',
  },
}));

const CartLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'white',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    alignItems: 'flex-start',
    marginLeft: 0,
  },
}));
const MoreText = styled(Typography)(({ theme }) => ({
  color: '#FFFFFF',
  cursor: 'pointer',
  marginLeft: 20,
  marginTop: 8,
  fontSize: 16,
  [theme.breakpoints.down('sm')]: {
    marginTop: 10,
    marginLeft: 0,
    color: '#2874f0'
  }
}));


const StyledLink = styled(Link)({
  textDecoration: 'none',
});

const CustomButtons = () => {
  const [open, setOpen] = useState(false);
  const { account, setAccount } = useContext(DataContext);

  const cartDetails = useSelector((state) => state.cart);
  const { cartItems = [] } = cartDetails;

  const openDialog = () => setOpen(true);

  return (
    <Wrapper>
      {account ? (
        <Profile account={account} setAccount={setAccount} />
      ) : (
        <LoginButton onClick={openDialog}>Login</LoginButton>
      )}

      <StyledLink to="/State">
        <HighlightedStateButton>State</HighlightedStateButton>
      </StyledLink>

      <MoreText style={{ color: 'white', cursor: 'pointer', marginLeft: 20 }}>
        More
      </MoreText>

      <CartLink to="/cart">
        <Badge badgeContent={cartItems.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
        <Typography style={{ marginLeft: 5 }}>Cart</Typography>
      </CartLink>

      <LoginDialog open={open} setOpen={setOpen} />
    </Wrapper>
  );
};

export default CustomButtons;
