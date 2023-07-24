import React, { useState } from "react";
import {
  Footer,
  Header,
  ReviewCardContainer,
  ReviewContentContainer,
  ReviewImg,
  ReviewImgContainer,
  ReviewTitle,
  ReviewDescription,
  LeftContainer,
  RightContainer,
  UserContainer,
  ProfilePic,
  UserName,
  RelativeTime,
  HelpfulContainer,
  OwnersResponse,
  ThumbsUpIcon,
  ThumbsDownIcon,
  Helpful,
  RestoNameContainer,
  RestoName,
  OwnerResponseForm
} from "./ReviewCard.styled";
import StarRating from "../StarRating/StarRating";
import { Button } from "../../styles/Button.styled";
import BaseModalWrapper from "../ModalPopups/ViewOwnerResponseModal";
import ViewReviewModal from "../ModalPopups/ViewReviewModal";
import SmallModal from "../SmallModal/SmallModal";
import { useUserContext } from "../../contexts/UserContext";
import { Review } from "../../contexts/ReviewHook";
import default_img from "../../../src/imgs/banana.svg";
import { Link } from "react-router-dom";

interface ReviewCardProps extends Review {
  showOverlay?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = (review) => {
  const [thumbsUpCount, setThumbsUpCount] = useState(review.votes);
  const [thumbsDownCount, setThumbsDownCount] = useState(0);
  const [isThumbsUpClicked, setIsThumbsUpClicked] = useState(false);
  const [isThumbsDownClicked, setIsThumbsDownClicked] = useState(false);

  const [showResponseForm, setShowResponseForm] = useState(false);
  const [ownerResponse, setOwnerResponse] = useState<string>('');

  const loadedImage = review.imgs[0];
  const profilePic = review.user.avatar;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSmallModalVisible, setIsSmallModalVisible] = useState(false);

  const getTimeDifference = (specificDate: Date): string => {
    const currentDate: Date = new Date();
    const timeDifference: number =
      currentDate.getTime() - specificDate.getTime();

    if (timeDifference < 0) {
      return "Invalid date";
    }

    const secondsDifference: number = Math.floor(timeDifference / 1000);
    const minutesDifference: number = Math.floor(secondsDifference / 60);
    const hoursDifference: number = Math.floor(minutesDifference / 60);
    const daysDifference: number = Math.floor(hoursDifference / 24);
    const yearsDifference: number = Math.floor(daysDifference / 365);

    return secondsDifference < 60
      ? `${secondsDifference} ${
          secondsDifference === 1 ? "second" : "seconds"
        } ago`
      : minutesDifference < 60
      ? `${minutesDifference} ${
          minutesDifference === 1 ? "minute" : "minutes"
        } ago`
      : hoursDifference < 24
      ? `${hoursDifference} ${hoursDifference === 1 ? "hour" : "hours"} ago`
      : daysDifference < 365
      ? `${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago`
      : `${yearsDifference} ${yearsDifference === 1 ? "year" : "years"} ago`;
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

  const relativeTime = getTimeDifference(review.datePosted);

  const [showReviewModal, setShowReviewModal] = useState(false);

  const toggleReviewModal = () => {
    setShowReviewModal((prevShowReviewModal) => !prevShowReviewModal);
  };

  const toggleModal = () => {
    setIsModalVisible((wasModalVisible) => !wasModalVisible);
  };

  const toggleSmallModal = () => {
    setIsSmallModalVisible((wasModalVisible) => !wasModalVisible);
  };

  const handleButtonClick = () => {
    setShowResponseForm(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOwnerResponse(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // TODO: Update ownerResponse of review in backend

    console.log('Response:', ownerResponse);
    setShowResponseForm(false);
    setOwnerResponse('');
  };

  const { user } = useUserContext();

  return (
    <ReviewCardContainer>
      <ReviewContentContainer>
        <Header>
          <LeftContainer>
            <ReviewTitle>{review.title}</ReviewTitle>
            <UserContainer>
              <Link to={`/profile/${review.user.id}`}>
                <ProfilePic src={profilePic} />
              </Link>
              <UserName>{review.user.username}</UserName>
            </UserContainer>
          </LeftContainer>
          <RightContainer>
            <StarRating size="sm" rating={review.stars} />
            <RelativeTime>{relativeTime}</RelativeTime>
          </RightContainer>
        </Header>

        <ReviewDescription onClick={toggleReviewModal}>
          {review.body}
        </ReviewDescription>

        <ViewReviewModal
          {...review}
          isModalVisible={showReviewModal}
          onBackdropClick={toggleReviewModal}
          relativeTime={relativeTime}
        />

        <Footer>
          {!user?.ownedRestoId && (
            <HelpfulContainer>
              <ThumbsUpIcon
                onClick={() => {
                  if (user) {
                    handleThumbsUpClick();
                  } // If logged in
                  else {
                    toggleSmallModal();
                  }
                }}
                isClicked={isThumbsUpClicked}
              />
              /
              <ThumbsDownIcon
                onClick={() => {
                  if (user) {
                    handleThumbsDownClick();
                  } // If logged in
                  else {
                    toggleSmallModal();
                  }
                }}
                isClicked={isThumbsDownClicked}
              />
              <Helpful>Helpful ({thumbsUpCount - thumbsDownCount})</Helpful>
            </HelpfulContainer>
          )}
          <div className="openRev">
            {/* TODO: also check if review already has response */}
            {!user?.ownedRestoId ? (
              <Button onClick={toggleModal} bgcolor="white" tcolor="black">
                <OwnersResponse>View Owner's Response</OwnersResponse>
              </Button>
            ) : !showResponseForm ? (
              <Button
                onClick={handleButtonClick}
                bgcolor="white"
                tcolor="black"
              >
                <OwnersResponse>Respond to Review</OwnersResponse>
              </Button>
            ) : (
              <form onSubmit={handleSubmit}>
                <OwnerResponseForm
                  type="text"
                  value={ownerResponse}
                  onChange={handleInputChange}
                  placeholder="Type your response here"
                />
                <Button type="submit" bgcolor="#FF794F" tcolor="white">Submit Response</Button>
              </form>
            )}

            <BaseModalWrapper
              {...review}
              isModalVisible={isModalVisible}
              onBackdropClick={toggleModal}
              relativeTime={relativeTime}
            />

            <SmallModal
              isModalVisible={isSmallModalVisible}
              onBackdropClick={toggleSmallModal}
            />
          </div>
        </Footer>
      </ReviewContentContainer>
      <ReviewImgContainer>
        <ReviewImg src={loadedImage || default_img} />
        <RestoNameContainer showOverlay={review.showOverlay}>
          <RestoName>{review.restaurant.name}</RestoName>
        </RestoNameContainer>
      </ReviewImgContainer>
    </ReviewCardContainer>
  );
};

export default ReviewCard;
