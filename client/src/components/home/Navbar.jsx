import { styled, Typography, Box } from '@mui/material';
import React from 'react';
import { navData } from '../../Constant/data';

const Component = styled(Box)(({theme})=>({
  display: 'flex',
  margin: '55px 120px 0 130px',
  justifyContent: 'space-between',
  overflow: 'hidden',
  [theme.breakpoints.down('lg')]:{
    margin: 0
}
}));

const Container = styled(Box)({
  padding: '12px 8px',
  textAlign: 'center',
});

const Text = styled(Typography)`
  font-size: 14px;
  font-weight: bold;
  font-family: inherit;  /* Fixed the typo from "font-familt" to "font-family" */
`;

function Navbar() {
  return (
    <Component>
      {navData.map((data, index) => (
        <Container key={index}>  {/* Add the unique "key" prop */}
          <img src={data.url} alt="nav" style={{ width: 64 }} />
          <Text>{data.text}</Text>
        </Container>
      ))}
    </Component>
  );
}

export default Navbar;
