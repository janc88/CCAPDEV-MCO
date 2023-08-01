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
import { useReviewActions } from "../../contexts/ReviewHook";

export const EditReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { editReview } = useReviewActions();

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
	const review = await editReview(state.id, {
		title: updatedTitle,
		body: updatedBody,
		stars: rating,
		imgs: imageFiles
	});
	if (review) {
		navigate(-1);
		console.log("Review updated");
	} else {
		throw new Error('Failed to update review');
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
