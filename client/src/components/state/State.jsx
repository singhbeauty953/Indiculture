import React, { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { fabricImage } from '../../Constant/data';
import { styled, Box } from '@mui/material';
import 'react-multi-carousel/lib/styles.css';
import StateList from './StateList';
import { getStates } from '../../redux/actions/stateActions';
import { useDispatch, useSelector } from 'react-redux';

const CarouselWrapper = styled('div')({
  width: '100%',
  overflow: 'hidden',
  paddingBottom: '40px', // bottom spacing
});

const ImageContainer = styled('div')({
  padding: '10px',
  boxSizing: 'border-box',
});

const ImageBox = styled('img')({
  width: '100%',
  height: '400px',
  objectFit: 'cover',
  borderRadius: '6px',
  display: 'block',
});

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
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

const State = () => {
  const { states } = useSelector((state) => state.getStates);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStates());
  }, [dispatch]);

  return (
    <Box sx={{ px: 4, width: '100%', mx: 0 }}>
      <CarouselWrapper>
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          arrows={false}
          swipeable={true}
          draggable={true}
          showDots={false}
          keyBoardControl={true}
          containerClass="carousel-container"
          itemClass="carousel-item"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {fabricImage.map((data, index) => (
            <ImageContainer key={index}>
              <ImageBox src={data.url} alt={`Fabric ${index + 1}`} />
            </ImageContainer>
          ))}
        </Carousel>
      </CarouselWrapper>
      <StateList />
    </Box>
  );
};

export default State;
