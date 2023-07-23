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

interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({
  onBackdropClick,
  isModalVisible,
}) => {
  //const location = useLocation();
  const navigate = useNavigate();

  if (!isModalVisible) {
    return null;
  }

  const cancelModal = () => {
    navigate(0);  
};

  const saveModal = () => {
    navigate(0);
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