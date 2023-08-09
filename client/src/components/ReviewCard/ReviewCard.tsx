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
  OwnerResponseForm,
  LastEditContainer,
} from "./ReviewCard.styled";
import StarRating from "../StarRating/StarRating";
import { Button } from "../../styles/Button.styled";
import BaseModalWrapper from "../ModalPopups/ViewOwnerResponseModal";
import ViewReviewModal from "../ModalPopups/ViewReviewModal";
import SmallModal from "../SmallModal/SmallModal";
import { useUserContext } from "../../contexts/UserContext";
import { Review, useReviewActions } from "../../contexts/ReviewHook";
import default_img from "../../../src/imgs/banana.svg";
import { Link } from "react-router-dom";
import { useOwnerActions } from "../../contexts/OwnerHook";

interface ReviewCardProps extends Review {
  showOverlay?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = (_review) => {
  const [review, setReview] = useState<Review>(_review);
  const voteCount = review.votes;
  const voteType = review.voteType;
  const [ isVoteDisabled, setIsVoteDisabled ] = useState(false);

  const [showResponseForm, setShowResponseForm] = useState(false);
  const [ownerResponse, setOwnerResponse] = useState<string>("");

  const loadedImage = review.imgs[0];
  const profilePic = review.user.avatar;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSmallModalVisible, setIsSmallModalVisible] = useState(false);

  const { user } = useUserContext();
  const { replyToReview } = useOwnerActions(user?.id || "");
  const { voteReview } = useReviewActions();

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

  const onVoteClick = async (_voteType: 'up' | 'down' | 'none') => {
	if (isVoteDisabled) return;
	setIsVoteDisabled(true);
	if (_voteType === voteType)
		_voteType = 'none';
	const newReview = await voteReview(review.id, _voteType);
	setReview(newReview);
	setIsVoteDisabled(false);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await replyToReview(review.id, ownerResponse);
    //TODO: temporary hack
    window.location.reload();
    setShowResponseForm(false);
    setOwnerResponse("");
  };

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
		  onVote={onVoteClick}
        />

        <Footer>
          {!user?.ownedRestoId && (
            <HelpfulContainer>
              <ThumbsUpIcon
                onClick={() => {
                  if (user) {
                    onVoteClick('up');
                  } // If logged in
                  else {
                    toggleSmallModal();
                  }
                }}
                isClicked={voteType === "up"}
              />
              /
              <ThumbsDownIcon
                onClick={() => {
                  if (user) {
                    onVoteClick('down');
                  } // If logged in
                  else {
                    toggleSmallModal();
                  }
                }}
                isClicked={voteType === "down"}
              />
              <Helpful>Helpful ({voteCount})</Helpful>
              {review.lastEdited && (
                <LastEditContainer>
                  Edited ({new Date(review.lastEdited).toLocaleString()})
                </LastEditContainer>
              )}
            </HelpfulContainer>
          )}
          <div className="openRev">
            {!user?.ownedRestoId ? (
              review.ownerResponse && (
                <Button onClick={toggleModal} bgcolor="white" tcolor="black">
                  <OwnersResponse>View Owner's Response</OwnersResponse>
                </Button>
              )
            ) : review.ownerResponse ? (
              <Button onClick={toggleModal} bgcolor="white" tcolor="black">
                <OwnersResponse>View Your Response</OwnersResponse>
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
                <Button type="submit" bgcolor="#FF794F" tcolor="white">
                  Submit Response
                </Button>
              </form>
            )}

            <BaseModalWrapper
              {...review}
              isModalVisible={isModalVisible}
              onBackdropClick={toggleModal}
              relativeTime={relativeTime}
			  onVote={onVoteClick}
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
        <RestoNameContainer showOverlay={review.showOverlay}> {/* TODO: fix error */}
          <RestoName to={`/restaurants/${review.restaurant.id}`}>
            {review.restaurant.name}
          </RestoName>
        </RestoNameContainer>
      </ReviewImgContainer>
    </ReviewCardContainer>
  );
};

export default ReviewCard;
