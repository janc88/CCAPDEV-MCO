import React from "react";
import {
  RatingsCount,
  RestoCardContainer,
  RestoCardFooter,
  RestoDescription,
  RestoImg,
  RestoName,
  RestoRating,
} from "./RestoCard.styled";
import StarRating from "../StarRating/StarRating";
import { Restaurant } from "../../contexts/RestoHook";


const RestoCard: React.FC<Restaurant> = (resto) => {
  const backgroundImage = resto.coverImg;
  const averageStars = resto.averageRating;
  const numRatings = resto.totalRatings;

  return (
    <RestoCardContainer to={`/restaurants/${resto.id}`}>
      <RestoImg image={backgroundImage}>
        <RestoName>{resto.name}</RestoName>
        <RestoRating>
          <StarRating rating={averageStars!} size="md" />
          <RatingsCount>({numRatings})</RatingsCount>
        </RestoRating>
      </RestoImg>
      <RestoDescription>{resto.description}</RestoDescription>
      <RestoCardFooter />
    </RestoCardContainer>
  );
};

export default RestoCard;
