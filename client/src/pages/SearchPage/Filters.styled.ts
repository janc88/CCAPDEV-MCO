import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  padding-bottom: 1rem;
`;

export const Header = styled.div`
  width: 100%;
  background-color: #ff794f;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 0.9rem;
  padding-left: 4rem;
  box-shadow: 6px 7px 14px -2px rgba(0, 0, 0, 0.1);
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  margin: 0.2rem 0;
  font-size: large;
  cursor: pointer;
`;

export const Input = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #FF794F;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  margin-right: 8px;

  &:checked {
    background-color: #FF794F; /* Add the background color for the checked state */
  }

  &:checked::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #333;
  } 
`;
