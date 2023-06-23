import styled from "styled-components";

export const SearchPageContainer = styled.div`
  background-color: #FBFBFB;
  height: 100%;
`;

export const Divider = styled.hr`
  border-color: rgb(255, 121, 79);
  background-color: rgb(255, 121, 79);
  width: 50%;
  height: 0.75px;
  margin: 30px auto;
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

    > * {
        border-radius: 0.7rem;
        box-shadow: 6px 7px 14px -2px rgba(0, 0, 0, 0.3);
        background-color: white;
    }
`;

export const RightContainer = styled.div`
    display: flex;
	flex-direction: column;
    flex: 5;
    width: 100%;
    margin: 2rem 1rem;
`;

export const GridContainer = styled.div`
	padding: 30px;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
	grid-gap: 30px;
	justify-items: center;
`;
