import styled from 'styled-components';
import { Edit } from '@styled-icons/fa-solid';

export const EditReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  margin: auto;
  height: 83vh; /* Adjust the height as needed */
  width: 800px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const HeaderReview = styled.div`
  background-color: #ff794f;
  display: flex;
  font-weight: 700;
  font-size: 2rem;
  padding: 1.1rem 2rem;
  width: 736px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  margin-top: -1px; /* Adjust the margin-top as needed */
`;

export const Subheader = styled.span`
  font-weight: 700;
  font-size: 2rem;
  margin-top: 1.5rem;
  text-align: left; /* Add this line to align the subheaders to the left */
  margin-left: 1.75rem;
`;

export const InputBox = styled.textarea`
  width: 90%;
  height: 30px;
  margin-top: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  resize: none; /* Change 'none' to 'none' to prevent resizing */
  margin-left: 1.75rem;
  overflow-y:auto;

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

export const TextArea = styled.textarea`
  width: 90%;
  height: 150px;
  margin-top: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  resize: none; /* Change 'vertical' to 'none' to prevent resizing */
  margin-left: 1.75rem;
  overflow-y:auto;

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

export const EditIcon = styled(Edit)`
  margin-left: 1rem;
  margin-top: -0.75rem;
  height: 2rem;
  width: 2rem;
`;

export const ImageReviewContainer = styled.div`
  margin-left: 1.4rem;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const ImageReview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.3rem;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: black;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  z-index: 1;
`;

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-top: 2.5rem;
    margin-bottom: 1.5rem;
    margin-right: 1rem;
`;



