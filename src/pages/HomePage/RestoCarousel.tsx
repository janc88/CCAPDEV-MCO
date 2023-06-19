import React, { useState } from "react";
import RestoCard from "../../components/RestoCard/RestoCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";

import "./styles/swiper-resto-carousel.css";

import { Navigation, Pagination } from "swiper";

import {
  LeftArrow,
  NavButton,
  NavigationContainer,
  RestoCarouselContainer,
  RestoCarouselHeader,
  RightArrow,
} from "./styles/RestoCarousel.styled";

import { RestoProps } from "../../components/RestoCard/RestoCard";

interface RestoCarouselProps {
  restoList: RestoProps[];
}

const RestoCarousel: React.FC<RestoCarouselProps> = ({ restoList }) => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();

  const prevHandler = () => {
    swiperRef?.slidePrev();
  };

  const nextHandler = () => {
    swiperRef?.slideNext();
  };

  return (
    <RestoCarouselContainer className='resto-carousel'>
      <RestoCarouselHeader>Featured Restaurants</RestoCarouselHeader>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        modules={[Navigation, Pagination]}
        pagination={{
          el: ".swiper-custom-pagination",
          clickable: true,
        }}
        grabCursor={true}
        className="mySwiper"
      >
        {restoList.map((resto) => (
          <SwiperSlide>
            <RestoCard {...resto} />
          </SwiperSlide>
        ))}
      </Swiper>
      <NavigationContainer>
        <NavButton onClick={prevHandler}>
          <LeftArrow />
        </NavButton>
        <div className="swiper-custom-pagination" />
        <NavButton onClick={nextHandler}>
          <RightArrow />
        </NavButton>
      </NavigationContainer>
    </RestoCarouselContainer>
  );
};

export default RestoCarousel;
