import React, { useEffect, useState } from "react";
import {
  Header,
  RestoReviewsContainer,
  ReviewsContainer,
} from "./ReviewsCard.styled";
import ReviewCard from "../ReviewCard/ReviewCard";
import { SearchBar } from "./Input";
import SmallModal from "../SmallModal/SmallModal";
import { Review, useReviews } from "../../contexts/ReviewHook";
import { useUserContext } from "../../contexts/UserContext";

interface ReviewsCardProps {
  userID: string;
  showOverLay?: boolean; //show overlay of restoname in the review image
}

const ProfileReviewsCard: React.FC<ReviewsCardProps> = ({
  userID,
  showOverLay = false,
}) => {
  const [showWriteModal, setshowWriteModal] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('');
  const [isSmallModalVisible, setIsSmallModalVisible] = useState(false);
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const { user } = useUserContext();
  const {fetchUserReviews} = useReviews();
  useEffect(() => {
	fetchUserReviews({ userId: userID }).then((reviews) => {
		setReviewList(reviews ?? []);
	});
  }, [fetchUserReviews, user, userID]);

  const toggleWriteModal = () => {
    setshowWriteModal((prevshowWriteModal) => !prevshowWriteModal);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewFilter(event.target.value);
  };

  const toggleSmallModal = () => {
    setIsSmallModalVisible((wasModalVisible) => !wasModalVisible);
  };
  
  return (
    <RestoReviewsContainer isUserReview={showOverLay}>
      <Header>
		  {showOverLay ? "User's Reviews" : "Restaurant's Reviews"}
		  <SearchBar 
		    placeholder="Search Reviews"
		    inputProps={{
			  onChange: handleInputChange,
			  text: reviewFilter,
		  }}/>
	    </Header>
      
      <ReviewsContainer isUserReview={showOverLay}>
        {reviewList.map((review) => (
      (review.title.includes(reviewFilter) || review.body.includes(reviewFilter)) && 
          <ReviewCard {...review} showOverlay={showOverLay} />
        ))}
      </ReviewsContainer>

      <SmallModal
        isModalVisible={isSmallModalVisible}
        onBackdropClick={toggleSmallModal}
      />
    </RestoReviewsContainer>
  );
};

export default ProfileReviewsCard;
