import Modal from "../Modal/Modal";

import {
  DesktopSmallModalContainer,
  Title,
  BodyText,
  DeleteText,
} from "./SmallModal.styled";

import { Divider, SideText, Send } from "../../pages/styles/LoginPage.styled";
import { useLocation, useNavigate } from "react-router-dom";
import { FlexRight } from "../../styles/Flex.styled";
import { ButtonContainer, CancelButton, SaveButton, SaveCancelButtonContainer } from "../ModalPopups/ModalPopup";
import React from "react";

interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({
  onBackdropClick,
  isModalVisible,
}) => {
  const location = useLocation();
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