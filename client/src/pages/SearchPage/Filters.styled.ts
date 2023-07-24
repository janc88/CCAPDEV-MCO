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
  margin: 0.4rem 0;
  font-size: large;
  cursor: pointer;
`;

interface InputProps {
  isChecked?: boolean;
}

export const RadioBox = styled.div`
  height: 1.125rem;
  width: 1.125rem;
  border: 1px solid  #FF794F;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 0.4rem;
  transition: background 0.15s, border-color 0.15s;
  padding: 2px;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
    background: #FF794F;
    border-radius: 50%;
    cursor: pointer;
    transform: scale(0);
  }
`;

export const Input = styled.input<InputProps>`
  display: none;
  &:checked + ${RadioBox} {
      &::after {
        transform: scale(1);
      }
  }
`;