import { useFormContext, RegisterOptions, FieldValues } from 'react-hook-form'
import { AnimatePresence } from 'framer-motion'
import { FlexCol } from '../../styles/Flex.styled';
import { 
	FramerError, 
	ErrorIcon, 
	ErrorText, 
	Label, 
	LabelContainer, 
	TextAreaInput, 
	TextInput, 
	ErrorContainer
} from './styles/Input.styled';

import {Tooltip} from './Tooltip';
import Checkbox from './Checkbox';
import { PasswordInput } from './PasswordInput';
import { ImageInput } from './InageInput';

export {Tooltip};
export {Checkbox};
export {PasswordInput};
export {ImageInput}

interface InputProps {
	id: string;
	label: string;
	name?: string;
	type?: string;
	tooltip?: string;
	px?: number;
	validation?: RegisterOptions<FieldValues, string>;
}
export function Input({
	id,
	label,
	name = id,
	type = 'text',
	tooltip = '',
	validation,
	px = 19
}: InputProps) {
	const {
		register,
		formState: {errors},
	} = useFormContext();

	const errmsg = errors[name]?.message;
	return (
	  <FlexCol>
		<LabelContainer htmlFor={id}>
		  <Label>{label}</Label>
		  {tooltip && <Tooltip size={px} text={tooltip}/>}
		  <ErrorContainer>
		    <AnimatePresence mode='sync'>
			{errmsg && (
			  <FramerError key='inputerr'>
				<ErrorIcon size={px * 0.75}/>
				<ErrorText px={px * 0.75}>
				  {errmsg.toString()}
				</ErrorText>
			  </FramerError>
			)}
		    </AnimatePresence>
		  </ErrorContainer>
		</LabelContainer>
		{type === 'textarea' ? (
		  <TextAreaInput 
			maxLength={110} 
			id={id}
			{...register(name, validation)}/>
		) : type === 'password' ? (
		  <PasswordInput 
			id={id} name={name}
			register={register}
			validation={validation}
			px={px}/>
		) : (
		  <TextInput 
			type={type} 
			id={id}
			{...register(name, validation)}/>
		)}
	  </FlexCol>
	)
}
