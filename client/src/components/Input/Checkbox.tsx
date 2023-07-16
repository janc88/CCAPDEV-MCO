import { Check, CheckboxContainer, CheckboxLabel } from './styles/checkbox.styled'
import { Tooltip } from './Tooltip';
import { useFormContext } from "react-hook-form";
import React from 'react';

interface CheckboxProps {
	id: string,
	name?: string,
	label: string,
	labelSize: string,
	tooltip?: string,
}

function Checkbox({id, tooltip, label, labelSize, name=id}: CheckboxProps) {
  
	const { register } = useFormContext();
  	return (
		<CheckboxContainer>
			<Check id={id}
				px={labelSize}
				{...register(name)}/>
			<CheckboxLabel 
				px={labelSize}
				htmlFor={id}>{label}</CheckboxLabel>
			{tooltip && <Tooltip text={tooltip} size={labelSize}/>}
		</CheckboxContainer>
  	);
}

export default Checkbox;
