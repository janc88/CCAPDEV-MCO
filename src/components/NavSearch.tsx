import React, { useState } from "react";
import { MainContainer, SearchContainer, SearchInput, SearchIcon } from "../styles/NavSearch.styled";
import { Logo, LogoLink } from "../styles/Nav.styled";
import logo from "../imgs/banana.svg";



const NavSearch = () => {
	const [isInputFocused, setIsInputFocused] = useState(false);

	const handleInputFocus = () => setIsInputFocused(true);

	const handleInputBlur = () => setIsInputFocused(false);

	return (
		<MainContainer>
			<LogoLink to="/home">
				<Logo src={logo} />
			</LogoLink>
			<SearchContainer>
				{isInputFocused || <SearchIcon/>}
				<SearchInput 
					onFocus={handleInputFocus} 
					onBlur={handleInputBlur} 
					hasIcon = {!isInputFocused}/>
			</SearchContainer>
		</MainContainer>
	);
};

export default NavSearch;
