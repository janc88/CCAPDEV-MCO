import Modal from "../Modal/Modal";

import {
  DesktopSmallModalContainer,
  Title,
  DeleteText,
} from "./SmallModal.styled";

import { Divider } from "../../pages/styles/LoginPage.styled";
import { useNavigate } from "react-router-dom";
import { CancelButton, SaveButton, SaveCancelButtonContainer } from "../ModalPopups/ModalPopup";
import React from "react";
import {useUserContext} from '../../contexts/UserContext';

interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
  reviewId: string;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({
  onBackdropClick,
  isModalVisible,
  reviewId,
}) => {
  //const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUserContext();

  if (!isModalVisible) {
    return null;
  }

  const cancelModal = () => {
    navigate(0);  
};

const saveModal = async () => {
  const idToDelete = reviewId;

  try {
    const response = await fetch(`http://localhost:8080/api/reviews/${idToDelete}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
	  body: JSON.stringify({ userId: user?.id }),
    });
    if (response.ok) {
      navigate(0);
      console.log("Review deleted");
    } else {
      throw new Error('Failed to delete review');
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <Modal onBackdropClick={onBackdropClick}>
      <DesktopSmallModalContainer>
        <Title>Confirmation</Title>
        <Divider />
        <DeleteText>
          Delete the review? This action CANNOT be undone.
        </DeleteText>
        <SaveCancelButtonContainer>
          <CancelButton onClick={cancelModal}>Cancel</CancelButton>
          <SaveButton onClick={saveModal}>Delete</SaveButton>
        </SaveCancelButtonContainer>
      </DesktopSmallModalContainer>
    </Modal>
  );
};

export default BaseModalWrapper;