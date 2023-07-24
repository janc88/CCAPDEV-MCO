import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
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
  RatingContainer,
  PhotoSubheader,
} from "./EditReviewPage.styled";
import { CancelButton, SaveButton } from "../EditProfilePage/EditProfilePage.styled";
import { FileContainer, ImageGrid, ImageIcon, ImgCardContainer, ImgContainer, RatingText, Uploadtext, WriteRating } from "../../components/ModalPopups/ModalPopup";
import ImageWithCloseButton from "../../components/ModalPopups/ImageClose";
import Rating from "../../components/ModalPopups/Ratings";

export const EditReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const [images, setImages] = useState<string[]>(state.imgs);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [rating, setRating] = React.useState<number>(state.stars);
  const [updatedTitle, setUpdatedTitle] = useState<string>(state.title);
  const [updatedBody, setUpdatedBody] = useState<string>(state.body);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImageFiles(Array.from(files));
    }
  };

  const handleImageDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const cancelModal = () => {
    navigate(-1);  
  };

  const saveModal = async () => {
    try {
      const reviewId = state.id;
      const userId = state.user;

      const formData = new FormData();
      formData.append("title", updatedTitle);
      formData.append("body", updatedBody);
      formData.append("stars", rating.toString());

      for (const img of imageFiles)
        formData.append('images', img);

      const response = await fetch(`http://localhost:8080/api/reviews/${reviewId}`, {
        method: 'PATCH',
        body: formData
      });

      if (response.ok) {
        navigate(-1);
        console.log("Review updated");
      } else {
        throw new Error('Failed to update review');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    const newImages = imageFiles.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);

    return () => {
      newImages.forEach((newImage) => URL.revokeObjectURL(newImage));
    };
  }, [imageFiles]);

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

        <InputBox
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />

        <RatingContainer>
            <Rating
              count={5}
              value={rating}
              edit={true}
              onChange={(value) => setRating(value)}
            />
            <RatingText>Your rating</RatingText>
          </RatingContainer>
          
        <Subheader>
          Body
          <EditIcon></EditIcon>
        </Subheader>

        <TextArea
          value={updatedBody}
          onChange={(e) => setUpdatedBody(e.target.value)}
        />

        <PhotoSubheader>
          Photos
          <EditIcon></EditIcon>
        </PhotoSubheader>

        <ImageReviewContainer>
          <ImgCardContainer>
            <FileContainer>
              <br />
              <div className="upload-container">
                <label htmlFor="image-upload">
                  <ImageIcon></ImageIcon> <Uploadtext>Upload Image</Uploadtext>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  multiple
                  style={{ display: "none" }}
                />
              </div>

              <ImageGrid>
                {images.map((src, index) => (
                  <ImgContainer key={index}>
                    <ImageWithCloseButton
                      src={src}
                      onDelete={() => handleImageDelete(index)}
                    />
                  </ImgContainer>
                ))}
              </ImageGrid>
            </FileContainer>
          </ImgCardContainer>
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
