import styled from "styled-components";

export const SearchBar = styled.input.attrs({type: "text", placeholder: "Search for your favorite restaurants",})`
    width: 600px;
    background-color: rgba(0, 0, 0, 0.25);
    font-size: medium;
    padding: 20px;
    border-radius: 30px;
    text-align: center;
    transition: .2s ease-in-out 0s;
    outline: none;
    border: none;

    ::-webkit-input-placeholder {
        color: white;
        opacity: 70%;
    }

    &:hover{
        cursor: pointer;
        transform: scale(0.98);
        border-radius: 24px;
        ::-webkit-input-placeholder {
            opacity: 90%;
        }
    }
   
`;