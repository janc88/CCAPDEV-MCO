import React, { useContext } from "react";
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
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";


interface UserInfoCardProps {
  isEditProfile?: boolean;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({
  isEditProfile,
}) => {
  const { user, logout } = useContext(UserContext); //TODO: handle case when user is null
  const navigate = useNavigate();
  const handleLogout = () => {
	logout();
	navigate('/home')
  }

  return (
    <UserInfoCardContainer>
      <ProfilePicContainer>
        {isEditProfile ? (
		  <ImageInput
		  	id="avatar"
			px={288}
			defaultSrc={user?.profilePicture || ''}/>
		) : (<>
		  <ProfilePic src={user?.profilePicture || ''}/>
          <SettingsLink to='/edit-profile'>
            <SettingIcon />
          </SettingsLink>
        </>)}
      </ProfilePicContainer>
      <UserName>{user?.userName}</UserName>
	  <ShortText maxLines={3} text={user?.accountDesc || ''}/>
      {!isEditProfile && (
        <LogOutButton bgcolor="white" tcolor="black" onClick={handleLogout}>
          Log Out
        </LogOutButton>
      )}
    </UserInfoCardContainer>
  );
};

export default UserInfoCard;
