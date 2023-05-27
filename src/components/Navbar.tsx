import React from 'react';
import { Logo, LogoLink, Nav, NavMenu, NavbarLink } from '../styles/Nav.styled';
import { Button } from '../styles/Button.styled';
import logo from '../imgs/banana.svg'

function Navbar() {
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
        <Button color="green">
            Sign up
        </Button>
    </Nav>
  );
}

export default Navbar;