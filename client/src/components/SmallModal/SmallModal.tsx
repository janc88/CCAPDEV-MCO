import Modal from "../Modal/Modal";
import {
  DesktopSmallModalContainer,
  Title,
  BodyText,
} from "./SmallModal.styled";

import { Divider, SideText, Send } from "../../pages/styles/LoginPage.styled";
import { useNavigate } from "react-router-dom";
import { FlexRight } from "../../styles/Flex.styled";
import React from "react";

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

  return (
    <Modal onBackdropClick={onBackdropClick}>
      <DesktopSmallModalContainer>
        <Title>Uh oh!</Title>
        <Divider />
        <BodyText>
          Currently you are logged out.
          <br />
          <br />
          You need to log in first to perform the desired action. Press the
          button below to log in now.
        </BodyText>
        <div>
          <FlexRight>
            <SideText onClick={() => navigate("/signup")}>
              Don't have an account?
            </SideText>
          </FlexRight>
        </div>
        <Send onClick={() => navigate("/login")}>Log In</Send>
      </DesktopSmallModalContainer>
    </Modal>
  );
};

export default BaseModalWrapper;
