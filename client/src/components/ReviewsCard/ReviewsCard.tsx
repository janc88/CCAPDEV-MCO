import React, { useEffect, useState } from "react";
import {
  Header,
  RestoReviewsContainer,
  ReviewsContainer,
  WriteReview,
} from "./ReviewsCard.styled";
import ReviewCard from "../ReviewCard/ReviewCard";
import ViewWriteModal from "../ModalPopups/ViewWriteModal";
import { SearchBar } from "./Input";
import SmallModal from "../SmallModal/SmallModal";
import { useUserContext } from "../../contexts/UserContext";
import { 
  Review, useReviews,
} from "../../contexts/ReviewHook";
  
interface ReviewsCardProps {
  restoId: string;
  showOverLay?: boolean; //show overlay of restoname in the review image
}

const ReviewsCard: React.FC<ReviewsCardProps> = ({
  restoId,
  showOverLay = false,
}) => {
  const [showWriteModal, setshowWriteModal] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('');
  const [isSmallModalVisible, setIsSmallModalVisible] = useState(false);

  const toggleWriteModal = () => {
    setshowWriteModal((prevshowWriteModal) => !prevshowWriteModal);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewFilter(event.target.value);
  };

  const toggleSmallModal = () => {
    setIsSmallModalVisible((wasModalVisible) => !wasModalVisible);
  };

  const { user } = useUserContext();
  
  const { fetchReviews } = useReviews();
  const [fetchedReviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchReviews({ restoId }).then((reviews) => {
      setReviews(reviews ?? []);
    });
  }, [fetchReviews, restoId]);

  return (
    <RestoReviewsContainer isUserReview={showOverLay}>
      <Header>
        {showOverLay ? "User's Reviews" : "Restaurant's Reviews"}
        <SearchBar 
          placeholder="Search Reviews"
          inputProps={{
            onChange: handleInputChange,
            value: reviewFilter, // Change text to value
          }}
        />
      </Header>
      
      <ReviewsContainer isUserReview={showOverLay}>
        {fetchedReviews.map((review) => (
          (review.title.includes(reviewFilter) || review.body.includes(reviewFilter)) && 
          <ReviewCard {...review} showOverlay={showOverLay} />
        ))}
      </ReviewsContainer>

      <SmallModal
        isModalVisible={isSmallModalVisible}
        onBackdropClick={toggleSmallModal}
      />

      <WriteReview 
        onClick={() => {
          if (user) {
            toggleWriteModal();
          } // If logged in
          else {
            toggleSmallModal();
          }
        }}
      >
        Write a Review...
      </WriteReview>

      <ViewWriteModal
        isModalVisible={showWriteModal}
        onBackdropClick={toggleWriteModal}
        restaurantId={restoId}
      />
    </RestoReviewsContainer>
  );
};

export default ReviewsCard;
