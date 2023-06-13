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
} from "../../styles/AboutRestoCard.styled";
import StarRating from "../../components/StarRating";
import restoimg from "../../imgs/food-bg-light.jpeg";
import { RestoProps } from "../../components/RestoCard";

const AboutRestoCard: React.FC<RestoProps> = (resto) => {
  return (
    <AboutRestoContainer>
      <RestoName>{resto.name}</RestoName>
      <RatingContainer>
        <StarRating rating={resto.rating} size="sm" />
        <NumRating>({resto.numrating})</NumRating>
      </RatingContainer>
      <RestoImage src={restoimg} />
      <RestoAddress>{resto.address}</RestoAddress>
      <Divider />
      <RestoDescription>{resto.desc}</RestoDescription>
    </AboutRestoContainer>
  );
};

export default AboutRestoCard;
