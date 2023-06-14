import React from "react";
import {
  EmptyContainer,
  LeftContainer,
  ProfilePageContainer,
  RightContainer,
} from "./ProfilePage.styled";
import ReviewsCard from "../../components/ReviewsCard/ReviewsCard";
import {
  ImageProps,
  ReviewProps,
} from "../../components/ReviewsCard/ReviewsCard";
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";

interface ProfilePageProps {
  username: string;
  description: string;
  profilePic: ImageProps;
  reviews: ReviewProps[];
}

const ProfilePage: React.FC<ProfilePageProps> = (userInfo) => {
  return (
    <ProfilePageContainer>
      <LeftContainer>
        <UserInfoCard
          username={userInfo.username}
          description={userInfo.description}
          profilePic={userInfo.profilePic}
        />
      </LeftContainer>
      <RightContainer>
        <ReviewsCard reviewList={userInfo.reviews} showOverLay />
      </RightContainer>
      <EmptyContainer></EmptyContainer>
    </ProfilePageContainer>
  );
};

export default ProfilePage;
