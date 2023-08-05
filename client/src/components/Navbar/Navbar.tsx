import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Logo,
  LogoLink,
  Nav,
  NavSection,
  NavMenu,
  NavbarLink,
  NavButton,
  Title,
  Title1,
  Title2
} from "./styles/Nav.styled";
import { LogoContainer } from "./styles/NavSearch.styled";
import { Button } from "../../styles/Button.styled";
import logo from "../../imgs/banana.svg";
import UserCard from "./UserCard";
import NavSearch from "./NavSearch";
import { useUserContext } from "../../contexts/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUtensils,
  faAddressCard,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  return (
    <Nav>
      <LogoContainer>
        <LogoLink to="/home">
          <Logo src={logo} />
        </LogoLink>
        <Title>
          <Title1>Resto</Title1>
          <Title2>Rant</Title2>
        </Title>
        <NavSearch />
      </LogoContainer>

      <NavMenu>
        <NavbarLink to="/">
          <FontAwesomeIcon icon={faHouse} size="lg" fixedWidth />
          <NavButton marginleft={5}>Home</NavButton>
        </NavbarLink>
        <NavbarLink to="/search-restaurants/all">
          <FontAwesomeIcon icon={faUtensils} size="lg" fixedWidth />
          <NavButton marginleft={5}>Restaurants</NavButton>
        </NavbarLink>
        <NavbarLink to="/about">
          <FontAwesomeIcon icon={faAddressCard} size="lg" fixedWidth />
          <NavButton marginleft={7}>About</NavButton>
        </NavbarLink>
        <NavbarLink to="/">
          <FontAwesomeIcon icon={faPhone} size="lg" fixedWidth />
          <NavButton marginleft={5}>Contact Us</NavButton>
        </NavbarLink>
      </NavMenu>
      <NavSection>
        {!user ? (
          <>
            <NavbarLink to="/login">Log In</NavbarLink>
            <Button
              bgcolor="white"
              tcolor="black"
              onClick={() => navigate("/signup")}
            >
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
