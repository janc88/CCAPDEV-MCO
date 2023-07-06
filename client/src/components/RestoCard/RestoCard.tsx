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
  id: number;
  name: string;
  rating: number;
  numrating: number;
  desc: string;
  ratings: number[];
  address: string;
  coverImg: ImageProps;
}

const RestoCard: React.FC<RestoProps> = (resto) => {
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      const image = await import(`../../imgs/${resto.coverImg.src}`);
      setBackgroundImage(image.default);
    };
    fetchBackgroundImage();
  }, []);

  return (
    <RestoCardContainer to={`/restaurants/${resto.id}`}>
      <RestoImg image={backgroundImage}>
        <RestoName>{resto.name}</RestoName>
        <RestoRating>
          <StarRating rating={resto.rating} size="md" />
          <RatingsCount>({resto.numrating})</RatingsCount>
        </RestoRating>
      </RestoImg>
      <RestoDescription>{resto.desc}</RestoDescription>
      <RestoCardFooter />
    </RestoCardContainer>
  );
};

export default RestoCard;