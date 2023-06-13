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
  width: 100%;
  height: auto;
  border-radius: 1rem;
  margin: 0.6rem 0;
`;

export const RestoAddress = styled.h5`
  margin: 0;
  font-weight: 150;
`;

export const Divider = styled.hr`
  border-color: #FF794F;
  background-color: #FF794F;
  width: 90%;
  margin: 0.6rem 0;
`;

export const RestoDescription = styled.p`
  max-height: 20%;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin: 0.1rem 0;
  margin-bottom: 1rem;
  font-weight: 400;
`;