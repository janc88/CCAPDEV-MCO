import styled from "styled-components";

interface CheckboxProps {
	px: number;
}

export const FlexRow = styled.label`
	display: flex;
	align-items: center;
	gap: 5px;
`;

export const Check = styled.input.attrs({
	type: 'checkbox'
})<CheckboxProps>`
	width: ${({px})=>px.toString()}px;
	height: ${({px})=>px.toString()}px;
`;

export const CheckboxIcon = styled.div<CheckboxProps>`
  text-align: center;
  width: ${({px}) => px.toString()}px;
  height: ${({px}) => px.toString()}px;
  font-size: ${({px}) => (px*0.75).toString()}px;
  border: 1px solid black;
  border-radius: 50%;
  position: relative;
  user-select: none;
  cursor: pointer;
`;

export const CheckboxLabel = styled.span<CheckboxProps>`
  color: #3B3B3B;
  font-size: ${({px})=>px.toString()}px;
`;