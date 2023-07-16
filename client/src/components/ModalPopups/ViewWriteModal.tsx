import React, { ChangeEvent, useEffect, useState, useContext } from "react";
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
import { ImageProps, ReviewProps } from "../ReviewsCard/ReviewsCard";

import StarRating from "../StarRating/StarRating";
import ImageWithCloseButton from "./ImageClose";
import Rating from "./Ratings";
import { TitleBox, DescriptionBox } from "./InputWriteModal";
import { UserContext } from "../../contexts/UserContext";

interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
}

interface StarRatingProps {
  rating: number;
  size: string;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps & ReviewProps & { restaurantId: string }> = ({
  onBackdropClick,
  isModalVisible,
  restaurantId,
  ...reviewProps
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [rating, setRating] = React.useState(0);
  const [loadedImage, setLoadedImage] = useState<string>();
  const [starRating, setStarRating] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const image = reviewProps.imgs[0];
  const { user } = useContext(UserContext);

  const loadImages = async (image: ImageProps) => {
    try {
      const loadedImage = await import(`../../imgs/${image.src}`);
      setLoadedImage(loadedImage.default);
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };

  useEffect(() => {
    loadImages(image);
    console.log(new Date());
  }, [image]);

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
  
    try {
      const reviewData = {
        title: title.trim(),
        body: description.trim(),
        stars: rating,
        user: user,
        restaurant: restaurantId,
        images: images,
      };
  
      const response = await fetch("http://localhost:8080/api/reviews/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
  
      const newReview = await response.json();
      if (response.ok) {
        console.log('Review created:', newReview);
      } else {
        console.error('Error creating review:', newReview);
        console.log(reviewData);
      }
  
      setImages([]);
      setRating(0);
      setTitle('');
      setDescription('');
  
      onBackdropClick();
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };
  
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...imageUrls]);
    }
  };

  const handleImageDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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