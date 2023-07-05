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

  const createSampleRestaurant = async () => {
    const sampleRestaurantData = {
      name: "Mcdonalds DLSU",
      description: "A sample restaurant for testing",
      address: "123 Main Street",
      coverImg: "https://res.cloudinary.com/dcgvictil/image/upload/v1688534186/Screenshot_2023-07-05_at_13.16.11_xuxpwa.png",
      imgs: ["https://res.cloudinary.com/dcgvictil/image/upload/v1688534186/Screenshot_2023-07-05_at_13.16.11_xuxpwa.png", "https://res.cloudinary.com/dcgvictil/image/upload/v1688534186/Screenshot_2023-07-05_at_13.16.11_xuxpwa.png"],
    };

    try {
      const response = await fetch("http://localhost:8080/api/restaurant/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sampleRestaurantData),
      });

      if (response.ok) {
        console.log("Sample restaurant created successfully");
      } else {
        console.error("Failed to create sample restaurant");
      }
    } catch (error) {
      console.error("Error creating sample restaurant:", error);
    }
  };


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
