import styled from "styled-components";
import { QuestionCircle } from "@styled-icons/bootstrap/QuestionCircle";

interface CheckboxProps {
	px: string;
}
export const CheckboxContainer = styled.label`
	display: flex;
	align-items: center;
	gap: 5px;
`;
export const Check = styled.input.attrs({
	type: 'checkbox'
})<CheckboxProps>`
	width: ${({px})=>px};
	height: ${({px})=>px};
`;
export const TooltipIcon = QuestionCircle;

export const CheckboxLabel = styled.label<CheckboxProps>`
  color: #3B3B3B;
  font-size: ${({px})=>px};
`;
