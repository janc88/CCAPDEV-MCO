import React from "react";
import {
  NumRating,
  Rating,
  RatingContainer,
  SummaryCardContainer,
  RatingGroup,
  BarContainer,
  Bar,
} from "./styles/SummaryCard.styled";
import { Header } from "../../components/ReviewsCard/ReviewsCard.styled";
import { StarIcon } from "../../components/StarRating/Star.styled";
import { RestoProps } from "../../components/RestoCard/RestoCard";

const SummaryCard: React.FC<RestoProps> = (resto) => {
  const renderBars = () => {
    const bars = [];

    for (let i = 5; i >= 1; i--) {
      const ratings = resto.ratings;
      const totalCount = ratings.length;
      const occurrences = ratings.reduce((count, num) => {
        if (num === i) {
          return count + 1;
        }
        return count;
      }, 0);
      const ratio = (occurrences / totalCount) * 100;

      bars.push(
        <BarContainer>
          <Rating key={i}>{i}</Rating>
          <Bar fillPercentage={ratio} />
        </BarContainer>
      );
    }

    return bars;
  };

  return (
    <SummaryCardContainer>
      <Header>Summary</Header>
      <NumRating>{resto.numrating} reviews</NumRating>
      <RatingContainer>
        <StarIcon size="lg" fillPercentage={100} />
        <Rating>{resto.rating}</Rating>
      </RatingContainer>
      <RatingGroup>{renderBars()}</RatingGroup>
    </SummaryCardContainer>
  );
};

export default SummaryCard;
