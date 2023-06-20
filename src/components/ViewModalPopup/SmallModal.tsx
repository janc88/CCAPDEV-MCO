import Modal from "./ViewModal";
import {
  DesktopSmallModalContainer,
  Title,
  BodyText,
} from "./SmallModal.styled";
import { ReviewProps } from "../ReviewsCard/ReviewsCard";

import { 
	Divider,
	SideText,
  Send
} from "../../pages/styles/LoginPage.styled";
import { useNavigate } from "react-router-dom";
import { FlexRight } from "../../styles/Flex.styled";

interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
  relativeTime: string;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps & ReviewProps> = ({
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
        Currently you are logged out.<br/><br/>
        You need to log in first to perform the desired action. Press the button below to log in now.
        </BodyText>
        <div>
          <FlexRight>
          <SideText onClick={() => navigate('/signup')}>
            Don't have an account?
          </SideText>
          </FlexRight>
        </div>
        <Send onClick={() => navigate('/login')}>
          Log In
        </Send>
      </DesktopSmallModalContainer>
    </Modal>
  );
};

export default BaseModalWrapper;
