import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// Define responsive breakpoints for the carousel
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const StateList = () => {
  const navigate = useNavigate();
  const { states } = useSelector((state) => state.getStates);

  return (
    <Box
      sx={{
        px: 2,
        py: 6,
        backgroundColor: '#121212',
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
            rgba(208, 118, 28, 0.25),
            rgba(205, 41, 41, 0.1),
            rgba(45, 211, 30, 0.25)
          )`,
          zIndex: 0,
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          arrows={true}
          keyBoardControl={true}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
        >
          {states.map((state, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: '#1e1e1e',
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '430px',
                mx: 1,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 6px 18px rgba(255, 255, 255, 0.15)',
                },
              }}
            >
              {/* Image */}
              <Box
                component="img"
                src={state.image}
                alt={state.name}
                sx={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: 2,
                  mb: 2,
                }}
              />

              {/* Title */}
              <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                {state.name}
              </Typography>

              {/* Description */}
              <Typography
                variant="body2"
                sx={{
                  color: '#ccc',
                  flexGrow: 1,
                  mb: 2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {state.description}
              </Typography>

              {/* Button */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#263ccd',
                  color: '#fff',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  width: 'fit-content',
                  alignSelf: 'flex-start',
                }}
                onClick={() => navigate(`/StateNav/${state.name.toLowerCase()}`)}
              >
                Buy Now
              </Button>
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default StateList;
