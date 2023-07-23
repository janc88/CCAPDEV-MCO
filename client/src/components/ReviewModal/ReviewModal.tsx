import React, { useState } from "react";
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
import {
  Footer,
  ReviewTitle,
  LeftContainer,
  RightContainer,
  UserContainer,
  UserName,
  RelativeTime,
  HelpfulContainer,
  ThumbsUpIcon,
  ThumbsDownIcon,
  Helpful,
} from "../ReviewCard/ReviewCard.styled";
import StarRating from "../StarRating/StarRating";
import { Review } from "../../contexts/ReviewHook";

interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
  relativeTime: string;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps & Review> = ({
  onBackdropClick,
  isModalVisible,
  relativeTime,
  ...reviewProps
}) => {
  const loadedImage = reviewProps.imgs[0];
  const profilePic = reviewProps.user.avatar;
  const [thumbsUpCount, setThumbsUpCount] = useState(reviewProps.votes);
  const [thumbsDownCount, setThumbsDownCount] = useState(0);
  const [isThumbsUpClicked, setIsThumbsUpClicked] = useState(false);
  const [isThumbsDownClicked, setIsThumbsDownClicked] = useState(false);

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
            {reviewProps.body}
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
            {reviewProps.restaurant.name}
          </HeaderResponse>
          {reviewProps.ownerResponse}
        </Response>
      </DesktopModalContainer>
    </Modal>
  );
};

export default BaseModalWrapper;
