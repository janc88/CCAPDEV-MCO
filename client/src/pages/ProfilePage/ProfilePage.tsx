import React, { useEffect, useState } from "react";
import {
  EmptyContainer,
  LeftContainer,
  ProfilePageContainer,
  RightContainer,
} from "./ProfilePage.styled";
import ReviewsCard from "../../components/ReviewsCard/ReviewsCard";
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";
import ProfileReviewsCard from "../../components/ReviewsCard/ProfileReviewsCard";
import { useParams } from "react-router-dom";
import { User, useUserContext } from "../../contexts/UserContext";
import { Review } from "../../contexts/ReviewHook";

interface ProfilePageProps {
  reviews: Review[];
}

const ProfilePage: React.FC<ProfilePageProps> = (userInfo) => {
  const { userId } = useParams();

  const { user: loggedInUser, fetchUserDetails } = useUserContext();

  const [ isMyProfile, setIsMyProfile ] = useState(false);
  const [ user, setUser ] = useState<User | null>(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
	if (!userId) {
	  setUser(loggedInUser)
	  setIsMyProfile(true)
	  setLoading(false)
	} else {
	  fetchUserDetails(userId).then((user) => {
		setUser(user);
		setLoading(false);
	  });
	}
  }, [fetchUserDetails, loggedInUser, userId])

  if (loading) return (
  	<ProfilePageContainer>Loading...</ProfilePageContainer>
  );
  
  
  return (
    <ProfilePageContainer>
      <LeftContainer>
        <UserInfoCard
			user={user}
			isMyProfile={isMyProfile}/>
      </LeftContainer>
      <RightContainer>
        <ProfileReviewsCard reviewList={userInfo.reviews} showOverLay />
      </RightContainer>
      <EmptyContainer></EmptyContainer>
    </ProfilePageContainer>
  );
};

export default ProfilePage;
