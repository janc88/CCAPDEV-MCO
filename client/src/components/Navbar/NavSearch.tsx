import React, { useState, useEffect } from "react";
import {
  SearchContainer,
  SearchInput,
  SearchIcon,
} from "./styles/NavSearch.styled";
import { useNavigate, useLocation } from "react-router-dom";

const NavSearch = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const location = useLocation();

  const handleInputFocus = () => setIsInputFocused(true);

  const handleInputBlur = () => setIsInputFocused(false);

  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const isBlankOrSpaces = (str) => {
    return str.trim() === "";
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !isBlankOrSpaces(inputValue)) {
      navigate(`/search-restaurants/${inputValue}`);
	  setInputValue("");	
    }
  };

  useEffect(() => {
    setInputValue('');
  }, [location]);

  return (
    <SearchContainer>
      <SearchIcon hasFocus={isInputFocused} />
      <SearchInput
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        hasFocus={isInputFocused}
		value={inputValue}
        onChange={handleInputChange}
		onKeyDown={handleKeyPress}
      />
    </SearchContainer>
  );
};

export default NavSearch;
