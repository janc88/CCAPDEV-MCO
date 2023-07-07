import React from "react";
import {
  AvatarContainer,
  AvatarText,
  ButtonContainer,
  CancelButton,
  CenterContainer,
  DescriptionContainer,
  DescriptionLabel,
  EditProfileCard,
  EditProfileContainer,
  LowerContainer,
  QuestionIcon,
  SaveButton,
  UploadImageButton,
  UploadImageContainer,
  UserCardContainer,
} from "./EditProfilePage.styled";
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";
import { Header } from "../../components/ReviewsCard/ReviewsCard.styled";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input"

function EditProfilePage() {
  const navigate = useNavigate();
  const methods = useForm();

  return (
	<FormProvider {...methods}>
	  <form
		onSubmit={(e) => e.preventDefault()}
		noValidate
		autoComplete="off">
    <EditProfileContainer>
      <CenterContainer>
        <UserCardContainer>
          <UserInfoCard isEditProfile />
        </UserCardContainer>
        <EditProfileCard>
          <Header>Edit Profile</Header>
		  <DescriptionContainer>
		    <Input 
		  	  type="textarea" 
			  id="description" 
			  label={<DescriptionLabel>Description (Max of 100 characters)</DescriptionLabel>} />
		  </DescriptionContainer>
          <LowerContainer>
            <UploadImageContainer>
              <AvatarContainer>
                <AvatarText>Avatar</AvatarText>
                <QuestionIcon />
              </AvatarContainer>
              <UploadImageButton>Upload Image</UploadImageButton>
            </UploadImageContainer>
            <ButtonContainer>
              <CancelButton
                onClick={() => navigate("/profile")}
              >
                  Cancel
              </CancelButton>

              <SaveButton
                onClick={() => navigate("/profile")}
              >
                Save
              </SaveButton>
            </ButtonContainer>
          </LowerContainer>
        </EditProfileCard>
      </CenterContainer>
    </EditProfileContainer>
	</form></FormProvider>
  );
}

export default EditProfilePage;
