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
  name: string;
  rating: number;
  numrating: number;
  ratings: number[];
  desc: string;
  address: string;
  img: ImageProps;
}

const RestoCard: React.FC<RestoProps> = (resto) => {
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      const image = await import(`../../imgs/${resto.img.src}`);
      setBackgroundImage(image.default);
    };
    fetchBackgroundImage();
  }, []);

  return (
    <RestoCardContainer>
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
