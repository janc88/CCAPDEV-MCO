import styled from "styled-components";

export const SmallModalContainer = styled.div`
  background-color: #F7F7F7;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const DesktopSmallModalContainer = styled(SmallModalContainer)`
  border-radius: 15px;
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.5);
  padding: 40px;
  height: 300px;
  width: 500px;
  font-size: 26px;
`;

export const Title = styled.div`
	font-weight: bold;
	font-size: 60px;
`;

export const BodyText = styled.div`
	font-size: 1.3rem;
	display: inline-block;
    margin-bottom: 15px;
`;