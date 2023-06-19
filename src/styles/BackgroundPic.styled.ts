import styled from "styled-components";
import bgImage from '../imgs/food-bg.png'


export const BackgroundPic = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 80px);
    background-image: url(${bgImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
`;