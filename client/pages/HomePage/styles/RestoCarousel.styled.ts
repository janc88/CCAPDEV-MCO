import styled from "styled-components";
import {
  ArrowLeftCircleFill,
  ArrowRightCircleFill,
} from "@styled-icons/bootstrap";

export const RestoCarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  width: 75%;
  justify-content: center;
  align-items: center;
`;

export const RestoCarouselHeader = styled.h1`
  padding: 1rem;
  font-size: 3rem;
  margin: 0;
`;

export const NavigationContainer = styled.div`
  display: flex;
`;

export const NavButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  margin: 1rem;
`;

export const LeftArrow = styled(ArrowLeftCircleFill)`
  width: 3.5rem;
  color: #ff794f;

  &:hover {
    color: #ed7753;
  }
  &:active {
    color: #d46b4a;
  }
`;

export const RightArrow = styled(ArrowRightCircleFill)`
  width: 3.5rem;
  color: #ff794f;

  &:hover {
    color: #ed7753;
  }

  &:active {
    color: #d46b4a;
  }
`;
