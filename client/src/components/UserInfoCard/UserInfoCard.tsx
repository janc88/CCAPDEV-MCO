import React from "react";
import {
  LogOutButton,
  ProfilePic,
  ProfilePicContainer,
  SettingIcon,
  SettingsLink,
  UserInfoCardContainer,
  UserName,
} from "./UserInfoCard.styled";
import { ImageInput } from "../../components/Input/Input"
import ShortText from "./ShortText";
import { useUserContext, User } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import SimplePopup from "../SmallModal/SimplePopup";


interface UserInfoCardProps {
  isEditProfile?: boolean;
  isMyProfile?: boolean;
  user: User | null;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({
  user,
  isEditProfile,
  isMyProfile,
}) => {
  const { logout } = useUserContext();
  const navigate = useNavigate();
  const handleLogout = () => {
	logout();
	navigate('/home')
  }
  if (user === null) return (
	<UserInfoCardContainer>
		<SimplePopup 
			title="User not found"
			onConfirm={()=>navigate('/home')}
			onCancel={()=>navigate('/home')}
			content="Return to home page"/>
	</UserInfoCardContainer>
  );

  return (
    <UserInfoCardContainer>
      <ProfilePicContainer>
        {isEditProfile ? (
		  <ImageInput
		  	id="avatar"
			px={288}
			defaultSrc={user.profilePicture || ''}/>
		) : (<>
		  <ProfilePic src={user.profilePicture || ''}/>
          <SettingsLink to='/edit-profile'>
            <SettingIcon />
          </SettingsLink>
        </>)}
      </ProfilePicContainer>
      <UserName>{user?.userName}</UserName>
	  <ShortText maxLines={3} text={user?.accountDesc || ''}/>
      {!isEditProfile && isMyProfile && (
        <LogOutButton bgcolor="white" tcolor="black" onClick={handleLogout}>
          Log Out
        </LogOutButton>
      )}
    </UserInfoCardContainer>
  );
};

export default UserInfoCard;
