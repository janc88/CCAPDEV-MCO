import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import {
  DesktopModalContainer,
  CardContainer,
  Response,
  HeaderReview,
  HeaderResponse,
  ResponseText,
  LineBreak,
  RestoAvatar,
  ReviewCardContainer,
  Header,
  Image,
  TrashAltIcon,
  EditIcon,
} from "./ReviewModal.styled";
import { ImageProps, ReviewProps } from "../ReviewsCard/ReviewsCard";
import {
  Footer,
  ReviewTitle,
  LeftContainer,
  RightContainer,
  UserContainer,
  UserName,
  RelativeTime,
  HelpfulContainer,
  OwnersResponse,
  ThumbsUpIcon,
  ThumbsDownIcon,
  Helpful,
} from "../ReviewCard/ReviewCard.styled";
import StarRating from "../StarRating/StarRating";

interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
  relativeTime: string;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps & ReviewProps> = ({
  onBackdropClick,
  isModalVisible,
  relativeTime,
  ...reviewProps
}) => {
  const [loadedImage, setLoadedImage] = useState<string>();
  const [profilePic, setProfilePic] = useState<string>();
  const [thumbsUpCount, setThumbsUpCount] = useState(reviewProps.helpful);
  const [thumbsDownCount, setThumbsDownCount] = useState(0);
  const [isThumbsUpClicked, setIsThumbsUpClicked] = useState(false);
  const [isThumbsDownClicked, setIsThumbsDownClicked] = useState(false);
  const image = reviewProps.imgs[0];
  const ppic = reviewProps.profilepic;

  const loadImages = async (image: ImageProps, ppic: ImageProps) => {
    try {
      const loadedImage = await import(`../../imgs/${image.src}`);
      const profilePic = await import(`../../imgs/${image.src}`);
      setLoadedImage(loadedImage.default);
      setProfilePic(profilePic.default);
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };

  const handleThumbsUpClick = () => {
    if (isThumbsUpClicked) {
      // Deselect thumbs-up
      setIsThumbsUpClicked(false);
      setThumbsUpCount((prevCount) => prevCount - 1);
    } else if (isThumbsDownClicked) {
      // Change from thumbs-down to thumbs-up
      setIsThumbsUpClicked(true);
      setIsThumbsDownClicked(false);
      setThumbsUpCount((prevCount) => prevCount + 1);
      setThumbsDownCount((prevCount) => prevCount - 1);
    } else {
      // Select thumbs-up
      setIsThumbsUpClicked(true);
      setThumbsUpCount((prevCount) => prevCount + 1);
    }
  };

  const handleThumbsDownClick = () => {
    if (isThumbsDownClicked) {
      // Deselect thumbs-down
      setIsThumbsDownClicked(false);
      setThumbsDownCount((prevCount) => prevCount - 1);
    } else if (isThumbsUpClicked) {
      // Change from thumbs-up to thumbs-down
      setIsThumbsUpClicked(false);
      setIsThumbsDownClicked(true);
      setThumbsUpCount((prevCount) => prevCount - 1);
      setThumbsDownCount((prevCount) => prevCount + 1);
    } else {
      // Select thumbs-down
      setIsThumbsDownClicked(true);
      setThumbsDownCount((prevCount) => prevCount + 1);
    }
  };

  useEffect(() => {
    loadImages(image, ppic);
    console.log(new Date());
  }, [image, ppic]);

  if (!isModalVisible) {
    return null;
  }

  return (
    <Modal onBackdropClick={onBackdropClick}>
      <DesktopModalContainer>
        <HeaderReview>Review</HeaderReview>

        <CardContainer>
          <Header>
            <LeftContainer>
              <ReviewTitle>{reviewProps.title}</ReviewTitle>
              <UserContainer>
                <RestoAvatar src={profilePic} />
                <UserName>Username here</UserName>
              </UserContainer>
            </LeftContainer>

            <RightContainer>
              <StarRating size="sm" rating={reviewProps.stars} />
              <RelativeTime>{relativeTime}</RelativeTime>
            </RightContainer>
          </Header>

          <ReviewCardContainer>
            {reviewProps.description}
            <br></br>
            <Image src={loadedImage} />
            <Image src={loadedImage} />
          </ReviewCardContainer>

          <Footer>
            <HelpfulContainer>
              <ThumbsUpIcon
                onClick={handleThumbsUpClick}
                isClicked={isThumbsUpClicked}
              />
              /
              <ThumbsDownIcon
                onClick={handleThumbsDownClick}
                isClicked={isThumbsDownClicked}
              />
              <Helpful>Helpful ({thumbsUpCount - thumbsDownCount})</Helpful>
              <EditIcon isClicked={isThumbsUpClicked}></EditIcon>
              <TrashAltIcon isClicked={isThumbsUpClicked}></TrashAltIcon>
            </HelpfulContainer>
          </Footer>
        </CardContainer>

        <LineBreak></LineBreak>
        <ResponseText>Owner's Response</ResponseText>

        <Response>
          <HeaderResponse>
            <RestoAvatar src={profilePic} />
            {reviewProps.resto}
          </HeaderResponse>
          {reviewProps.response}
        </Response>
      </DesktopModalContainer>
    </Modal>
  );
};

export default BaseModalWrapper;
