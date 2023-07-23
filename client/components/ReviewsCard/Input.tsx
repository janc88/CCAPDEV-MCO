import React, { useState } from "react";
import styled from "styled-components";
import { Search } from "@styled-icons/fa-solid";

export const SearchContainer = styled.label`
	display: flex;
	justify-content: flex-end;
	flex: 1;
	margin-left: 20%;

	background-color: white;
	color: black;
	border-radius: 27px;
	overflow: hidden;
`;
export const SearchIcon = styled(Search)`
	width: 28px;
	height: 28px;
	padding: 4px;
	margin-left: 25px;
`;
interface SearchInputProps {
	hasFocus: boolean;
}
export const SearchInput = styled.input.attrs({
	type: "text"
})<SearchInputProps>`
	width: 100%;
	background-color: rgba(0, 0, 0, 0);
	margin-left: ${({hasFocus}) => hasFocus ? '25px' : '-32px'};
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

export const SearchBarContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 5px;
	flex: 1;
	align-items: center;
	margin-right: 20%;
`
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
				hasFocus = {!isInputFocused}
				placeholder={placeholder}/>
		</SearchContainer>
	);
}
