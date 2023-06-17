import React from "react";
import { 
	PageContainer, 
	Card, 
	Title, 
	Divider,
	RightText,
	Send
} from "./styles/LoginPage.styled";
import InputField from "./InputField";
import Checkbox from "./Checkbox";

function LoginPage() {
  return (
    <PageContainer>
		<Card>
			<Title>
				Log In
			</Title>
			<Divider/>
			<InputField title="Username"/>
			<InputField title="Password" type="password"/>
			<div>
				<Checkbox 
					tooltip="Stay logged in" 
					label="Remember me"
					labelSize={19}/>
				<RightText>
					Don't have an account?
				</RightText>
			</div>
			<Send>
				Log In
			</Send>
		</Card>
	</PageContainer>
  );
}

export default LoginPage;
