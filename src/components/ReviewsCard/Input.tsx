import React, { useState } from "react";
import styled from "styled-components";
import { FlexRow } from "../../styles/Flex.styled";
import { Search } from "@styled-icons/fa-solid";
//TODO: clean up code;

export const SearchContainer = styled(FlexRow)`
  background-color: white;
  color: black;
  border-radius: 0.7rem;
  overflow: hidden;

  margin: 15px auto;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 1px 2px 9px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 1px 2px 9px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 1px 2px 9px 0px rgba(0, 0, 0, 0.2);
  margin: 0.7rem 1.7rem;
  padding: 1rem;

  min-height: 40px;
  height: fit-content;
  position: relative;
`;
export const SearchIcon = styled(Search)`
  width: 30px;
  height: 30px;
  margin-left: 25px;
`;
interface SearchInputProps {
	hasIcon: boolean;
}
export const SearchInput = styled.input.attrs({
	type: "text"
})<SearchInputProps>`
	width: 100%;
	background-color: rgba(0, 0, 0, 0);
	margin-left: ${({hasIcon}) => hasIcon ? '25px' : '-30px'};
	padding-right: 25px;
  
	color: #444;
	font-size: 1rem;

	border-radius: 27px;
  
	outline: none;
	border: none;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
  
	transition: 0.2s ease-in-out 0s;
	::-webkit-input-placeholder {
	  font-weight: 150;
	  opacity: 70%;
	  font-size: 1rem;
	}
	&:hover, &:focus {
	  cursor: pointer;
	  color: black;
	  transform: scale(1.02);
	  border-radius: 27px;
	  ::-webkit-input-placeholder {
		opacity: 90%;
	  }
	}
  `;

interface SearchBarProps {
	placeholder: string;
	height?: number;
	width?: number;
	inputProps: any;
}
export function SearchBar({
	placeholder, inputProps
}: SearchBarProps) {
	const [isInputFocused, setIsInputFocused] = useState(false);
	const handleInputFocus = () => setIsInputFocused(true);

	const handleInputBlur = () => setIsInputFocused(false);

	return (
		<SearchContainer>
			<SearchIcon visibility={isInputFocused ? 'hidden' : 'visible'}/>
			<SearchInput 
				{...inputProps}
				onFocus={handleInputFocus} 
				onBlur={handleInputBlur} 
				hasIcon = {!isInputFocused}
				placeholder={placeholder}/>
		</SearchContainer>
	);
}