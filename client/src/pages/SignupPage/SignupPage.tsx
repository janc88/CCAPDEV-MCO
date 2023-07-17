import React, { useState } from "react";
import { CenterContainer, PageContainer } from "../styles/LoginPage.styled";
import { SignupCard, SignupDetailsCard } from "./SignupCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";

import "./styles/swiper.css";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const { signup } = useUserContext();
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleNextClick = (data: any) => {
    swiperRef?.slideNext();
    setFormData({ ...formData, ...data });
  };
  const handlePreviousClick = (data: any) => {
    swiperRef?.slidePrev();
    setFormData({ ...formData, ...data });
  };

  const handleSubmit = async (formData: any) => {
    try {
      const user = {
        userName: formData.username,
        profilePicture: null,
        accountDesc: formData.accountdesc,
      };
      signup(user, formData.password, formData.profilepicture);
      navigate("/home");
	  } catch (error) {
		  console.error("Error creating user:", error);
	  }
  };

  return (
    <PageContainer className="signup-page">
      <Swiper onSwiper={setSwiperRef} grabCursor={true} allowTouchMove={false}>
        <SwiperSlide>
          <CenterContainer>
            <SignupCard onSubmit={handleNextClick} values={formData} />
          </CenterContainer>
        </SwiperSlide>
        <SwiperSlide>
          <CenterContainer>
            <SignupDetailsCard
              values={formData}
              onPrev={handlePreviousClick}
              onSubmit={handleSubmit}
            />
          </CenterContainer>
        </SwiperSlide>
      </Swiper>
    </PageContainer>
  );
}

export default SignupPage;
