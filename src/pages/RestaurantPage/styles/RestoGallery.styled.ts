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

export const Header = styled.div`
  background-color: #ff794f;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.5rem;
  padding: 0.8rem 1.3rem;
  box-shadow: 6px 7px 14px -2px rgba(0, 0, 0, 0.1);
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
