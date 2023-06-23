import styled from "styled-components";
import { Search } from "@styled-icons/fa-solid";
import { FlexRow } from "../../styles/Flex.styled";

export const SearchContainer = styled(FlexRow)`
  background-color: white;
  color: black;
  border-radius: 10px;
  padding: 1.2rem;
  min-height: 70px;
  width: 84%;
  margin: 15px auto;
  overflow: hidden;
  cursor: pointer;
  font-size: 2.3rem;
  font-weight: 700;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);

  position: relative;
`;

export const SearchIcon = styled(Search)`
  width: 50px;
  height: 50px;
  padding: 20px;

  position: absolute;
  top: 50%;
  left: 25px;
  transform: translateY(-50%);
  z-index: 1;
`;

interface SearchInputProps {
	hasIcon: boolean;
  }
  export const SearchInput = styled.input.attrs({
	type: "text"
  })<SearchInputProps>`
	width: 100%;
	padding-left: ${({hasIcon}) => (hasIcon) ?'115px' : '25px'};
	padding-right: 25px;
  
	color: black;
	font-size: 2.3rem;
	font-weight: 700;
  
	outline: none;
	border: none;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
  
	transition: 0.2s ease-in-out 0s;
	::-webkit-input-placeholder {
	  font-size: 2.3rem;
	  font-weight: 700;
	}
	&:hover, &:focus {
	  cursor: pointer;
	  transform: scale(1.005);
	}
  `;
