import styled from "styled-components";

export const SmallModalContainer = styled.div`
  background-color: #F7F7F7;
  display: flex;
  flex-direction: column;
  position: relative;
  animation: slide-in 0.2s;

  @keyframes slide-in {
    0% {transform: translateY(150px);}
    50% {transform: translateY(-20px)}
    100% {transform: translateY(0px);}
  }
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

export const DeleteText = styled.div`
  font-size: 1.8rem;
  display: inline-block;
  margin-top: 15px;
`;
