import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../styles/SearchBar.styled";
import {
  SearchContainer,
  SearchSectionText,
} from "./styles/SearchSection.styled";

function SearchSection() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const isBlankOrSpaces = (str) => {
    return str.trim() === '';
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !isBlankOrSpaces(inputValue)) {
      navigate(`/search-restaurants/${inputValue}`)
    }
  };

  return (
    <SearchContainer>
      <SearchSectionText>Where to grab a bite next?</SearchSectionText>
      <SearchBar
        value={inputValue}
        onChange={handleInputChange}
        hasInput={inputValue.length > 0}
        onKeyDown={handleKeyPress}
      />
    </SearchContainer>
  );
}

export default SearchSection;
