import styled from "styled-components";
import { Search } from "@styled-icons/fa-solid";



export const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

export const SearchContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: white;
  color: black;
  border-radius: 27px;
  width: 256px;
  height: 50px;
  overflow: hidden;
`;

interface SearchInputProps {
	hasFocus: boolean;
}
export const SearchIcon = styled(Search)<SearchInputProps>`
  width: 28px;
  height: 28px;
  padding: 4px;
  margin-left: 10px;
  visibility: ${({hasFocus}) => hasFocus ? 'hidden' : 'visible'};
`;

export const SearchInput = styled.input.attrs({
  type: "text",
  placeholder: "Search Restaurants",
})<SearchInputProps>`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  margin-left: ${({ hasFocus }) => (hasFocus ? "-21px" : "10px")};
  padding-right: 25px;

  color: #444;
  font-size: large;

  border-radius: 27px;
  transition: 0.2s ease-in-out 0s;
  outline: none;
  border: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ::-webkit-input-placeholder {
    font-weight: 150;
    opacity: 70%;
  }
  &:hover,
  &:focus {
    color: black;
    cursor: pointer;
    transform: scale(1.02);
    border-radius: 27px;
    ::-webkit-input-placeholder {
      opacity: 90%;
    }
  }
`;
