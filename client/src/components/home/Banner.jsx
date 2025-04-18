import React from 'react';
import Carousel from "react-multi-carousel";
import { bannerData } from '../../Constant/data';
import { styled } from '@mui/material';
import "react-multi-carousel/lib/styles.css";

const Image = styled('img')(({theme})=>({
    width: '100%',
    height: '280px',
    [theme.breakpoints.down('md')]:{
        objectFit: 'cover',
        height: 180
    }

}));

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

function Banner() {
    return (
        <Carousel
            responsive={responsive}
            infinite={true}
            swipeable={true}
            draggable={false}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            containerClass="carousel-container"
            slidesToSlide={1}
            autoPlay={true}
            autoPlaySpeed={4000}
        >
            {bannerData.map((data, index) => (
                <Image key={index} src={data.url} alt={`Banner ${index + 1}`} />
            ))}
        </Carousel>
    );
}

export default Banner;
