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
import ShortText from "./ShortText";
import { UserContext } from "../../contexts/UserContext";


interface UserInfoCardProps {
  isEditProfile?: boolean;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({
  isEditProfile,
}) => {
  const { user } = useContext(UserContext); //TODO: handle case when user is null

  return (
    <UserInfoCardContainer>
      <ProfilePicContainer>
        <ProfilePic src={user?.profilePicture || ''}/>
        {!isEditProfile && (
          <SettingsLink to='/edit-profile'>
            <SettingIcon />
          </SettingsLink>
        )}
      </ProfilePicContainer>
      <UserName>{user?.userName}</UserName>
      {/*<UserDescription>{description}</UserDescription>*/}
	  <ShortText maxLines={3} text={user?.accountDesc || ''}/>
      {!isEditProfile && (
        <LogOutButton bgcolor="white" tcolor="black">
          Log Out
        </LogOutButton>
      )}
    </UserInfoCardContainer>
  );
};

export default UserInfoCard;
