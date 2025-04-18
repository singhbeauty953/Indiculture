import React from 'react';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        overflowX: 'hidden',
        background: '#121212',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(
            135deg,
            rgba(255, 153, 51, 0.25),
            rgba(255, 255, 255, 0.1),
            rgba(19, 136, 8, 0.25)
          )`,
          zIndex: 0,
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
