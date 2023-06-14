import styled from "styled-components";

interface buttonProps {
  bgcolor?: string;
  tcolor?: string;
}

export const Button = styled.button<buttonProps>`
  font-size: larger;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  background-color: ${({ bgcolor }) => bgcolor};
  color: ${({ tcolor }) => tcolor};
  border-radius: 1.6rem;
  padding: 0.6rem 1.5rem;
  transition: 0.2s ease-in-out 0s;
  border: none;
  outline: none;

  &:hover {
    cursor: pointer;
    border-radius: 1.3rem;
  }

  &:active {
    color: black;
  }
`;
