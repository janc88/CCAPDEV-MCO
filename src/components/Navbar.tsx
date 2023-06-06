import React, {useState} from 'react';
import { Logo, LogoLink, Nav, NavSection, NavMenu, NavbarLink } from '../styles/Nav.styled';
import { Button } from '../styles/Button.styled';
import logo from '../imgs/banana.svg'
import UserCard from './UserCard';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Nav>        
        <LogoLink to='/home'>
            <Logo src={logo}/>
        </LogoLink>
        
        <NavMenu>
            <NavbarLink to='/'>
                Home
            </NavbarLink>
            <NavbarLink to='/'>
                Restaurants
            </NavbarLink>
            <NavbarLink to='/'>
                About Us
            </NavbarLink>
            <NavbarLink to='/'>
                Contact Us
            </NavbarLink>
        </NavMenu>
        <NavSection>

            {!isLoggedIn ?
            <>
                <NavbarLink to='/'>
                    Log In
                </NavbarLink>
                <Button bgcolor="white" tcolor="black">
                    Sign up
                </Button> 
            </>
            :
            <UserCard/>}

        </NavSection>
        
    </Nav>
  );
}

export default Navbar;