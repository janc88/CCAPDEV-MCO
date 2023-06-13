import React from "react";
import {
  RatingsCount,
  RestoCardContainer,
  RestoCardFooter,
  RestoDescription,
  RestoImg,
  RestoName,
  RestoRating,
} from "../styles/RestoCard.styled";
import bg from "../imgs/food-bg-light.jpeg";
import StarRating from "./StarRating";

export interface RestoProps {
  name: string;
  rating: number;
  numrating: number;
  ratings: number[];
  desc: string;
  address: string;
}

const RestoCard: React.FC<RestoProps> = (resto) => {
  return (
    <RestoCardContainer>
      <RestoImg image={bg}>
        <RestoName>{resto.name}</RestoName>
        <RestoRating>
          <StarRating rating={resto.rating} size='md'/>
          <RatingsCount>({resto.numrating})</RatingsCount>
        </RestoRating>
      </RestoImg>
      <RestoDescription>{resto.desc}</RestoDescription>
      <RestoCardFooter />
    </RestoCardContainer>
  );
};

export default RestoCard;
