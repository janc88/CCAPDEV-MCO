import React, { useState } from "react";
import Modal from "./ViewModal";
import { useNavigate } from "react-router-dom";
import {
  DesktopModalContainer,
  HeaderReview,
  RestoAvatar,
  ReviewCardContainer,
  Header,
  ImageReview,
  TrashAltIcon,
  EditIcon,
  EditDeleteContainer,
  ViewCardContainer,
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
import { Review, useReviewActions } from "../../contexts/ReviewHook";

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

  const { user } = useUserContext();

  const navigate = useNavigate();


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

        <ViewCardContainer>
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
            {!user?.ownedRestoId &&
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
            }
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
        </ViewCardContainer>
      </DesktopModalContainer>
    </Modal>
  );
};

export default BaseModalWrapper;
