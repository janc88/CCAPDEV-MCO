import React, { useState } from "react";
import { SearchContainer, SearchInput, SearchIcon } from "./styles/NavSearch.styled";



const NavSearch = () => {
	const [isInputFocused, setIsInputFocused] = useState(false);

	const handleInputFocus = () => setIsInputFocused(true);

	const handleInputBlur = () => setIsInputFocused(false);

	return (
		<SearchContainer>
			{isInputFocused || <SearchIcon/>}
			<SearchInput 
				onFocus={handleInputFocus} 
				onBlur={handleInputBlur} 
				hasIcon = {!isInputFocused}/>
		</SearchContainer>
	);
};

export default NavSearch;