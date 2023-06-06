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

interface RestoCardProps {
  name: string;
  rating: number;
  numrating: number;
  desc: string;
}

const RestoCard: React.FC<RestoCardProps> = ({
  name,
  rating,
  numrating,
  desc,
}) => {
  return (
    <RestoCardContainer>
      <RestoImg image={bg}>
        <RestoName>{name}</RestoName>
        <RestoRating>
          <StarRating rating={rating} />
          <RatingsCount>({numrating})</RatingsCount>
        </RestoRating>
      </RestoImg>
      <RestoDescription>{desc}</RestoDescription>
      <RestoCardFooter />
    </RestoCardContainer>
  );
};

export default RestoCard;
