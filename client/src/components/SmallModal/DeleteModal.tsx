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
import { useReviewActions } from "../../contexts/ReviewHook";

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
  const { deleteReview } = useReviewActions();

  if (!isModalVisible) {
    return null;
  }

  const cancelModal = () => {
    navigate(0);  
};

const saveModal = async () => {
  const success = await deleteReview(reviewId);
  if (success) {
	navigate(0);
	console.log("Review deleted");
  } else {
	throw new Error('Failed to delete review');
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