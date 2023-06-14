import React, { useState, useEffect } from "react";
import {
  LogOutButton,
  ProfilePic,
  ProfilePicContainer,
  SettingIcon,
  SettingsLink,
  UserDescription,
  UserInfoCardContainer,
  UserName,
} from "./UserInfoCard.styled";
import { ImageProps } from "../ReviewsCard/ReviewsCard";

interface UserInfoCardProps {
  username: string;
  description: string;
  profilePic: ImageProps;
  isEditProfile?: boolean;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({
  username,
  description,
  profilePic,
  isEditProfile,
}) => {
  const [loadedProfilePic, setloadedProfilePic] = useState<string[]>([]);

  const loadImages = async () => {
    const loadedImages = await Promise.all(
      [profilePic].map(async (image) => {
        const loadedImage = await import(`../../imgs/${image.src}`);
        return loadedImage.default;
      })
    );
    setloadedProfilePic(loadedImages);
  };

  useEffect(() => {
    loadImages();
  }, [profilePic]);

  return (
    <UserInfoCardContainer>
      <ProfilePicContainer>
        <ProfilePic src={loadedProfilePic[0]} alt={profilePic.alt} />
        {!isEditProfile && (
          <SettingsLink to='/edit-profile'>
            <SettingIcon />
          </SettingsLink>
        )}
      </ProfilePicContainer>
      <UserName>{username}</UserName>
      <UserDescription>{description}</UserDescription>
      {!isEditProfile && (
        <LogOutButton bgcolor="white" tcolor="black">
          Log Out
        </LogOutButton>
      )}
    </UserInfoCardContainer>
  );
};

export default UserInfoCard;
