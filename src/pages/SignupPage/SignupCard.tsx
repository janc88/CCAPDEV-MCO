import React from "react";
import { 
	Card, 
	Title, 
	Divider,
	SideText,
	ActionsContainer,
	ActionCancel,
	ActionNext
} from "../styles/LoginPage.styled";
import default_pfp from '../../../src/imgs/banana.svg'
import { useNavigate } from "react-router-dom";
import { FlexRight } from "../../styles/Flex.styled";
import { FormProvider, useForm } from "react-hook-form";
import { confirmPwdValidation, passwordValidation, usernameValidation } from "./validations";
import { ImageInput, Input } from "../../components/Input/Input";
import Checkbox from "../../components/Input/Checkbox";

interface CardProps {
	values: any;
	onSubmit: (a: any)=>void;
	onPrev?: (a: any)=>void;
}

export const SignupCard: React.FC<CardProps> = ({ onSubmit, values}) => {
	const navigate = useNavigate();
	const form = useForm({values: values});
	const handleSubmit = form.handleSubmit(data => onSubmit(data))

	return (
	  <FormProvider {...form}>
		<form
		  onSubmit={e => e.preventDefault()}
		  noValidate autoComplete="off">
		  <Card>
			<Title>
			  Sign Up
			</Title>
			<Divider />
			<Input
			  id='username'
			  label='Username'
			  validation={usernameValidation} />
			<Input
			  id='password'
			  type='password'
			  label='Password'
			  validation={passwordValidation} />
			<Input
			  id='confirm_password'
			  type='password'
			  label='Confirm Password'
			  validation={confirmPwdValidation(form)} />
			<FlexRight>
			  <SideText onClick={() => navigate('/login')}>
				Already have an account?
			  </SideText>
			</FlexRight>
			<ActionsContainer>
			  <ActionNext onClick={handleSubmit}>
				Next
			  </ActionNext>
			</ActionsContainer>
		  </Card>
		</form>
	  </FormProvider>
	);
}

export const SignupDetailsCard: React.FC<CardProps> = ({ onSubmit, onPrev, values }) => {
	const navigate = useNavigate();
	const form = useForm({values});

	const handleSubmit = form.handleSubmit(data => onSubmit(data))
	const handlePrev = () => onPrev?.(form.getValues())

	return (
	  <FormProvider {...form}>
		<form
		  onSubmit={e => e.preventDefault()}
		  noValidate autoComplete="off">
		  <Card>
			<Title>
			  Sign Up
			</Title>
			<Divider />
			<ImageInput
			  id='profilepicture' 
			  px={200}
			  defaultSrc={default_pfp} />
			<Input
			  label="Account Description (Max of 100 characters)"
			  id="accountdesc"
			  type="textarea"
			  tooltip="Other users will be able to view your description." />
			<div>
			  <Checkbox
			  	id='stayLoggedIn'
				tooltip="Stay logged in"
				label="Remember me"
				labelSize={19} />
			  <FlexRight>
				<SideText onClick={() => navigate('/login')}>
				  Already have an account?
				</SideText>
			  </FlexRight>
			</div>
			<ActionsContainer>
			  <ActionCancel onClick={handlePrev}>
				Cancel
			  </ActionCancel>
			  <ActionNext onClick={handleSubmit}>
				Submit
			  </ActionNext>
			</ActionsContainer>
		  </Card>
		</form>
	  </FormProvider>
	);
}