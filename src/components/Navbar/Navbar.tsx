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
        <NavbarLink to="/">Home</NavbarLink>
        <NavbarLink to="/restaurants">Restaurants</NavbarLink>
        <NavbarLink to="/">About Us</NavbarLink>
        <NavbarLink to="/">Contact Us</NavbarLink>
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
