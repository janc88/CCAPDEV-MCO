import React, { ReactNode } from "react";
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

interface SummaryCardProps {
  ratings: number[];
  numrating: number;
  rating: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ratings, numrating, rating}) => {
  const renderBars = () => {
    const bars: ReactNode[] = [];

    for (let i = 5; i >= 1; i--) {
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
      <NumRating>{numrating} reviews</NumRating>
      <RatingContainer>
        <StarIcon size="lg" fillPercentage={100} />
        <Rating>{rating}</Rating>
      </RatingContainer>
      <RatingGroup>{renderBars()}</RatingGroup>
    </SummaryCardContainer>
  );
};

export default SummaryCard;
