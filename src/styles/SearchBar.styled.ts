import styled from "styled-components";

interface SearchBarProps {
    hasInput: boolean;
}

export const SearchBar = styled.input.attrs({type: "text", placeholder: "Search for your favorite restaurants",})<SearchBarProps>`
    width: 600px;
    background-color: ${({hasInput}) => hasInput ? 'rgba(255, 121, 79, 0.7)' : 'rgba(140, 133, 133, 0.7)'};
    font-size: large;
    padding: 15px;
    border-radius: 40px;
    text-align: center;
    transition: .2s ease-in-out 0s;
    outline: none;
    border: ${({hasInput}) => hasInput ? '2px solid' : 'none'};;
    color: white;
    font-weight: 700;

    ::-webkit-input-placeholder {
        font-weight: 150;
        color: white;
        opacity: 70%;
    }

    &:hover{
        cursor: pointer;
        transform: scale(0.98);
        border-radius: 32px;
        ::-webkit-input-placeholder {
            opacity: 90%;
        }
    }
   
`;