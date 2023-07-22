import React, { useState } from "react";
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
  SideTextContainer,
  UploadImageButton,
  UploadImageContainer,
  UserCardContainer,
} from "./EditProfilePage.styled";
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";
import { Header } from "../../components/ReviewsCard/ReviewsCard.styled";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../components/Input/Input"
import Popup from "../../components/SmallModal/SimplePopup";
import { useUserContext } from "../../contexts/UserContext";
import { SideText } from "../styles/LoginPage.styled";

function EditProfilePage() {
  const navigate = useNavigate();
  const { user, updateUser } = useUserContext();
  const methods = useForm({
	values: {description: user?.description}
  });
  const [ cancelPopup, setCancelPopup ] = useState(false);
  const handleCancel = () => setCancelPopup(true);
  const handleCancelPopup = () => setCancelPopup(false);
  const handleConfirmPopup = () => navigate("/profile");
  const handleSubmit = methods.handleSubmit(async (data) => {
	console.log(data);
	//ignore this error, linter does not recognize avatar
	await updateUser(data.description || '', (data as any).avatar);
	navigate("/profile");
  });

  return (
	<FormProvider {...methods}>
	  <form
		onSubmit={(e) => e.preventDefault()}
		noValidate
		autoComplete="off">
    <EditProfileContainer>
	  {cancelPopup && <Popup 
		onCancel={handleCancelPopup}
		onConfirm={handleConfirmPopup}
		title="Cancel Edit"
		content="Are you sure you want to cancel editing your profile?"/>}
      <CenterContainer>
        <UserCardContainer>
          <UserInfoCard 
		  	isEditProfile={true}
			isMyProfile={true}
			user={user}/>
        </UserCardContainer>
        <EditProfileCard>
      <Header>Edit Profile</Header>
		  <DescriptionContainer>
		    <Input 
		  	  type="textarea" 
			  id="description" 
			  label={<DescriptionLabel>Description (Max of 100 characters)</DescriptionLabel>} />

			  <SideTextContainer>
          <SideText onClick={() => navigate("/change-password")}>
            Change My Password
          </SideText>
        </SideTextContainer>
		  </DescriptionContainer>
		  

          <LowerContainer>
            <UploadImageContainer>
              <AvatarContainer>
                <AvatarText>Avatar</AvatarText>
                <QuestionIcon />
              </AvatarContainer>
			  <label htmlFor="avatar">
                <UploadImageButton>Upload Image</UploadImageButton>
			  </label>
            </UploadImageContainer>
            <ButtonContainer>
              <CancelButton
                onClick={handleCancel}>
                  Cancel
              </CancelButton>

              <SaveButton
                onClick={handleSubmit}>
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
