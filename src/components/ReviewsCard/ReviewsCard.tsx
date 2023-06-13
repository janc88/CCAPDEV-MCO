import React from "react";
import {
  Header,
  RestoReviewsContainer,
  ReviewsContainer,
  WriteReview,
} from "./ReviewsCard.styled";
import ReviewCard from "../ReviewCard/ReviewCard";

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
  return (
    <RestoReviewsContainer isUserReview={showOverLay}>
      <Header>{showOverLay ? "User's Reviews" : "Restaurant's Reviews"}</Header>
      <ReviewsContainer isUserReview={showOverLay}>
        {reviewList.map((review) => (
          <ReviewCard {...review} showOverlay={showOverLay} />
        ))}
      </ReviewsContainer>

      {!showOverLay && <WriteReview />}
    </RestoReviewsContainer>
  );
};

export default ReviewsCard;
