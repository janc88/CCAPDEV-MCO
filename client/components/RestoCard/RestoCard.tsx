import React, { useState, useEffect } from "react";
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
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [averageStars, setAverageStars] = useState<number>();
  const [numRatings, setNumRatings] = useState<number>();

  const computeAverageRating = (starcount: number[]) => {
    const totalRatings = starcount.reduce((acc, count, index) => acc + count * (index + 1), 0);
    const totalStars = starcount.reduce((acc, count, index) => acc + count, 0);
    const averageRating = totalRatings / totalStars;
    return Math.round(averageRating * 10) / 10;
  };

  const getTotalRatings = (starcount: number[]) => {
    const totalRatings = starcount.reduce((acc, count) => acc + count, 0);
    return totalRatings;
  };

  
  useEffect(() => {
    setBackgroundImage(resto.coverImg)

    const averageStars = computeAverageRating(resto.starCount);
    setAverageStars(averageStars);

    const numRatings = getTotalRatings(resto.starCount);
    setNumRatings(numRatings);
  }, [resto.coverImg, resto.starCount]);

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
