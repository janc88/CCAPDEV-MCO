import styled from "styled-components";

export const RestoGalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.75rem;
  background-color: white;
  border-radius: 0.7rem;
  height: 25%;
  overflow: hidden;
`;



export const GalleryImage = styled.img`
  max-width: 8.4rem;
  max-height: 8.4rem;
  object-fit: cover;
  border-radius: 0.5rem;
`;

export const ImageContainer = styled.div`
  max-width: 25vw;
  height: 100%;

`;
