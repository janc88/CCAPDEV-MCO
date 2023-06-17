import styled from "styled-components";

export const FlexCol = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

export const TextInput = styled.input`
	border: 1.25px solid black;
	background-color: white;
	padding: 8px;
	height: 25px;
	font-size: 20px;
	font-family: inherit;
`
export const TextAreaInput = styled.textarea`
  border: 1.25px solid black;
  background-color: white;
  padding: 8px;
  font-size: 20px;
  resize: none;
  height: 100px;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
`;

export const Title = styled.div`
	color: #3B3B3B;
	font-size: 19px;
`