import React from "react";
import {
  EmptyContainer,
  LeftContainer,
  ProfilePageContainer,
  RightContainer,
} from "./ProfilePage.styled";
import ReviewsCard from "../../components/ReviewsCard/ReviewsCard";
import {
  ReviewProps,
} from "../../components/ReviewsCard/ReviewsCard";
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";
import ProfileReviewsCard from "../../components/ReviewsCard/ProfileReviewsCard";

interface ProfilePageProps {
  reviews: ReviewProps[];
}

const ProfilePage: React.FC<ProfilePageProps> = (userInfo) => {
  
  return (
    <ProfilePageContainer>
      <LeftContainer>
        <UserInfoCard/>
      </LeftContainer>
      <RightContainer>
        <ProfileReviewsCard reviewList={userInfo.reviews} showOverLay />
      </RightContainer>
      <EmptyContainer></EmptyContainer>
    </ProfilePageContainer>
  );
};

export default ProfilePage;
