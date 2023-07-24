import styled from "styled-components";

export const AboutRestoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  height: fit-content;
  max-height: 62%;
  padding: 1.2rem 1.5rem;
  box-sizing: border-box;
  overflow: hidden;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NumRating = styled.h3`
  color: #FF794F;
  font-weight: 700;
  margin: 0;
  font-size: 1.3rem;
`;

export const RestoName = styled.h1`
  margin: 0;
  padding: 0.5rem 0;
`;

export const RestoImage = styled.img`
  width: 90%;
  height: 50%;
  border-radius: 1rem;
  margin: 0.6rem 0;
  object-fit: cover;
`;

export const RestoAddress = styled.h5`
  margin-top: 2px;
  margin-bottom: 2px;
  font-weight: 150;
`;

export const Divider = styled.hr`
  border-color: #FF794F;
  background-color: #FF794F;
  width: 90%;
  margin: 0.6rem 0;
`;

export const RestoDescription = styled.p`
  height: 20%;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin: 0.1rem 0;
  margin-bottom: 1rem;
  font-weight: 400;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  /* Style the scrollbar thumb */
  &::-webkit-scrollbar-thumb {
    background-color: #a7a7a7;
    border-radius: 5px;
  }
  /* Style the scrollbar on hover */
  &::-webkit-scrollbar-thumb:hover {
    background-color: #757575;
  }
`;