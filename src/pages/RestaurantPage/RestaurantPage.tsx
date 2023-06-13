import React from "react";
import {
  LeftContainer,
  MiddleContainer,
  RestaurantPageContainer,
  RightContainer,
} from "./styles/RestaurantPage.styled";
import AboutRestoCard from "./AboutRestoCard";
import RestoGallery from "./RestoGallery";
import ReviewsCard from "../../components/ReviewsCard/ReviewsCard";
import SummaryCard from "./SummaryCard";

import {
  ImageProps,
  ReviewProps,
} from "../../components/ReviewsCard/ReviewsCard";
import { RestoProps } from "../../components/RestoCard/RestoCard";

interface RestoPageProps {
  details: RestoProps;
  restoImgs: ImageProps[];
  reviews: ReviewProps[];
}

const RestaurantPage: React.FC<RestoPageProps> = (props) => {
  return (
    <RestaurantPageContainer>
      <LeftContainer>
        <AboutRestoCard {...props.details} />
        <RestoGallery imageList={props.restoImgs} />
      </LeftContainer>
      <MiddleContainer>
        <ReviewsCard reviewList={props.reviews} />
      </MiddleContainer>
      <RightContainer>
        <SummaryCard
          numrating={props.details.numrating}
          rating={props.details.rating}
          ratings={props.details.ratings}
        />
      </RightContainer>
    </RestaurantPageContainer>
  );
};

export default RestaurantPage;
