import styled from "styled-components";
import bgImage from '../imgs/food-bg.png'

export const SearchContainer = styled.div`
    background-image: url(${bgImage}) ;
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

