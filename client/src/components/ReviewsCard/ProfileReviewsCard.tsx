import React, { useState } from "react";
import {
  Header,
  RestoReviewsContainer,
  ReviewsContainer,
} from "./ReviewsCard.styled";
import ReviewCard from "../ReviewCard/ReviewCard";
import { SearchBar } from "./Input";
import SmallModal from "../SmallModal/SmallModal";
import { Review } from "../../contexts/ReviewHook";

interface ReviewsCardProps {
  reviewList: Review[];
  showOverLay?: boolean; //show overlay of restoname in the review image
}

const ProfileReviewsCard: React.FC<ReviewsCardProps> = ({
  reviewList,
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

  // const { user } = useUserContext();
  
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

      {/* <ViewWriteModal
        isModalVisible={showWriteModal}
        onBackdropClick={toggleWriteModal}
        restaurantId={id || ""}
        {...reviewList[1]} //temporary only
      /> */}
    </RestoReviewsContainer>
  );
};

export default ProfileReviewsCard;
