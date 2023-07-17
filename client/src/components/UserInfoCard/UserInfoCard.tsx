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
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import SimplePopup from "../SmallModal/SimplePopup";


interface UserInfoCardProps {
  isEditProfile?: boolean;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({
  isEditProfile,
}) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
	logout();
	navigate('/home')
  }
  if (user === null) return (
	<UserInfoCardContainer>
		<SimplePopup 
			title="You are not logged in"
			onConfirm={()=>navigate('/login')}
			onCancel={()=>navigate('/login')}
			content="Please log in"/>
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
      {!isEditProfile && (
        <LogOutButton bgcolor="white" tcolor="black" onClick={handleLogout}>
          Log Out
        </LogOutButton>
      )}
    </UserInfoCardContainer>
  );
};

export default UserInfoCard;
