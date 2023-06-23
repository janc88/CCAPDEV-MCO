import React, { useState } from "react";
import {
  Header,
  RestoReviewsContainer,
  ReviewsContainer,
  WriteReview,
} from "./ReviewsCard.styled";
import ReviewCard from "../ReviewCard/ReviewCard";
import ViewWriteModal from "../ModalPopups/ViewWriteModal";

interface ReviewsCardProps {
  reviewList: ReviewProps[];
  showOverLay?: boolean; //show overlay of restoname in the review image
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

  const toggleWriteModal = () => {
    setshowWriteModal((prevshowWriteModal) => !prevshowWriteModal);
  };
  
  return (
    <RestoReviewsContainer isUserReview={showOverLay}>
      <Header>{showOverLay ? "User's Reviews" : "Restaurant's Reviews"}</Header>
      <ReviewsContainer isUserReview={showOverLay}>
        {reviewList.map((review) => (
          <ReviewCard {...review} showOverlay={showOverLay} />
        ))}
      </ReviewsContainer>

      {!showOverLay && <WriteReview onClick={toggleWriteModal}/>}

      <ViewWriteModal
              isModalVisible={showWriteModal}
              onBackdropClick={toggleWriteModal}
              {...reviewList[1]} //temporary only
        />
    </RestoReviewsContainer>
  );
};

export default ReviewsCard;
