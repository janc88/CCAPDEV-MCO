import styled from "styled-components";
import { BackgroundPic } from "../../styles/BackgroundPic.styled";


export const ProfilePageContainer = styled(BackgroundPic)`

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


export const RightContainer = styled.div`
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


export const EmptyContainer = styled.div`
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



