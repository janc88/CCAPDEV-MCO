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
import { motion } from "framer-motion";

const RestoCard: React.FC<Restaurant> = (resto) => {
  const backgroundImage = resto.coverImg;
  const averageStars = resto.averageRating;
  const numRatings = resto.totalRatings;

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
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
    </motion.div>
  );
};

export default RestoCard;
