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
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps & Review> = ({
  onBackdropClick,
  isModalVisible,
  relativeTime,
  ...reviewProps
}) => {
  const loadedImages = reviewProps.imgs;
  const profilePic = reviewProps.user.avatar;
  const [thumbsUpCount, setThumbsUpCount] = useState(reviewProps.votes);
  const [thumbsDownCount, setThumbsDownCount] = useState(0);
  const [isThumbsUpClicked, setIsThumbsUpClicked] = useState(false);
  const [isThumbsDownClicked, setIsThumbsDownClicked] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isTrashClicked, setIsTrashClicked] = useState(false);
  const [isSmallModalVisible, setIsSmallModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  
  const navigate = useNavigate();

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

  const { user } = useUserContext();

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
            <ReviewImgsContainer>
              {loadedImages.map((imageSrc, index) => (
                <ImageReview
                  // key={images[index].id}
                  src={imageSrc}
                  // alt={images[index].alt}
                />
              ))}
            </ReviewImgsContainer>
          </ReviewCardContainer>

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

            <EditDeleteContainer>
              <EditIcon 
              isClicked={isEditClicked} 
              onClick={() => {
                if (user) {
                  handleEditClick();
                } // If logged in
                else {
                  toggleSmallModal();
                }
              }}
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
            </EditDeleteContainer>
          </Footer>
          <SmallModal
              isModalVisible={isSmallModalVisible}
              onBackdropClick={toggleSmallModal}
            />
         <DeleteModal
              isModalVisible={isDeleteModalVisible}
              onBackdropClick={toggleDeleteModal}
            />
        </CardContainer>

        <LineBreak></LineBreak>
        <ResponseText>Owner's Response</ResponseText>

        <Response>
          <HeaderResponse>
            <RestoAvatar src={profilePic} />
            {reviewProps.restaurant}
          </HeaderResponse>
          {reviewProps.ownerResponse}
        </Response>
      </DesktopModalContainer>
    </Modal>
  );
};

export default BaseModalWrapper;
