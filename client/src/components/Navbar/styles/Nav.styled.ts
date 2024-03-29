import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
    display: flex;
    height: 60px;
    background-color: #FF794F;
    justify-content: space-between;
    padding: 10px;
    overflow: visible;
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

	transition: background-color 0.5s;
	&:hover {
		//background-color: rgba(0, 0, 0, 0.2);
		transform: scale(1.05);
	}
`;


export const NavSection = styled.div`
    display: flex;
    margin-right: 1rem;
    /* align-items: center; */
`;

export const NavMenu = styled(NavSection)`
    margin-left: -8rem;
`;


interface NavButtonProps {
    marginleft: number;
}

export const NavButton = styled.span<NavButtonProps>`
    margin-left: ${({marginleft}) => `${marginleft}px`}
`;

export const Title = styled.div`
    font-size: 2rem;
    font-weight: 700;
    color: #FF794F;
    margin: auto 10px auto -10px;
`;

export const Title1 = styled.div`
    color: rgb(50,50,50);
    display: inline;
`;

export const Title2 = styled.div`
    color: white;
    display: inline;
`;