import { useState } from "react";
import { SearchContainer, SearchIcon, SearchInput } from "./SearchBarResults.styled";
import React from "react";

const SearchResultsBar = () => {
	const [isInputFocused, setIsInputFocused] = useState(false);
	const handleInputFocus = () => setIsInputFocused(true);
	const handleInputBlur = () => setIsInputFocused(false);

	return (
		<SearchContainer>
            <SearchIcon
				hasIcon={!isInputFocused}/>
			<SearchInput 
				onFocus={handleInputFocus} 
				onBlur={handleInputBlur} 
				hasIcon={!isInputFocused}
				placeholder="Search results for 'text'"/>
		</SearchContainer>
	);
};

export default SearchResultsBar;
