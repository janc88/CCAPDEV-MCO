import styled from "styled-components";
import { Edit, TrashAlt } from "@styled-icons/fa-solid";

const ModalContainer = styled.div`
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const DesktopModalContainer = styled(ModalContainer)`
  border-radius: 7px;
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.5);
  padding: 40px;
  height: 800px;
  width: 700px;
  font-size: 26px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fade-in 0.1s;

  @keyframes fade-in {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

export const CardContainer = styled.div`
  border-radius: 15px;
  box-shadow: 1px 2px 9px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 1px 2px 9px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 1px 2px 9px 0px rgba(0, 0, 0, 0.2);
  background-color: white;
  margin: 0.7rem 1.7rem 0.7rem 1.7rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 30rem;
`;

export const ReviewCardContainer = styled.div`
  font-size: medium;
  margin-top: 1rem;
  margin-bottom: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  /* Style the scrollbar thumb */
  &::-webkit-scrollbar-thumb {
    background-color: #a7a7a7;
    border-radius: 5px;
  }
  /* Style the scrollbar on hover */
  &::-webkit-scrollbar-thumb:hover {
    background-color: #757575;
  }
`;

export const HeaderReview = styled.div`
  background-color: #ff794f;
  display: flex;
  font-weight: 700;
  font-size: 2rem;
  padding: 1.1rem 2rem;
  width: 102.25%;
  margin-top: -40px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const Response = styled.div`
  border-radius: 15px;
  box-shadow: 1px 2px 9px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 1px 2px 9px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 1px 2px 9px 0px rgba(0, 0, 0, 0.2);
  background-color: white;
  margin: 0.7rem 1.7rem 0rem 1.7rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 10rem;
  font-size: medium;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  /* Style the scrollbar thumb */
  &::-webkit-scrollbar-thumb {
    background-color: #a7a7a7;
    border-radius: 5px;
  }
  /* Style the scrollbar on hover */
  &::-webkit-scrollbar-thumb:hover {
    background-color: #757575;
  }
`;

export const HeaderResponse = styled.div`
  background-color: #ff794f;
  display: flex;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 0.75rem 1rem;
  width: 100%;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  margin-top: -20px;
  margin-left: -1rem;
  margin-bottom: 10px;
  color: white;
  justify-content: center;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 1rem 0;
`;

export const ResponseText = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  color: #ff794f;
  margin-bottom: 0.75rem;
`;

export const LineBreak = styled.hr`
  flex-grow: 0.1;
  width: 90%;
  background-color: #ff794f;
  margin-top: 1rem;
  margin-bottom: 5px;
  border: 0;
  border-top: 1px solid #ff794f;
`;

export const RestoAvatar = styled.img`
  border-radius: 50%;
  height: 1.5rem;
  width: 1.5rem;
  margin-top: 0.3rem;
  margin-right: 0.5rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: medium;
`;

export const Image = styled.img`
  margin-top: 30px;
  margin-right: 15px; /* Adjust the spacing between images */
  max-width: 100%;
  max-height: 150px; /* Adjust the maximum height of the image */
`;

export const EditIcon = styled(Edit)<{ isClicked: boolean }>`
  margin: 0 0.3rem;
  color: ${({ isClicked }) => (isClicked ? "#ff794f" : "black")};
  height: 1.3rem;
  width: 1.3rem;
  &:hover {
    color: #ff794f;
  }
`;

export const TrashAltIcon = styled(TrashAlt)<{ isClicked: boolean }>`
  margin: 0 0.3rem;
  color: ${({ isClicked }) => (isClicked ? "#ff794f" : "black")};
  height: 1.3rem;
  width: 1.3rem;
  &:hover {
    color: #ff794f;
  }
`;

export const EditDeleteContainer = styled.div;
