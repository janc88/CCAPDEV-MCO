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
}

const SummaryCard: React.FC<SummaryCardProps> = ({ratings}) => {
  const total = ratings.reduce((a, b) => a + b, 0);
  const avg = ratings.reduce((a, b, ind) => a + b * (ind + 1), 0) / total

  const renderBars = () => {
    const bars: ReactNode[] = [];

    for (let i = 5; i >= 1; i--) {
      const ratio = (ratings[i-1] / total) * 100;
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
      <NumRating>{total} reviews</NumRating>
      <RatingContainer>
        <StarIcon size="lg" fillPercentage={100} />
        <Rating>{avg}</Rating>
      </RatingContainer>
      <RatingGroup>{renderBars()}</RatingGroup>
    </SummaryCardContainer>
  );
};

export default SummaryCard;
