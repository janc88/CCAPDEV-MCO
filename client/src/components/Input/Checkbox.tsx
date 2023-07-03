import { Check, CheckboxLabel } from './styles/checkbox.styled'
import { FlexRow } from "../../styles/Flex.styled";
import { Tooltip } from './Tooltip';
import { useFormContext } from "react-hook-form";

interface CheckboxProps {
	id: string,
	name?: string,
	label: string,
	labelSize: number,
	tooltip?: string,
}

function Checkbox({id, tooltip, label, labelSize, name=id}: CheckboxProps) {
  
	const { register } = useFormContext();
  	return (
		<FlexRow>
			<Check id={id}
				px={labelSize}
				{...register(name)}/>
			<CheckboxLabel 
				px={labelSize}
				htmlFor={id}>{label}</CheckboxLabel>
			{tooltip && <Tooltip text={tooltip} size={labelSize}/>}
		</FlexRow>
  	);
}

export default Checkbox;
