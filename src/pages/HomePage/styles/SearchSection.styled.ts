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
    font-size: 3rem;
`;


