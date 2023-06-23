import React, { useState } from "react";
import {
  Header,
  RestoReviewsContainer,
  ReviewsContainer,
  WriteReview,
} from "./ReviewsCard.styled";
import ReviewCard from "../ReviewCard/ReviewCard";
import ViewWriteModal from "../ModalPopups/ViewWriteModal";
import { SearchBar } from "./Input";

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
  const [reviewFilter, setReviewFilter] = useState('');

  const toggleWriteModal = () => {
    setshowWriteModal((prevshowWriteModal) => !prevshowWriteModal);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewFilter(event.target.value);
  };
  
  return (
    <RestoReviewsContainer isUserReview={showOverLay}>
      <Header>{showOverLay ? "User's Reviews" : "Restaurant's Reviews"}</Header>
      <ReviewsContainer isUserReview={showOverLay}>
		<SearchBar 
		  placeholder="Search Reviews"
		  inputProps={{
			onChange: handleInputChange,
			text: reviewFilter,
		}}/>
        {reviewList.map((review) => (
		  (review.title.includes(reviewFilter) || review.description.includes(reviewFilter)) && 
          <ReviewCard {...review} showOverlay={showOverLay} />
        ))}
      </ReviewsContainer>

      <WriteReview onClick={toggleWriteModal}/>

      <ViewWriteModal
              isModalVisible={showWriteModal}
              onBackdropClick={toggleWriteModal}
              {...reviewList[1]} //temporary only
        />
    </RestoReviewsContainer>
  );
};

export default ReviewsCard;
