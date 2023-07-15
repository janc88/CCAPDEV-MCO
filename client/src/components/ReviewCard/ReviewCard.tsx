import React, { useState, useEffect, useContext } from "react";
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
} from "./ReviewCard.styled";
import StarRating from "../StarRating/StarRating";
import { ReviewProps, ImageProps } from "../ReviewsCard/ReviewsCard";
import { Button } from "../../styles/Button.styled";
import BaseModalWrapper from "../ModalPopups/ViewOwnerResponseModal";
import ViewReviewModal from "../ModalPopups/ViewReviewModal";
import SmallModal from "../SmallModal/SmallModal";
import { UserContext } from "../../contexts/UserContext";

interface ReviewCardProps extends ReviewProps {
  showOverlay?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = (review) => {
  const [thumbsUpCount, setThumbsUpCount] = useState(review.helpful);
  const [thumbsDownCount, setThumbsDownCount] = useState(0);
  const [isThumbsUpClicked, setIsThumbsUpClicked] = useState(false);
  const [isThumbsDownClicked, setIsThumbsDownClicked] = useState(false);

  const [loadedImage, setLoadedImage] = useState<string>();
  const [profilePic, setProfilePic] = useState<string>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSmallModalVisible, setIsSmallModalVisible] = useState(false);
  const image = review.imgs[0];
  const ppic = review.profilepic;

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

  const { user } = useContext(UserContext);

  useEffect(() => {
    loadImages(image, ppic);
    console.log(new Date());
  }, [image, ppic]);

  return (
    <ReviewCardContainer>
      <ReviewContentContainer>
        <Header>
          <LeftContainer>
            <ReviewTitle>{review.title}</ReviewTitle>
            <UserContainer>
              <ProfilePic src={profilePic} />
              <UserName>{review.username}</UserName>
            </UserContainer>
          </LeftContainer>
          <RightContainer>
            <StarRating size="sm" rating={review.stars} />
            <RelativeTime>{relativeTime}</RelativeTime>
          </RightContainer>
        </Header>

        <ReviewDescription onClick={toggleReviewModal}>
          {review.description}
        </ReviewDescription>

        <ViewReviewModal
          {...review}
          isModalVisible={showReviewModal}
          onBackdropClick={toggleReviewModal}
          relativeTime={relativeTime}
        />

        <Footer>
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
          <div className="openRev">
            <Button onClick={toggleModal} bgcolor="white" tcolor="black">
              <OwnersResponse>View Owner's Response</OwnersResponse>
            </Button>

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
        <ReviewImg src={loadedImage} />
        <RestoNameContainer showOverlay={review.showOverlay}> 
          <RestoName>{review.resto}</RestoName>
        </RestoNameContainer>
      </ReviewImgContainer>
    </ReviewCardContainer>
  );
};

export default ReviewCard;
