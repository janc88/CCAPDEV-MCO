import React, { ChangeEvent, useEffect, useState } from "react";
import Modal from "./ViewModal";
import {
  DesktopModalContainer,
  HeaderReview,
  ImgCardContainer,
  Header,
  ViewCardContainer,
  TitleBox,
  DescriptionBox,
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

interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
}

interface StarRatingProps {
  rating: number;
  size: string;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps & ReviewProps> = ({
  onBackdropClick,
  isModalVisible,
  ...reviewProps
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [rating, setRating] = React.useState(0);
  const [loadedImage, setLoadedImage] = useState<string>();
  const [starRating, setStarRating] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const image = reviewProps.imgs[0];

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

  const SaveModal = () => {
    setImages([]);
    setRating(0);
    setTitle('');
    setDescription('');

    onBackdropClick();
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
            <TitleBox></TitleBox>
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

          <DescriptionBox></DescriptionBox>

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
