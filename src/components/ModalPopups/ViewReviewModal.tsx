import React, { useContext, useEffect, useState } from "react";
import Modal from "./ViewModal";
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
} from "./ModalPopup";
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
  ThumbsUpIcon,
  ThumbsDownIcon,
  Helpful,
} from "../ReviewCard/ReviewCard.styled";
import StarRating from "../StarRating/StarRating";
import SmallModal from "../SmallModal/SmallModal";
import { UserContext } from "../../contexts/UserContext";
import DeleteModal from "../SmallModal/DeleteModal";

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
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isTrashClicked, setIsTrashClicked] = useState(false);
  const [isSmallModalVisible, setIsSmallModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

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

  const handleEditClick = () => {
    setIsEditClicked(true);
  };

  const handleTrashClick = () => {
    setIsTrashClicked(true);
  };

  const toggleSmallModal = () => {
    setIsSmallModalVisible((wasModalVisible) => !wasModalVisible);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalVisible((wasModalVisible) => !wasModalVisible);
  };

  const { user } = useContext(UserContext);

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

        <ViewCardContainer>
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
            <ImageReview src={loadedImage} />
            <ImageReview src={loadedImage} />
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
            
        </ViewCardContainer>

      </DesktopModalContainer>
    </Modal>
  );
};

export default BaseModalWrapper;
