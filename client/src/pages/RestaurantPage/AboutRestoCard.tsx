import React from "react";
import {
  AboutRestoContainer,
  RatingContainer,
  NumRating,
  RestoName,
  RestoImage,
  RestoAddress,
  Divider,
  RestoDescription,
} from "./styles/AboutRestoCard.styled";
import StarRating from "../../components/StarRating/StarRating";
import { Restaurant } from "../../contexts/RestoHook";

const AboutRestoCard: React.FC<Restaurant> = (resto) => {
  return (
    <AboutRestoContainer>
      <RestoName>{resto.name}</RestoName>
      <RatingContainer>
		{/*TODO add ratings*/}
        <StarRating rating={0.5} size="sm" />
        <NumRating>({resto.allReviews?.length})</NumRating>
      </RatingContainer>
      <RestoImage src={resto.coverImg} />
      <RestoAddress>{resto.address}</RestoAddress>
      <Divider />
      <RestoDescription>{resto.description}</RestoDescription>
    </AboutRestoContainer>
  );
};

export default AboutRestoCard;
