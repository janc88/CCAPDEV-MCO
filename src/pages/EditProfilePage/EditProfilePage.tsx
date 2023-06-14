import React from "react";
import {
  AvatarContainer,
  AvatarText,
  ButtonContainer,
  CancelButton,
  CenterContainer,
  DescriptionContainer,
  DescriptionLabel,
  EditIcon,
  EditProfileCard,
  EditProfileContainer,
  InputField,
  LowerContainer,
  QuestionIcon,
  SaveButton,
  UploadImageButton,
  UploadImageContainer,
  UserCardContainer,
} from "./EditProfilePage.styled";
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";
import { Header } from "../../components/ReviewsCard/ReviewsCard.styled";

function EditProfilePage() {
  const userInfo = {
    username: "username here",
    description:
      "my name is username my name is username my name is username my name is username my name is username",
    profilePic: { id: 1, src: "food-bg-dark.jpeg", alt: "Image 1" },
  };

  return (
    <EditProfileContainer>
      <CenterContainer>
        <UserCardContainer>
          <UserInfoCard {...userInfo} isEditProfile />
        </UserCardContainer>
        <EditProfileCard>
          <Header>Edit Profile</Header>
          <DescriptionContainer>
            <DescriptionLabel>Description (110 characters)</DescriptionLabel>
            <EditIcon />
          </DescriptionContainer>
          <InputField />
          <LowerContainer>
            <UploadImageContainer>
              <AvatarContainer>
                <AvatarText>Avatar</AvatarText>
                <QuestionIcon />
              </AvatarContainer>
              <UploadImageButton>Upload Image</UploadImageButton>
            </UploadImageContainer>
            <ButtonContainer>
              <CancelButton>Cancel</CancelButton>
              <SaveButton>Save</SaveButton>
            </ButtonContainer>
          </LowerContainer>
        </EditProfileCard>
      </CenterContainer>
    </EditProfileContainer>
  );
}

export default EditProfilePage;
