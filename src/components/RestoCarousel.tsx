import React, {useState} from 'react'
import RestoCard from './RestoCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';

import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "../styles/swiper.css"

import { Navigation, Pagination } from "swiper";

import { LeftArrow, NavButton, NavigationContainer, RestoCarouselContainer, RestoCarouselHeader, RightArrow } from '../styles/RestoCarousel.styled';

function RestoCarousel() {
    const details = {name: 'Mcdonalds DLSU', rating: 3.5, numrating: 1340, desc: 'best resto in DLSU! really good food. highly recommended '}
    const [swiperRef, setSwiperRef] = useState<SwiperClass>();

    const prevHandler = () => {
        swiperRef?.slidePrev();
      };
    
      const nextHandler = () => {
        swiperRef?.slideNext();
      };

  return (
   <RestoCarouselContainer>
    <RestoCarouselHeader>Featured Restaurants</RestoCarouselHeader>
        <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={3}
            spaceBetween={30}
            loop={true}
            modules={[Navigation, Pagination]}
            pagination={{
                el: '.swiper-custom-pagination',
                clickable: true,
            }}
            grabCursor={true}
            className="mySwiper"
        >
            <SwiperSlide>
                <RestoCard {...details}/>
            </SwiperSlide>
            <SwiperSlide>
                <RestoCard {...details}/>
            </SwiperSlide>
            <SwiperSlide>
                <RestoCard {...details}/>
            </SwiperSlide>
            <SwiperSlide>
                <RestoCard {...details}/>
            </SwiperSlide>
            <SwiperSlide>
                <RestoCard {...details}/>
            </SwiperSlide>
            <SwiperSlide>
                <RestoCard {...details}/>
            </SwiperSlide>
            <SwiperSlide>
                <RestoCard {...details}/>
            </SwiperSlide>   
        </Swiper>
        <NavigationContainer>
            <NavButton onClick={prevHandler}>
                <LeftArrow/>
            </NavButton>
            <div className="swiper-custom-pagination"/>
            <NavButton onClick={nextHandler}>
                <RightArrow/>
            </NavButton>
        </NavigationContainer>
   </RestoCarouselContainer>
  )
}

export default RestoCarousel