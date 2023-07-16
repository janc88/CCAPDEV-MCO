import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Rating from "../../components/ModalPopups/Ratings";
import { ImageProps } from "../../components/ReviewsCard/ReviewsCard";
import {
  Card,
  PageContainer,
} from "../styles/LoginPage.styled";
import {
  EditIcon,
  EditReviewContainer,
  HeaderReview,
  InputBox,
  Subheader,
  TextArea,
  ImageReview,
  ImageReviewContainer,
  ButtonContainer,
  CloseButton,
  ImageContainer,
} from "./EditReviewPage.styled";
import { CancelButton, SaveButton } from "../EditProfilePage/EditProfilePage.styled";

export const EditReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const [images, setImages] = useState<string[]>([]);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const image = state.imgs;

  const loadImages = async (imageList: ImageProps[]) => {
    const loadedImages = await Promise.all(
      imageList.map(async (image) => {
        const loadedImage = await import(`../../imgs/${image.src}`);
        return loadedImage.default;
      })
    );
    setLoadedImages(loadedImages);
  };

  useEffect(() => {
    loadImages(image);
    console.log(new Date());
  }, [image]);

  const handleImageDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setLoadedImages((prevLoadedImages) => prevLoadedImages.filter((_, i) => i !== index));
  };

  const cancelModal = () => {
    navigate(-1);  
};

  const saveModal = () => {
    navigate(-1);
};

  return (
    <PageContainer>
      <EditReviewContainer>
        <HeaderReview>
          Edit A Review
        </HeaderReview>

        <Subheader>
          Title
          <EditIcon></EditIcon>
        </Subheader>

        <InputBox>
          {state.title}
        </InputBox>

        <Subheader>
          Body
          <EditIcon></EditIcon>
        </Subheader>

        <TextArea>
          {state.description}
        </TextArea>

        <Subheader>
          Photos
          <EditIcon></EditIcon>
        </Subheader>

        <ImageReviewContainer>
          {loadedImages.map((imageSrc, index) => (
            <ImageContainer key={index}>
              <CloseButton onClick={() => handleImageDelete(index)}>X</CloseButton>
              <ImageReview
                src={imageSrc}
                alt={`Image ${index}`}
              />
            </ImageContainer>
          ))}
        </ImageReviewContainer>

        <ButtonContainer>
          <CancelButton onClick={cancelModal}>Cancel</CancelButton>
          <SaveButton onClick={saveModal}>Save</SaveButton>
        </ButtonContainer>

      </EditReviewContainer>
    </PageContainer>
  );
};

export default EditReviewPage;