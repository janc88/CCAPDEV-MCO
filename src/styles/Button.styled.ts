import styled from "styled-components";

interface buttonProps {
  bgcolor?: string;
  tcolor?: string;
}

export const Button = styled.button<buttonProps>`
  font-size: 1.3rem;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  background-color: ${({ bgcolor }) => bgcolor};
  color: ${({ tcolor }) => tcolor};
  border-radius: 27px;
  padding: 0.6rem 1.5rem;
  transition: 0.2s ease-in-out 0s;
  border: none;
  outline: none;
  height: 90%;
  margin: auto 10px auto 0px;

  &:hover {
    cursor: pointer;
    border-radius: 1.3rem;
  }

  &:active {
    color: black;
  }
`;
