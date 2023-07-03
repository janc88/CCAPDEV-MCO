import styled from "styled-components";
import { FlexCol } from "../../styles/Flex.styled";

export const SearchPageContainer = styled.div`
  background-color: #FBFBFB;
  height: 100%;
`;

export const Divider = styled.hr`
  border-color: rgb(255, 121, 79);
  background-color: rgb(255, 121, 79);
  width: 50%;
  height: 0.75px;
  margin: 30px auto 0px;
`;

export const EndDivider = styled.hr`
  border-color: #737373;
  background-color: #737373;
  width: 50%;
  height: 0.75px;
  margin: 20px auto 30px;
`;

export const EndText = styled.div`
  color: #737373;
  font-size: 20px;
  margin: 50px auto 0 auto;
  text-align: center;
`;

export const MainContainer = styled.div`
    display: flex;
`;

export const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    margin: 2rem 1rem;
    height: 400px;
    margin-left: 50px;

    > * {
        border-radius: 0.7rem;
        box-shadow: 6px 7px 14px -2px rgba(0, 0, 0, 0.3);
        background-color: white;
    }
`;

export const RightContainer = styled(FlexCol)`
    display: flex;
	  flex-direction: column;
    flex: 5;
    width: 100%;
    margin: 2rem 1rem;
`;

export const GridContainer = styled.div`
	padding: 0 30px;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
	grid-gap: 30px;
	justify-items: center;
`;