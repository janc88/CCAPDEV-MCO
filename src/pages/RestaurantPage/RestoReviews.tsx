import React from "react";
import {
  Header,
  RestoReviewsContainer,
  ReviewsContainer,
  WriteReview,
} from "../../styles/RestoReviews.styled";
import ReviewCard from "./ReviewCard";

interface RestoReviewsProps {
  reviewList: ReviewProps[];
}


export interface ImageProps {
  id: number;
  src: string;
  alt: string;
}

export interface ReviewProps {
  id: number;
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

const RestoReviews: React.FC<RestoReviewsProps> = ({ reviewList }) => {
  return (
    <RestoReviewsContainer>
      <Header>Restaurant's Reviews</Header>
      <ReviewsContainer>
        {reviewList.map((review) => (
          <ReviewCard {...review}/>
        ))}
      </ReviewsContainer>
     
      <WriteReview />
    </RestoReviewsContainer>
  );
};

export default RestoReviews;
