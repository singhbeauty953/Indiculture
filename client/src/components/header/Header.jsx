import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  styled,
  IconButton,
  List,
  Drawer,
  Typography,
  Tooltip,
  ListItem,
} from '@mui/material';
import SearchArea from './SearchArea';
import CustomButtons from './CustomButtons';
import { Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Styled Components
const StyledHeader = styled(AppBar)`
  background: #2e1a47;
  height: 58px;
  border-bottom: 1px solid rgba(190, 53, 178, 0.2);
  box-shadow: 0px 2px 8px rgba(255, 215, 0, 0.1);
`;

const MyComponent = styled(Link)({
  marginLeft: '5%',
  lineHeight: 0,
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
});

const Logo = styled('img')({
  height: 50,
  width: 50,
  borderRadius: '50%',
  objectFit: 'cover',
  boxShadow: '0 0 10px rgba(255, 215, 0, 0.4)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const BrandText = styled(Typography)(({ theme }) => ({
  fontFamily: `'Cinzel', serif`,
  fontWeight: 700,
  fontSize: '28px',
  marginLeft: theme.spacing(2),
  letterSpacing: '3px',
  textTransform: 'uppercase',
  background: 'linear-gradient(to right, #FF9933, #FFFFFF, #138808)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '1px 1px 5px rgba(0, 0, 0, 0.4)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    letterSpacing: '2px',
  },
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
}));

const CustomButtonWrapper = styled('span')(({ theme }) => ({
  margin: '0 5% 0 auto',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const SearchWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  marginLeft: '10%',
  [theme.breakpoints.down('sm')]: {
    marginLeft: '4%',
  },
}));

function Header() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const list = () => (
    <Box
      sx={{ width: 250, display: 'flex', flexDirection: 'column', p: 2 }}
      onClick={handleClose}
    >
      <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <ListItem disablePadding>
          <Box sx={{ width: '100%' }}>
            <CustomButtons isMobileView />
          </Box>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <StyledHeader>
      <Toolbar sx={{ minHeight: 60 }}>
        <MenuButton color="inherit" onClick={handleOpen}>
          <Menu />
        </MenuButton>

        <Drawer
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              backgroundColor: '#2e1a47',
              color: '#fff',
            },
          }}
        >
          {list()}
        </Drawer>

        <MyComponent to={'/'}>
          <Tooltip title="Home">
            <Logo src="/Image/Indiculture.png" alt="Logo" />
          </Tooltip>
          <BrandText>INDICULTURE</BrandText>
        </MyComponent>

        <SearchWrapper>
          <SearchArea />
        </SearchWrapper>

        <CustomButtonWrapper>
          <CustomButtons />
        </CustomButtonWrapper>
      </Toolbar>
    </StyledHeader>
  );
}

export default Header;
