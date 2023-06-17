import React from "react";
import { FlexCol, TextAreaInput, TextInput, Title} from "./styles/InputField.styled";
import { CheckboxIcon, FlexRow } from "./styles/checkbox.styled";
import { Tooltip } from "react-tooltip";

interface InputFieldProps {
	title: string;
	type?: string;
	tooltip?: string;
	px?: number;
}
  
function InputField({ title, type = 'text', tooltip, px=19}: InputFieldProps) {
  return (
	<FlexCol>
		{tooltip ? (
			<FlexRow>
				<Title>{title}</Title>
				<CheckboxIcon
					px={px}
					data-tooltip-id="checkbox-tooltip"
					data-tooltip-content={tooltip}
					data-tooltip-place="bottom"
					data-tooltip-delay-show={200}>
					?
				</CheckboxIcon>
				<Tooltip id="checkbox-tooltip" />
			</FlexRow>
		) : (
			<Title>{title}</Title>
		)}
		{type === 'textarea' ? (
		  <TextAreaInput maxLength={110} />
		) : (
		  <TextInput type={type} />
		)}
	</FlexCol>
  );
}

export default InputField;