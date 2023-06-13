import React, { useState, useEffect } from "react";
import {
  LogOutButton,
  ProfilePic,
  ProfilePicContainer,
  SettingIcon,
  UserDescription,
  UserInfoCardContainer,
  UserName,
} from "./styles/UserInfoCard.styled";
import { ImageProps } from "../../components/ReviewsCard/ReviewsCard";

interface UserInfoCardProps {
  username: string;
  description: string;
  profilePic: ImageProps;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({
  username,
  description,
  profilePic,
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
        <SettingIcon />
      </ProfilePicContainer>

      <UserName>{username}</UserName>
      <UserDescription>{description}</UserDescription>
      <LogOutButton bgcolor="white" tcolor="black">
        Log Out
      </LogOutButton>
    </UserInfoCardContainer>
  );
};

export default UserInfoCard;
