import { useState } from "react";
import { 
	PageContainer, 
	Card, 
	Title, 
	Divider,
	RightText,
	ActionsContainer,
	ActionCancel,
	ActionNext
} from "./styles/LoginPage.styled";
import InputField from "./InputField";
import Checkbox from "./Checkbox";
import { ProfilePicture } from "./styles/SigninPage.styled";
import pfp from '../../../src/imgs/banana.svg'

function SignupPage() {
	const [currentCard, setCurrentCard] = useState(0);

	const handleNextClick = () => {
		setCurrentCard((prevCard) => prevCard + 1);
	};
	const handlePreviousClick = () => {
		setCurrentCard((prevCard) => prevCard - 1);
	};
  return (
    <PageContainer>
			{currentCard === 0 &&
			<Card>
				<Title>
					Sign Up
				</Title>
				<Divider/>
				<InputField title="Username"/>
				<InputField title="Password" type="password"/>
				<InputField title="Confirm Password" type="password"/>
				<RightText>
					Already have an account?
				</RightText>
				<ActionsContainer>
					<ActionNext onClick={handleNextClick}>
						Next
					</ActionNext>
				</ActionsContainer>
			</Card>
			}
			{currentCard === 1 &&
			<Card>
				<Title>
					Sign Up
				</Title>
				<Divider/>
				<ProfilePicture src={pfp} px={200}/>
				<InputField 
					title="Account Description" 
					type="textarea"
					tooltip="Max of 110 characters"/>
				<div>
					<Checkbox 
						tooltip="Stay logged in" 
						label="Remember me"
						labelSize={19}/>
					<RightText>
						Already have an account?
					</RightText>
				</div>
				<ActionsContainer>
					<ActionCancel onClick={handlePreviousClick}>
						Cancel
					</ActionCancel>
					<ActionNext>
						Next
					</ActionNext>
				</ActionsContainer>
			</Card>
			}
	</PageContainer>
  );
}

export default SignupPage;
