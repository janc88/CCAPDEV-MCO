import styled from "styled-components";

export const RestoReviewsContainer = styled.div`
  background-color: white;
  height: 90%;
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
  font-size: 2rem;
  padding: 1.1rem 2rem;
  box-shadow: 6px 7px 14px -2px rgba(0, 0, 0, 0.1);
`;

export const WriteReview = styled.input.attrs({
  type: "text",
  placeholder: "Write a Review...",
})`
  width: 90%;
  align-self: flex-start;
  margin: 1.6rem auto;
  padding: 1rem;
  border: solid 0.15rem #ff794f;
  border-radius: 0.5rem;
  font-size: medium;
  margin-top: auto;
`;

export const ReviewsContainer = styled.div`
  height: 80%;
  overflow: hidden;
  overflow-y:scroll;
`;
