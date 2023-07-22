import React, { useEffect, useState } from "react";
import {
  EmptyContainer,
  LeftContainer,
  ProfilePageContainer,
  RightContainer,
} from "./ProfilePage.styled";
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";
import ProfileReviewsCard from "../../components/ReviewsCard/ProfileReviewsCard";
import { useParams } from "react-router-dom";
import { User, useUserContext } from "../../contexts/UserContext";
import { useReviews, Review } from "../../contexts/ReviewHook";


const ProfilePage: React.FC = () => {
  const { userId } = useParams();

  const { user: loggedInUser, fetchUserDetails } = useUserContext();

  const [ isMyProfile, setIsMyProfile ] = useState(false);
  const [ user, setUser ] = useState<User | null>(null);
  const [ reviews, setReviews ] = useState<Review[] | null>(null);
  const [ loading, setLoading ] = useState(true);

  const { fetchReviews } = useReviews();

	useEffect(() => {
		const doStuff = async () => {
			if (!userId) {
				const reviews = await fetchReviews({ userId: loggedInUser?.id });

				setReviews(reviews);
				setUser(loggedInUser);
				setIsMyProfile(true)
				setLoading(false)
			} else {
				const reviews = await fetchReviews({ userId });
				const user = await fetchUserDetails(userId);
				setReviews(reviews);
				setUser(user);
				setIsMyProfile(false);
				setLoading(false);
			}
		}
		doStuff();
	}, [fetchReviews, fetchUserDetails, loggedInUser, userId])

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
        <ProfileReviewsCard reviewList={reviews ?? []} showOverLay />
      </RightContainer>
      <EmptyContainer></EmptyContainer>
    </ProfilePageContainer>
  );
};

export default ProfilePage;
