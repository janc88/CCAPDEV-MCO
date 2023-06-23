import React, { useContext, useState } from "react";
import {
  Header,
  RestoReviewsContainer,
  ReviewsContainer,
  WriteReview,
} from "./ReviewsCard.styled";
import ReviewCard from "../ReviewCard/ReviewCard";
import ViewWriteModal from "../ModalPopups/ViewWriteModal";
import SmallModal from "../SmallModal/SmallModal";
import { UserContext } from "../../contexts/UserContext";

interface ReviewsCardProps {
  reviewList: ReviewProps[];
  showOverLay?: boolean; // show overlay of restoname in the review image
}

export interface ImageProps {
  id: number;
  src: string;
  alt: string;
}

export interface ReviewProps {
  id: number;
  resto: string;
  title: string;
  username: string;
  profilepic: ImageProps;
  datePosted: Date;
  description: string;
  stars: number;
  helpful: number;
  response: string;
  imgs: ImageProps[];
}

const ReviewsCard: React.FC<ReviewsCardProps> = ({
  reviewList,
  showOverLay = false,
}) => {
  const [showWriteModal, setshowWriteModal] = useState(false);
  const [isSmallModalVisible, setIsSmallModalVisible] = useState(false);

  const { user } = useContext(UserContext);

  const toggleWriteModal = () => {
    setshowWriteModal((prevshowWriteModal) => !prevshowWriteModal);
  };

  const toggleSmallModal = () => {
    setIsSmallModalVisible((wasModalVisible) => !wasModalVisible);
  };

  return (
    <RestoReviewsContainer isUserReview={showOverLay}>
      <Header>{showOverLay ? "User's Reviews" : "Restaurant's Reviews"}</Header>
      <ReviewsContainer isUserReview={showOverLay}>
        {reviewList.map((review) => (
          <ReviewCard key={review.id} {...review} showOverlay={showOverLay} />
        ))}
      </ReviewsContainer>

      {!showOverLay && (
        <WriteReview
          onClick={() => {
            if (user) {
              toggleWriteModal();
            } else {
              toggleSmallModal();
            }
          }}
        />
      )}

      <ViewWriteModal
        isModalVisible={showWriteModal}
        onBackdropClick={toggleWriteModal}
        {...reviewList[1]} // temporary only
      />

      <SmallModal
        isModalVisible={isSmallModalVisible}
        onBackdropClick={toggleSmallModal}
      />
    </RestoReviewsContainer>
  );
};

export default ReviewsCard;
