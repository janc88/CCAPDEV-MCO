import styled from "styled-components";
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'


export const MainContainer = styled(motion.div)`
    margin-top: 4px;
    margin-right: 1rem;
    background-color: white;
    color: black;
    /* border-radius: 27px; */
    overflow: hidden;
    position: relative;
`;

export const UserCardContainer = styled(motion.div)`
    display: flex;
    border-radius: 27px;
    box-shadow: 3px 5px 12px -4px rgba(0,0,0,0.43);
    -webkit-box-shadow: 3px 5px 12px -4px rgba(0,0,0,0.43);
    -moz-box-shadow: 3px 5px 12px -4px rgba(0,0,0,0.43);
    cursor: pointer;
`;

export const UserOptionsContainer = styled(motion.div)`
    padding: 4px 25px; 
`;

export const UserOption = styled(motion.div)`
    margin: 0.7rem 0;
`;

export const UserName = styled(motion.div)`
    text-align: center;
    font-weight: bold;
    padding: 15px 12px 15px 25px; 
    user-select: none;
    min-width: 5.5rem;
`;

export const UserLink = styled(Link)`
    display: flex;
    align-items: center; 
    text-decoration: none;
    color: black;

    &:hover{
        color: #FF794F;
    }
`;

export const ProfilePic = styled(motion.img).attrs(({src}) => ({src: src}))`
    border-radius: 50%;
    width: 47px;
    height: 47px;
    border: 1px solid #555;
    object-fit: cover;
`;