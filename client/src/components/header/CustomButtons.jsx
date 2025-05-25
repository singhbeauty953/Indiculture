import { useState, useContext } from 'react';
import {
  Box,
  Button,
  styled,
  Badge,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import LoginDialog from '../login/LoginDialog';
import { DataContext } from '../../context/Dataprovider';
import Profile from './Profile';

// Styled Components
const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 24,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    paddingLeft: 16,
    paddingTop: 10,
  },
}));

const HighlightedStateButton = styled(Button)({
  background: 'linear-gradient(90deg, #ff9933, #ffffff 50%, #138808)',
  color: '#000',
  textTransform: 'none',
  fontWeight: 600,
  padding: '6px 24px',
  borderRadius: 8,
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    transform: 'translateY(-2px)',
  },
});

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
    color: '#2874f0',
  },
}));

const MoreText = styled(Typography)(({ theme }) => ({
  color: '#FFFFFF',
  cursor: 'pointer',
  fontSize: 16,
  [theme.breakpoints.down('sm')]: {
    color: '#2874f0',
  },
}));

const StyledLink = styled(Link)({
  textDecoration: 'none',
});

const CustomButtons = ({ cartItems = [] }) => {
  const [open, setOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const { account, setAccount } = useContext(DataContext);

  const openDialog = () => setOpen(true);
  const handleMoreClick = (event) => setMenuAnchor(event.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);

  const cartItemCount = cartItems.reduce((acc, item) => acc + (item.count || 1), 0);

  return (
    <Container>
      {account ? (
        <Profile account={account} setAccount={setAccount} />
      ) : (
        <LoginButton onClick={openDialog}>Login</LoginButton>
      )}

      <StyledLink to="/State">
        <HighlightedStateButton>State</HighlightedStateButton>
      </StyledLink>

      <MoreText onClick={handleMoreClick}>More</MoreText>
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>About Us</MenuItem>
        <MenuItem onClick={handleMenuClose}>Contact</MenuItem>
        <MenuItem onClick={handleMenuClose}>Help</MenuItem>
      </Menu>

      <CartLink to="/StateCart">
        <Badge badgeContent={cartItemCount} color="secondary">
          <ShoppingCartIcon />
        </Badge>
        <Typography sx={{ ml: 1 }}>Cart</Typography>
      </CartLink>

      <LoginDialog open={open} setOpen={setOpen} />
    </Container>
  );
};

export default CustomButtons;
