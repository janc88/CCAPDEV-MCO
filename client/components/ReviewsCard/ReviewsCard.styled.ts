import styled from "styled-components";


interface ReviewsContainerProps {
  isUserReview?: boolean;
}

export const RestoReviewsContainer = styled.div<ReviewsContainerProps>`
  background-color: white;
  height: ${({ isUserReview }) => (isUserReview ? "100%" : "90%")};
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  background-color: #ff794f;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 0.9rem 2rem;
  box-shadow: 6px 7px 14px -2px rgba(0, 0, 0, 0.1);
`;

export const WriteReview = styled.button`
  width: 95%;
  color: #ff794f;
  background-color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: left;
  align-self: flex-start;
  margin: 1.6rem auto;
  padding: 0.7rem;
  border: solid 0.2rem #ff794f;
  border-radius: 0.7rem;
  margin-top: auto;
  box-shadow: 6px 7px 14px -2px rgba(0, 0, 0, 0.1);

  &:hover{
    cursor: pointer;
  }
`;

export const ReviewsContainer = styled.div<ReviewsContainerProps>`
  height: ${({ isUserReview }) => (isUserReview ? "100%" : "90%")};
  overflow: hidden;
  overflow-y: scroll;
`;
