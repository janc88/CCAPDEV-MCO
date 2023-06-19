import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
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
import { UserContext } from "../UserContext/UserContext";

function Navbar() {
  const {user} = useContext(UserContext)
  const navigate = useNavigate()

  return (
    <Nav>
	  <LogoContainer>
		<LogoLink to="/home">
			<Logo src={logo} />
		</LogoLink>
		<NavSearch/>
	  </LogoContainer>

      <NavMenu>
        <NavbarLink to="/">Home</NavbarLink>
        <NavbarLink to="/restaurants">Restaurants</NavbarLink>
        <NavbarLink to="/">About Us</NavbarLink>
        <NavbarLink to="/">Contact Us</NavbarLink>
      </NavMenu>
      <NavSection>
        {!user ? (
          <>
            <NavbarLink to="/login">Log In</NavbarLink>
            <Button bgcolor="white" tcolor="black" onClick={()=>navigate('/signup')}>
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
