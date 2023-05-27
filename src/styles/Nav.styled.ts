import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
    display: flex;
    height: 60px;
    background-color: red;
    justify-content: space-between;
    padding: 10px;
`;

export const Logo = styled.img.attrs(({src}) => ({src: src}))`
    width: 80px;
`;

export const LogoLink = styled(Link)`
    display: flex;
    align-items: center; 
`;

export const NavbarLink = styled(LogoLink)`
    text-decoration: none;
    font-weight: bold;
    padding: 0 30px;
    color: white;
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: 40px;
`;