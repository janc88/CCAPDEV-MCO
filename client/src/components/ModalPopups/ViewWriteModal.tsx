import React, { ChangeEvent, useEffect, useState } from "react";
import Modal from "./ViewModal";
import {
  DesktopModalContainer,
  HeaderReview,
  ImgCardContainer,
  Header,
  ViewCardContainer,
  ImageIcon,
  ButtonContainer,
  CancelButton,
  SaveButton,
  FileContainer,
  ImageGrid,
  ImgContainer,
  Uploadtext,
  WriteRating,
  RatingText,
} from "./ModalPopup";

import StarRating from "../StarRating/StarRating";
import ImageWithCloseButton from "./ImageClose";
import Rating from "./Ratings";
import { TitleBox, DescriptionBox } from "./InputWriteModal";
import { useUserContext } from "../../contexts/UserContext";
import { useReviewActions } from "../../contexts/ReviewHook";
import { Review } from "../../contexts/ReviewHook";
import { useLocation, useNavigate } from "react-router-dom";

interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
}

interface StarRatingProps {
  rating: number;
  size: string;
}
const BaseModalWrapper: React.FC<BaseModalWrapperProps & Review & { restaurantId: string }> = ({
  onBackdropClick,
  isModalVisible,
  restaurantId,
  ...reviewProps
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  
  const [rating, setRating] = React.useState(0);
  const loadedImage = reviewProps.imgs[0];
  const [starRating, setStarRating] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const image = reviewProps.imgs[0];
  const { user } = useUserContext();
  const { createReview } = useReviewActions({ restoId: restaurantId, userId: user?.id || '' });


  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).filter(
        (file) => !imageFiles.some((imgFile) => imgFile.name === file.name)
      );
      setImageFiles((prevImages) => [...prevImages, ...newFiles]);
    }
  };

  useEffect(() => {
	const newImages = imageFiles.map((file) => URL.createObjectURL(file));
	setImages(newImages);
	return () => {
		newImages.forEach((newImage) => URL.revokeObjectURL(newImage));
	};
  }, [imageFiles]);

  if (!isModalVisible) {
    return null;
  }

  const CancelModal = () => {
    setImages([]);
    setRating(0);
    setTitle('');
    setDescription('');

    onBackdropClick();
  };

  const SaveModal = async () => {
    if (title.trim() === '' || description.trim() === '' || rating === 0) {
      console.error('Error: Title, rating, and description are required.');
      return;
    }

    await createReview({
      title,
      body: description,
      stars: rating,
      imgs: imageFiles,
    });

    try {
      setImages([]);
      setRating(0);
      setTitle('');
      setDescription('');
  
      onBackdropClick();
    } catch (error) {
      console.error('Error creating review:', error);
    }

    navigate(0);
  };

  const handleImageDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageFiles((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  };
  
  return (
    <Modal onBackdropClick={onBackdropClick}>
      <DesktopModalContainer>
        <HeaderReview>Write A Review</HeaderReview>
  
        <ViewCardContainer>
          <Header>
            <TitleBox
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Header>
  
          <WriteRating>
            <Rating
              count={5}
              value={rating}
              edit={true}
              onChange={(value) => setRating(value)}
            />
            <RatingText>Your rating</RatingText>
          </WriteRating>
  
          <DescriptionBox
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

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
        </ViewCardContainer>
  
        <ButtonContainer>
          <CancelButton onClick={CancelModal}>Cancel</CancelButton>
          <SaveButton onClick={SaveModal}>Post</SaveButton>
        </ButtonContainer>
      </DesktopModalContainer>
    </Modal>
  );
};

export default BaseModalWrapper;