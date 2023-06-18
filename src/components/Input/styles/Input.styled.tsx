import styled from "styled-components";
import { FlexRight, FlexRow } from "../../../styles/Flex.styled";
import {Error} from '@styled-icons/material'
import {motion} from 'framer-motion'


export const TextInput = styled.input`
	box-sizing: border-box;
	width: 100%;
	border: 1.25px solid black;
	background-color: white;
	padding: 8px;
	height: 45px;
	font-size: 20px;
	font-family: inherit;
`;
export const TextAreaInput = styled.textarea`
  box-sizing: border-box;
  border: 1.25px solid black;
  background-color: white;
  padding: 8px;
  font-size: 20px;
  resize: none;
  height: 100px;
  width: 100%;
  font-family: inherit;
`;

export const LabelContainer = styled(FlexRow)`
	width: 100%;
`
export const Label = styled.div`
	color: #3B3B3B;
	font-size: 19px;
`
export const ErrorIcon = styled(Error)`
	color: red;
`;


export const FramerErrorProps = {
  initial: {
    opacity: 0,
    x: 0,
  },
  animate: {
    opacity: 1,
    x: [-20, 20, -10, 10, 0],
    transition: {
      duration: 0.5,
      type: 'spring',
      stiffness: 1000,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    x: -5,
    transition: {
      duration: 0.2,
    },
  },
};

export const ErrorContainer = styled(FlexRight)`
	flex: 1;
`;
export const FramerError = styled(motion.div).attrs(FramerErrorProps)`

`;

export const ErrorText = styled.div<{px: number}>`
	color: red;
	font-size: ${({px})=>px}px;
	display: inline-block;
`;
export const PwordContainer = styled.div`
	position: relative;
`;
export const PwordToggleContainer = styled.div`
	position: absolute;
	top: 50%;
	right: 10px;
	transform: translateY(-50%);
	cursor: pointer;
`;
  
export const Image = styled.img<{px: number}>`
	width: ${({px})=>px}px;
	height: ${({px})=>px}px;
	object-fit: cover;
	border-radius: 50%;
	border: 3px solid rgb(255, 121, 79);
	border-radius: 30px;
	display: block;
	margin: auto;
`;