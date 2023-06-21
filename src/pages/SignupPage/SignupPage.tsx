import { useContext, useState } from "react";
import { CenterContainer, PageContainer } from "../styles/LoginPage.styled";
import { SignupCard, SignupDetailsCard } from "./SignupCard";


import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";

import './styles/swiper.css'
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const { setUser } = useContext(UserContext);
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()

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
	const user = {
		userName: data.username,
		profilePicture: data.profilepicture,
		accountDesc: data.accountdesc,
	}
	setUser(user)
	navigate('/home');
  }

  return (
    <PageContainer className='signup-page'> 
	  <Swiper
	  	onSwiper={setSwiperRef}
		grabCursor={true}
		allowTouchMove={false}>
		  <SwiperSlide>
			<CenterContainer>
			<SignupCard onSubmit={handleNextClick} values={formData}/>
			</CenterContainer>
		  </SwiperSlide>
		  <SwiperSlide>
			<CenterContainer>
			<SignupDetailsCard 
				values={formData}
				onPrev={handlePreviousClick} 
				onSubmit={handleSubmit} />
			</CenterContainer>
		  </SwiperSlide>
	  </Swiper>
	</PageContainer>
  );
}

export default SignupPage;
