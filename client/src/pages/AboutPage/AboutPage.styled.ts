import styled from "styled-components";
import bgImage from '../../imgs/food-bg.png'

export const MainContainer = styled.div`
    background-image: url(${bgImage});
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(80vh - 80px);
`;

export const Container = styled.div`
    box-shadow: 6px 7px 14px -2px rgba(0, 0, 0, 0.3);
    border-radius: 1rem;
    overflow: hidden;
    margin: 2rem;
    width: 20rem;
    background-color: white;
`;

export const List = styled.ul`
    font-size: large;
    margin: 1rem 0;
`;

export const ListElement = styled.li`
    margin: 1rem 0.5rem; 
`;

export const Header = styled.div`
    background-color: #FF794F;
    padding: 1rem;
    font-weight: 700;
    font-size: 1.7rem;
`;