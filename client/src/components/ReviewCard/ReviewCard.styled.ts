import styled, { css } from "styled-components";
import { ThumbsUp, ThumbsDown } from "@styled-icons/fa-solid";

export const ReviewCardContainer = styled.div`
  border-radius: 0.7rem;
  box-shadow: 1px 2px 9px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 1px 2px 9px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 1px 2px 9px 0px rgba(0, 0, 0, 0.2);
  background-color: white;
  margin: 0.7rem 1.7rem 0.7rem 1.7rem;
  padding: 1rem;
  display: flex;
  max-height: 20rem;
`;

export const ReviewContentContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
  cursor: pointer;
`;

export const ReviewImgContainer = styled.div`
  flex: 1;
  position: relative;
  display: inline-block;
  cursor: default;
`;

export const ReviewImg = styled.img`
  width: 14rem;
  height: 13rem;
  object-fit: cover;
  border-radius: 0.3rem;
`;

interface RestoNameContainerProps {
  showOverlay?: boolean;
}

export const RestoNameContainer = styled.div<RestoNameContainerProps>`
  position: absolute;
  bottom: 1.6rem;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 0.3rem;

  ${({ showOverlay }) =>
    showOverlay &&
    css`
      opacity: 1;
    `}
`;

export const RestoName = styled.div`
  font-size: medium;
  color: white;
  padding: 0.5rem;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: default;
`;

export const ReviewTitle = styled.h1`
  margin: 0;
  margin-bottom: 0.2rem;
  font-size: 1.5rem;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 0.2rem;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfilePic = styled.img`
  border-radius: 50%;
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 0.3rem;
  object-fit: cover;
`;

export const UserName = styled.div`
  font-weight: 200;
`;

export const RelativeTime = styled.div`
  font-weight: 200;
  margin-top: 0.5rem;
`;

export const ReviewDescription = styled.p`
  height: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

export const HelpfulContainer = styled.div`
  display: flex;
  font-size: 1.3rem;
`;

export const Helpful = styled.div`
  font-size: 1rem;
  font-weight: 100;
  margin: 0 0.5rem;
`;

export const ThumbsUpIcon = styled(ThumbsUp)<{ isClicked: boolean }>`
  margin: 0 0.3rem;
  color: ${({ isClicked }) => (isClicked ? "#ff794f" : "black")};
  height: 1.5rem;
  width: 1.5rem;

  &:hover {
    color: #ff794f;
    cursor: pointer;
  }
`;

export const ThumbsDownIcon = styled(ThumbsDown)<{ isClicked: boolean }>`
  color: black;
  margin: 0 0.3rem;
  color: ${({ isClicked }) => (isClicked ? "#ff794f" : "black")};
  height: 1.5rem;
  width: 1.5rem;

  &:hover {
    color: #ff794f;
    cursor: pointer;
  }
`;

export const LastEditContainer = styled.div`
  display: flex;
  font-size: 1rem;
  font-weight: 500;
  margin-left: 0.25rem;
`;

export const OwnersResponse = styled.h5`
  margin: 0;
  color: #ff794f;
  font-weight: 800;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  cursor: default;
`;

export const ClickableContainer = styled.div`
  cursor: pointer;
`;

export const OwnerResponseForm = styled.input`
  width: 25rem;
  border-radius: 2rem;
  border: 1px black solid;
  padding: 0.5rem;
  padding-left: 1rem;
  margin-right: 1rem;
  font-size: medium;

  ::-webkit-input-placeholder {
    font-weight: 200;
    opacity: 80%;
  }

`;