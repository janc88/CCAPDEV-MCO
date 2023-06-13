import React, { useState } from "react";
import { SearchBar } from "../../styles/SearchBar.styled";
import {
  SearchContainer,
  SearchSectionText,
} from "./styles/SearchSection.styled";

function SearchSection() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <SearchContainer>
      <SearchSectionText>yum yum for my tum</SearchSectionText>
      <SearchBar
        value={inputValue}
        onChange={handleInputChange}
        hasInput={inputValue.length > 0}
      />
    </SearchContainer>
  );
}

export default SearchSection;
