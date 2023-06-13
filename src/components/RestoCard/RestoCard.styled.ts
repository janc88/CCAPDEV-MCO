import styled from "styled-components";

export const RestoCardContainer = styled.div`
  /* margin: 50px 10px; */
  display: flex;
  border-radius: 10px;
  box-shadow: 6px 7px 14px -2px rgba(0, 0, 0, 0.3);
  /* min-width: 25%; */
  width: 420px;
  /* max-width: 420px; */
  height: 335px;
  flex-direction: column;
  overflow: hidden;
`;

interface RestoImgProps {
  image: string;
}

export const RestoImg = styled.div<RestoImgProps>`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
    url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  height: 250px;
  position: relative;

  &:hover {
    width: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)),
      url(${({ image }) => image});
    background-size: cover;
    background-position: center;
    height: 250px;
    position: relative;
  }
`;

export const RestoName = styled.h1`
  font-size: 33px;
  margin: 23px 0;
  position: absolute;
  bottom: 25px;
  left: 14px;
  color: white;
  max-width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const RestoRating = styled.div`
  position: absolute;
  bottom: 13px;
  left: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RatingsCount = styled.h3`
  color: white;
  font-weight: 500;
  margin: 0;
  font-size: x-large;
`;

export const RestoCardFooter = styled.div`
  background-color: #ff794f;
  height: 12px;
  margin-top: auto;
`;

export const RestoDescription = styled.p`
  color: #737373;
  font-size: 20px;
  margin: 13px;
  max-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;
