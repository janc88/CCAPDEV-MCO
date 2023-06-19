import React, { useState } from "react";
import {
  Logo,
  LogoLink,
  Nav,
  NavSection,
  NavMenu,
  NavbarLink,
} from "./styles/Nav.styled";
import { LogoContainer } from "./styles/NavSearch.styled";
import { Button } from "../../styles/Button.styled";
import logo from "../../imgs/banana.svg";
import UserCard from "./UserCard";
import NavSearch from "./NavSearch";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUtensils, faAddressCard, faPhone } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Nav>
      <LogoContainer>
        <LogoLink to="/home">
          <Logo src={logo} />
        </LogoLink>
        <NavSearch />
      </LogoContainer>

      <NavMenu>
        <NavbarLink to="/">
          <FontAwesomeIcon icon={faHouse} size="lg" fixedWidth />
          <span style={{margin: "0px 0px 0px 5px"}}>Home</span>
        </NavbarLink>

        <NavbarLink to="/restaurants">
          <FontAwesomeIcon icon={faUtensils} size="lg" fixedWidth />
          <span style={{margin: "0px 0px 0px 5px"}}>Restaurants</span>
        </NavbarLink>

        <NavbarLink to="/">
          <FontAwesomeIcon icon={faAddressCard} size="lg" fixedWidth />
          <span style={{margin: "0px 0px 0px 7px"}}>About Us</span>
        </NavbarLink>

        <NavbarLink to="/">
          <FontAwesomeIcon icon={faPhone} size="lg" fixedWidth />
          <span style={{margin: "0px 0px 0px 5px"}}>Contact Us</span>
        </NavbarLink>

      </NavMenu>
      <NavSection>
        {!isLoggedIn ? (
          <>
            <NavbarLink to="/">Log In</NavbarLink>
            <Button bgcolor="white" tcolor="black">
              Sign up
            </Button>
          </>
        ) : (
          <UserCard />
        )}
      </NavSection>
    </Nav>
  );
}

export default Navbar;
