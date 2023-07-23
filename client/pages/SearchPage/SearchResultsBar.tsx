import { useState } from "react";
import {
  SearchContainer,
  SearchIcon,
  SearchInput,
} from "./SearchBarResults.styled";
import React from "react";
import { useParams } from "react-router-dom";

const SearchResultsBar = () => {
  const { query } = useParams<{ query: string }>();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const handleInputFocus = () => setIsInputFocused(true);
  const handleInputBlur = () => setIsInputFocused(false);

  return (
    <SearchContainer>
      <SearchIcon hasIcon={!isInputFocused} />
      <SearchInput onFocus={handleInputFocus} onBlur={handleInputBlur}>
        {query === "all" ? "All restaurants" : `Search results for "${query}"`}
      </SearchInput>
    </SearchContainer>
  );
};

export default SearchResultsBar;
