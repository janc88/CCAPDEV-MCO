import styled from "styled-components";
import bgImage from '../imgs/food-bg.png'

export const RestaurantPageContainer = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 80px);
    background-image: url(${bgImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
`;

export const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1.5;
    width: 100%;
    margin: 2rem 1rem;

    > * {
        border-radius: 0.7rem;
        box-shadow: 6px 7px 14px -2px rgba(0, 0, 0, 0.3);
        background-color: white;
    }
`;

export const MiddleContainer = styled.div`
    display: flex;
    flex: 3;
    width: 100%;
    margin: 2rem 1rem;

    > * {
        border-radius: 0.7rem;
        box-shadow: 6px 7px 14px -2px rgba(0, 0, 0, 0.3);
        background-color: white;
    }
`;

export const RightContainer = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    margin: 2rem 1rem;

    > * {
        border-radius: 0.7rem;
        box-shadow: 6px 7px 14px -2px rgba(0, 0, 0, 0.3);
        background-color: white;
    }
`;