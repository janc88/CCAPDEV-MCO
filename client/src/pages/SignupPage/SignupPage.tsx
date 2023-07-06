import React, { useContext, useState } from "react";
import { CenterContainer, PageContainer } from "../styles/LoginPage.styled";
import { SignupCard, SignupDetailsCard } from "./SignupCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";

import "./styles/swiper.css";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const { signup } = useContext(UserContext);
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
		  profilePicture: formData.profilepicture,
		  accountDesc: formData.accountdesc,
		};
	
		const userData = {
		  username: formData.username,
		  description: formData.accountdesc,
		  avatar: "hello world!",
		  password: formData.password,
		};
		
		const response = await fetch("http://localhost:8080/api/users/", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(userData),
		});
	
		if (!response.ok) {
		  throw new Error("Error creating user");
		}
		
		await response.json();
		signup(user, formData.password);
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
