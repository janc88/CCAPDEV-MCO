import styled from "styled-components";
import { Button } from "../../styles/Button.styled";
import { BackgroundPic } from "../../styles/BackgroundPic.styled";

export const PageContainer = styled(BackgroundPic)`
	overflow: auto;
`;
export const CenterContainer = styled.div`
	margin: auto;
`;

export const Card = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 30px;

	width: 630px;
	height: fit-content;

	padding: 45px 32px;
	box-sizing: border-box;
	
	border-radius: 0.7rem;
	box-shadow: 6px 7px 14px -2px rgba(0, 0, 0, 0.3);
	background-color: #FBFBFB;
	
	margin: 80px;
`;


export const Divider = styled.hr`
  border-color: rgb(255, 121, 79);
  background-color: rgb(255, 121, 79);
  width: 100%;
  height: 0.75px;
  margin: 0.6rem 0;
`;

export const Title = styled.div`
	margin: 0 auto;
	font-weight: bold;
	font-size: 60px;
`;
export const SideText = styled.div`
	text-decoration: underline;
	cursor: pointer;
	font-size: 16px;
	display: inline-block;
`;

export const Send = ({ ...props }) => (
	<Button 
		bgcolor={'rgb(255, 121, 79)'} 
		tcolor={'white'} 
		style={{
			width: '300px', 
			margin: '0 auto',
			marginTop: '15px'
		}}
		{...props} />
);

export const ActionsContainer = styled.div`
	display: flex;
	width: 100%;
`;


export const ActionCancel = ({ ...props }) => (
	<Button 
		bgcolor={'white'} 
		tcolor={'rgb(255, 121, 79)'}
		style={{
			width: '40%',
			marginRight: 'auto',
			outline: '3.5px solid rgb(255, 121, 79)',
			boxSizing: 'border-box'
		}}
		{...props} />
);


export const ActionNext = ({ ...props }) => (
	<Button 
		bgcolor={'rgb(255, 121, 79)'} 
		tcolor={'white'} 
		style={{
			width: '40%',
			marginLeft: 'auto'
		}}
		{...props} />
);
