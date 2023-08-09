import React, { useState } from "react";
import Modal from "./ViewModal";
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
  ImageReview,
  TrashAltIcon,
  EditIcon,
  EditDeleteContainer,
  ReviewImgsContainer,
} from "./ModalPopup";
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
  LastEditContainer,
} from "../ReviewCard/ReviewCard.styled";
import StarRating from "../StarRating/StarRating";
import SmallModal from "../SmallModal/SmallModal";
import { useUserContext } from "../../contexts/UserContext";
import DeleteModal from "../SmallModal/DeleteModal";
import { useNavigate } from "react-router-dom";
import { Review } from "../../contexts/ReviewHook";

interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
  relativeTime: string;
  onVote: (voteType: "up" | "down" | "none") => void;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps & Review> = ({
  onBackdropClick,
  isModalVisible,
  relativeTime,
  onVote,
  ...reviewProps
}) => {
  const loadedImages = reviewProps.imgs;
  const profilePic = reviewProps.user.avatar;
  const voteCount = reviewProps.votes;
  const voteType = reviewProps.voteType;
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isTrashClicked, setIsTrashClicked] = useState(false);
  const [isSmallModalVisible, setIsSmallModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useUserContext();

  const handleEditClick = () => {
    setIsEditClicked(true);
    navigate("/edit-review", { state: reviewProps });;
  };

  const toggleSmallModal = () => {
    setIsSmallModalVisible((wasModalVisible) => !wasModalVisible);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalVisible((wasModalVisible) => !wasModalVisible);
  };

  const isCurrentUser = user && user.username === reviewProps.user.username;

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
                <UserName>{reviewProps.user.username}</UserName>
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
            <ReviewImgsContainer>
              {loadedImages.map((imageSrc, index) => (
                <ImageReview
                  src={imageSrc}
                />
              ))}
            </ReviewImgsContainer>
          </ReviewCardContainer>

          <Footer>
            <HelpfulContainer>
            <ThumbsUpIcon
              onClick={() => {
                if (user) {
                  onVote("up");
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
                  onVote("down");
                } // If logged in
                else {
                  toggleSmallModal();
                }
              }}
              isClicked={voteType === "down"}
            />
              <Helpful>Helpful ({voteCount})</Helpful>

              {reviewProps.lastEdited && (
                <LastEditContainer>
                  Edited ({new Date(reviewProps.lastEdited).toLocaleString()})
                </LastEditContainer>
              )}
            </HelpfulContainer>

            <EditDeleteContainer>
            {isCurrentUser && (
              <>
                <EditIcon
                  onClick={() => {
                    if (user) {
                      handleEditClick();
                    } // If logged in
                    else {
                      toggleSmallModal();
                    }
                  }}
                  isClicked={isEditClicked}
                />
                <TrashAltIcon
                  isClicked={isTrashClicked}
                  onClick={() => {
                    if (user) {
                      toggleDeleteModal();
                    } // If logged in
                    else {
                      toggleSmallModal();
                    }
                  }}
                />
              </>
            )}
          </EditDeleteContainer>
          </Footer>
          <SmallModal
              isModalVisible={isSmallModalVisible}
              onBackdropClick={toggleSmallModal}
            />
         <DeleteModal
              isModalVisible={isDeleteModalVisible}
              onBackdropClick={toggleDeleteModal}
              reviewId={reviewProps.id}
            />
        </CardContainer>

        <LineBreak></LineBreak>
        <ResponseText>Owner's Response</ResponseText>

        <Response>
          <HeaderResponse>
            <RestoAvatar src={
				reviewProps.ownerResponse?.owner?.avatar || profilePic} />
            {reviewProps.ownerResponse?.owner?.username || reviewProps.restaurant.name}
          </HeaderResponse>
          {reviewProps.ownerResponse?.body}
        </Response>
      </DesktopModalContainer>
    </Modal>
  );
};

export default BaseModalWrapper;
