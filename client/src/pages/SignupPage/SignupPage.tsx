import { useContext, useState } from "react";
import { CenterContainer, PageContainer } from "../styles/LoginPage.styled";
import { SignupCard, SignupDetailsCard } from "./SignupCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";

import "./styles/swiper.css";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const { setUser } = useContext(UserContext);
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
  const handleSubmit = async (data: any) => {
    try {
      data = { ...formData, ...data };
      const user = {
        userName: data.username,
        profilePicture: data.profilepicture,
        accountDesc: data.accountdesc,
        password: data.password,
      };
      setUser(user);

      const newUser = {
        username: data.username,
        description: data.accountdesc,
        password: data.password,
        avatar: data.profilepicture,
      };

      console.log(data.profilepicture);

      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      console.log(response);

      if (response.ok) {
        const createdUser = await response.json();
        console.log("User created successfully:", createdUser);
      } else {
        console.error("Failed to create user");
      }
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
