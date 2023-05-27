import styled from "styled-components";

export const UserCardContainer = styled.div`
    display: flex;
    background-color: white;
    color: black;
    border-radius: 30px;
`;

export const UserName = styled.div`
    font-weight: bold;
    padding: 10px 12px 10px 25px;
`;

export const ProfilePic = styled.img.attrs(({src}) => ({src: src}))`
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: 1px solid #555;
`;