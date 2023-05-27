import styled from "styled-components";

export const Button = styled.button`
  font-size: larger;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  background-color: ${({color}) => color};
  color: white;
  border-radius: 16px;
  padding: 11px; 
  transition: .2s ease-in-out 0s;
  border: none;
  outline: none;

  &:hover{
    cursor: pointer;
    transform: scale(1.05);
    border-radius: 11px;
    color: darkred;
  }

  &:active{
    color:black;
  }
`;

