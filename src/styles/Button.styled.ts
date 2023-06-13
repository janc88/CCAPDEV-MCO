import styled from "styled-components";

interface buttonProps {
  bgcolor: string;
  tcolor: string;
}

export const Button = styled.button<buttonProps>`
  font-size: larger;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  background-color: ${({ bgcolor }) => bgcolor};
  color: ${({ tcolor }) => tcolor};
  border-radius: 16px;
  padding: 10px 18px 10px 18px;
  transition: 0.3s ease-in-out 0s;
  border: none;
  outline: none;

  &:hover {
    cursor: pointer;
    border-radius: 13px;
  }

  &:active {
    color: black;
  }
`;
