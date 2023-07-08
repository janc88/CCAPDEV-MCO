import Modal from "../Modal/Modal";
import {
  DesktopSmallModalContainer,
  Title,
  DeleteText,
} from "./SmallModal.styled";

import { Divider } from "../../pages/styles/LoginPage.styled";
import { CancelButton, SaveButton, SaveCancelButtonContainer } from "../ModalPopups/ModalPopup";
import React from "react";

interface PopupProps {
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
}

const SimplePopup: React.FC<PopupProps> = ({
  onCancel, onConfirm,
  title, content,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  return (
    <Modal onBackdropClick={onCancel}>
      <DesktopSmallModalContainer>
        <Title>{title}</Title>
        <Divider />
        <DeleteText>
          {content}
        </DeleteText>
        <SaveCancelButtonContainer>
          <CancelButton onClick={onCancel}>{cancelText}</CancelButton>
          <SaveButton onClick={onConfirm}>{confirmText}</SaveButton>
        </SaveCancelButtonContainer>
      </DesktopSmallModalContainer>
    </Modal>
  );
};

export default SimplePopup;
