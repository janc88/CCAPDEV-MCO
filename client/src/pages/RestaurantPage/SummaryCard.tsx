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
  totalRatings: number;
  avgRating: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ratings, totalRatings, avgRating}) => {
  const renderBars = () => {
    const bars: ReactNode[] = [];

    for (let i = 5; i >= 1; i--) {
      const ratio = (ratings[i-1] / totalRatings) * 100;

      bars.push(
        <BarContainer>
          <Rating key={i}>{i}</Rating>
          <Bar fillPercentage={ratio} />
        </BarContainer>
      );
    }

    return bars;
  };

  function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  return (
    <SummaryCardContainer>
      <Header>Summary</Header>
      <NumRating>{totalRatings} reviews</NumRating>
      <RatingContainer>
        <StarIcon size="lg" fillPercentage={100} />
        <Rating>{round(avgRating,1)}</Rating>
      </RatingContainer>
      <RatingGroup>{renderBars()}</RatingGroup>
    </SummaryCardContainer>
  );
};

export default SummaryCard;
