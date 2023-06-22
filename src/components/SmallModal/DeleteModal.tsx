import Modal from "../Modal/Modal";
import {
  DesktopSmallModalContainer,
  Title,
  BodyText,
  DeleteText,
} from "./SmallModal.styled";

import { Divider, SideText, Send } from "../../pages/styles/LoginPage.styled";
import { useNavigate } from "react-router-dom";
import { FlexRight } from "../../styles/Flex.styled";
import { ButtonContainer, CancelButton, SaveButton, SaveCancelButtonContainer } from "../ModalPopups/ModalPopup";

interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({
  onBackdropClick,
  isModalVisible,
}) => {
  const navigate = useNavigate();

  if (!isModalVisible) {
    return null;
  }
  const CancelModal = () => {

    onBackdropClick();
  };

  const SaveModal = () => {

    onBackdropClick();
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
          <CancelButton onClick={CancelModal}>Cancel</CancelButton>
          <SaveButton onClick={SaveModal}>Delete</SaveButton>
        </SaveCancelButtonContainer>
      </DesktopSmallModalContainer>
    </Modal>
  );
};

export default BaseModalWrapper;
