import { useState } from "react";
import { PageContainer } from "./styles/LoginPage.styled";
import { SignupCard, SignupDetailsCard } from "./SignupCard";


import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";

import './styles/swiper.css'

function SignupPage() {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [formData, setFormData] = useState({})

  const handleNextClick = (data: any) => {
	swiperRef?.slideNext()
	setFormData({...formData, ...data})
  };
  const handlePreviousClick = (data: any) => {
    swiperRef?.slidePrev()
	setFormData({...formData, ...data})
  };
  const handleSubmit = (data: any) => {
	data = {...formData, ...data}
	console.log(data)
	//do stuff
  }

  return (
    <PageContainer className='signup-page'>
	  <Swiper
	  	onSwiper={setSwiperRef}
		grabCursor={true}
		allowTouchMove={false}>
		  <SwiperSlide>
			<SignupCard onSubmit={handleNextClick} values={formData}/>
		  </SwiperSlide>
		  <SwiperSlide>
			<SignupDetailsCard 
				values={formData}
				onPrev={handlePreviousClick} 
				onSubmit={handleSubmit} />
		  </SwiperSlide>
	  </Swiper>
    </PageContainer>
  );
}

export default SignupPage;
