import React, { useEffect, useState } from "react";
import {
  EmptyContainer,
  LeftContainer,
  ProfilePageContainer,
  RightContainer,
} from "./ProfilePage.styled";
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";
import ProfileReviewsCard from "../../components/ReviewsCard/ProfileReviewsCard";
import { useNavigate, useParams } from "react-router-dom";
import { User, useUserContext } from "../../contexts/UserContext";
import { CenterContainer, PageContainer, Card, Title, Divider, Send } from "../styles/LoginPage.styled";

const NotFound: React.FC<{ id: string }> = ({ id }) => {
	const navigate = useNavigate();
	return (
		<PageContainer>
			<CenterContainer>
				<Card>
					<Title>User {id} not found</Title>
					<Divider />
					<Send onClick={() => navigate('/home')}>
						Return to home
					</Send>
				</Card>
			</CenterContainer>
		</PageContainer>
	);
};


const ProfilePage: React.FC = () => {
  const { userId } = useParams();

  const { user: loggedInUser, fetchUserDetails } = useUserContext();

  const [ isMyProfile, setIsMyProfile ] = useState(false);
  const [ user, setUser ] = useState<User | null>(null);
  const [ loading, setLoading ] = useState(true);

	useEffect(() => {
		const doStuff = async () => {
			if (!userId) {
				setUser(loggedInUser);
				setIsMyProfile(true)
				setLoading(false)
			} else {
				const user = await fetchUserDetails(userId);
				setUser(user);
				setIsMyProfile(false);
				setLoading(false);
			}
		}
		doStuff();
	}, [fetchUserDetails, loggedInUser, userId])

  if (loading) return (
  	<ProfilePageContainer>Loading...</ProfilePageContainer>
  );
  if (!user) return (<NotFound id={userId || ''} />)

  
  return (
    <ProfilePageContainer>
      <LeftContainer>
        <UserInfoCard
			user={user}
			isMyProfile={isMyProfile}/>
      </LeftContainer>
      <RightContainer>
        <ProfileReviewsCard showOverLay userID={user.id} />
      </RightContainer>
      <EmptyContainer></EmptyContainer>
    </ProfilePageContainer>
  );
};

export default ProfilePage;
