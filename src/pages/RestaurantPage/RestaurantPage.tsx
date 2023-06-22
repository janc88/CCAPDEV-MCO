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
import { useParams } from "react-router-dom";

import { restoList } from "../../data/data";

const RestaurantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const resto = restoList.find((resto) => resto.details.id === parseInt(id!));

  return (
    <RestaurantPageContainer className="resto-gallery">
      <LeftContainer>
        <AboutRestoCard
          id={resto!.details.id}
          name={resto!.details.name}
          rating={resto!.details.rating}
          numrating={resto!.details.numrating}
          desc={resto!.details.desc}
          ratings={resto!.details.ratings}
          address={resto!.details.address}
          coverImg={resto!.details.coverImg}
        />
        <RestoGallery imageList={resto!.restoImgs} />
      </LeftContainer>
      <MiddleContainer>
        <ReviewsCard reviewList={resto!.reviews} />
      </MiddleContainer>
      <RightContainer>
        <SummaryCard
          numrating={resto!.details.numrating}
          rating={resto!.details.rating}
          ratings={resto!.details.ratings}
        />
      </RightContainer>
    </RestaurantPageContainer>
  );
};

export default RestaurantPage;
