import styled from "styled-components";

export const SummaryCardContainer = styled.div`
  width: 100%;
  max-height: 70%;
  height: fit-content;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NumRating = styled.h2`
  margin: 1rem;
`;

export const Rating = styled.h1`
  color: #ff794f;
  margin: 0 0.6rem;
`;

export const RatingGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 1rem 0;
`;

export const BarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.7rem;
  width: 80%;
`;

interface BarProps {
  fillPercentage: number;
}


export const Bar = styled.div<BarProps>`
  background: ${({ fillPercentage }) => {
    const color1 = "#FF794F";
    const color2 = "rgb(168, 168, 168, 0.6)";

    if (fillPercentage === 100) {
      return color1;
    } else if (fillPercentage === 0) {
      return color2;
    } else {
      return `
                linear-gradient(
                90deg, 
                ${color1} ${fillPercentage}%,
                ${color2} ${fillPercentage}%
                )
            `;
    }
  }};
  border-radius: 1rem;
  min-width: 85%;
  height: 1.1rem;
`;
