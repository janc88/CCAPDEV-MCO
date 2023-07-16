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
import { ImageProps } from "../ReviewsCard/ReviewsCard";

export interface RestoProps {
  _id: number;
  name: string;
  description: string;
  starCount: number[];
  address: string;
  imgs: string[];
  allReviews: string[];
  coverImg: string;
}

const RestoCard: React.FC<RestoProps> = (resto) => {
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [averageStars, setAverageStars] = useState<number>();
  const [numRatings, setNumRatings] = useState<number>();

  const computeAverageRating = (starcount: any) => {
    const totalRatings = starcount.reduce((acc, count, index) => acc + count * (index + 1), 0);
    const totalStars = starcount.reduce((acc, count, index) => acc + count, 0);
    const averageRating = totalRatings / totalStars;
    return Math.round(averageRating * 10) / 10;
  };

  const getTotalRatings = (starcount: any) => {
    const totalRatings = starcount.reduce((acc, count) => acc + count, 0);
    return totalRatings;
  };

  
  useEffect(() => {
    setBackgroundImage(`http://localhost:8080/api/images/${resto.coverImg}`)

    const averageStars = computeAverageRating(resto.starCount);
    setAverageStars(averageStars);

    const numRatings = getTotalRatings(resto.starCount);
    setNumRatings(numRatings);
  }, []);

  return (
    <RestoCardContainer to={`/restaurants/${resto._id}`}>
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
