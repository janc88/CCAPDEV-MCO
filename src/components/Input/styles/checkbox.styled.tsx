import styled from "styled-components";
import { QuestionCircle } from "@styled-icons/bootstrap/QuestionCircle";

interface CheckboxProps {
	px: number;
}

export const Check = styled.input.attrs({
	type: 'checkbox'
})<CheckboxProps>`
	width: ${({px})=>px.toString()}px;
	height: ${({px})=>px.toString()}px;
`;
export const TooltipIcon = QuestionCircle;

export const CheckboxLabel = styled.label<CheckboxProps>`
  color: #3B3B3B;
  font-size: ${({px})=>px.toString()}px;
`;
