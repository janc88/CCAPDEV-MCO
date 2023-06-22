import styled from 'styled-components';
import { Edit, TrashAlt, Image } from '@styled-icons/fa-solid';
import { Button } from "../../styles/Button.styled";

const ModalContainer = styled.div`
  background-color: #F7F7F7;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const DesktopModalContainer = styled(ModalContainer)`
  border-radius: 15px;
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.5);
  padding: 40px;
  height: 800px;
  width: 700px;
  font-size: 26px;
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
  height:30rem;
  
`;

export const ViewCardContainer = styled.div`
  border-radius: 15px;
  box-shadow: 1px 2px 9px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 1px 2px 9px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 1px 2px 9px 0px rgba(0, 0, 0, 0.2);
  background-color: white;
  margin: 1.7rem 1.7rem 0.7rem 1.7rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  height:100%;
  max-height: 700px;
  
`;

export const ReviewCardContainer = styled.div`
  font-size: medium;
  margin-top: 1rem;
  margin-bottom: 1rem;
  overflow-y: auto;
  overflow-x: auto;
  

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  /* Style the scrollbar thumb */
  &::-webkit-scrollbar-thumb {
    background-color: #A7A7A7;
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
    background-color: #A7A7A7;
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
  justify-contet:center;
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
margin-top:0.3rem;
margin-right: 0.5rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: medium;
`;

export const ImageReview = styled.img`
  margin-top: 30px;
  margin-right: 15px; 
  width: 500px;
  height: 275px;
`;

export const EditIcon = styled(Edit)<{ isClicked: boolean }>`
  margin: 0 0.75rem;
  height: 1.5rem;
  width: 1.5rem;

  &:hover {
    color: #ff794f;
  }
`;

export const TrashAltIcon = styled(TrashAlt)<{ isClicked: boolean }>`
  margin: 0 0.75rem;
  height: 1.5rem;
  width: 1.5rem;

  &:hover {
    color: #ff794f;
  }
`;

export const EditDeleteContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 1.5rem;
`;

export const TitleBox = styled.input.attrs({
  type: "text",
  placeholder: "Title",
})`
  width: 90%;
  align-self: flex-start;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 25px;
  margin-top: auto;
  margin-bottom: 1rem;
  margin-left: -0.5rem;
`;

export const DescriptionBox = styled.textarea.attrs({
  placeholder: "Write something about this Restaurant here...",
})`
  width: 95%;
  height: 150px;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 20px;
  margin-left: -0.5rem;
  margin-top: 1.5rem;
  resize: none;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  /* Style the scrollbar thumb */
  &::-webkit-scrollbar-thumb {
    background-color: #A7A7A7;
    border-radius: 5px;
  }

  /* Style the scrollbar on hover */
  &::-webkit-scrollbar-thumb:hover {
    background-color: #757575;
  }
`;

export const ImageIcon = styled(Image)`
  position: relative;
  margin-right: 0.75rem;
  height: 2rem;
  width: 2rem;

  &:hover {
    cursor: pointer;
  }
`;

export const UploadImageButton = styled(Button)`
  background-color: white;
  color: black;
  font-weight: 300;
  border: solid 1px black;
  font-size: small;
  padding: 0.2rem;

  &:hover {
    cursor: pointer;
  }
`;

export const UploadImageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 2rem;
`;

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-top: 0.5rem;
    margin-right: -1.5rem;
`;

export const SaveCancelButtonContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 5rem;
    margin-top: 3.5rem;
`;

export const CancelButton = styled(Button)`
  background-color: white;
  color: #ff794f;
  border: solid 1px #ff794f;
  width: 10rem;
  margin: 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SaveButton = styled(Button)`
  background-color: #ff794f;
  color: white;
  width: 10rem;
  margin: 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #000;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #fff;
`;

export const CloseIcon = styled.span`
  font-size: 14px;
  color: #fff;
`;

export const FileContainer = styled.div`
    max-height: 350px;
    max-width: 550px;
    margin-left: 0.5rem;
`; 

export const ImgCardContainer = styled.div`
  font-size: medium;
  margin-top: 1rem;
  margin-bottom: 1rem;
  overflow-y: auto;
  overflow-x: auto;
  height: 300px;

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

export const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

export const ImgContainer = styled.div`
  flex: 0 0 calc(33.33% - 10px);
  margin-bottom: 10px;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }

  img {
    height: 250px;
    width: 250px;
    object-fit: cover;
  }
`;

export const Uploadtext = styled.div`
  display: inline-block;
  background-color: #f2f2f2;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  border: 2px solid black;
  
`;

export const WriteRating = styled.div`
    display: flex;
    align-items: center;
`;

export const RatingText = styled.text`
    color: #787878;
    margin-left: 15px;
    font-weight: 450;
    margin-top: -12px
`;

export const RatingStar = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;