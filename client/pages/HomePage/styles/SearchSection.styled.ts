import styled from "styled-components";
import bgImage from '../../../imgs/food-bg.png'


export const SearchContainer = styled.div`
    background-image: url(${bgImage}) ;
    background-size: cover;
    background-position: center;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const SearchSectionText = styled.h1`
    font-size: 5rem;
    color: #FFFFFF;
    opacity: 0.9;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: #3B3B3B;
    text-shadow: 5px 5px 10px black;
    top: 0;
    margin: -40px auto 20px;
`;


