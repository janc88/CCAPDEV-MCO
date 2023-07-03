import React, {useState, useEffect} from "react";
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
import restoimg from "../../imgs/food-bg-light.jpeg";
import { RestoProps } from "../../components/RestoCard/RestoCard";

const AboutRestoCard: React.FC<RestoProps> = (resto) => {

  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const imageList = resto.coverImg;
  const loadImages = async () => {
    const loadedImages = await Promise.all(
      [imageList].map(async (image) => {
        const loadedImage = await import(`../../imgs/${image.src}`);
        return loadedImage.default;
      })
    );
    setLoadedImages(loadedImages);
  };

  useEffect(() => {
    loadImages();
  }, [imageList]);

  return (
    <AboutRestoContainer>
      <RestoName>{resto.name}</RestoName>
      <RatingContainer>
        <StarRating rating={resto.rating} size="sm" />
        <NumRating>({resto.numrating})</NumRating>
      </RatingContainer>
      <RestoImage src={loadedImages[0]} />
      <RestoAddress>{resto.address}</RestoAddress>
      <Divider />
      <RestoDescription>{resto.desc}</RestoDescription>
    </AboutRestoContainer>
  );
};

export default AboutRestoCard;
