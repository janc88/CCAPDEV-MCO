import styled from "styled-components";
import { Edit } from "@styled-icons/boxicons-solid";
import { Button } from "../../styles/Button.styled";
import { Question } from "@styled-icons/evil";
import { BackgroundPic } from "../../styles/BackgroundPic.styled";

export const EditProfileContainer = styled(BackgroundPic)`
  justify-content: center;
  align-items: center;
`;

export const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 65%;
`;

export const UserCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.2;
  width: 100%;
  background-color: white;
  margin: 1rem;
  border-radius: 0.7rem;
  box-shadow: 6px 7px 14px -2px rgba(0, 0, 0, 0.3);
`;

export const EditProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  width: 100%;
  min-height: 20rem;
  background-color: white;
  margin: 1rem;
  border-radius: 0.7rem;
  box-shadow: 6px 7px 14px -2px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

export const DescriptionContainer = styled.div`
  margin: 2rem 1.4rem;
`;

export const DescriptionLabel = styled.h3`
  margin-bottom: 1rem;
`;

export const EditIcon = styled(Edit)`
  margin-top: 2rem;
  margin-bottom: 1rem;
  height: 2rem;
  width: 2rem;
  color: black;
`;

export const InputField = styled.textarea`
  margin: 0 1.4rem;
  height: 3.3rem;
  resize: none;
  font-size: 1rem;
  line-height: 1.5;
  padding: 0.5rem;
`;

export const LowerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

export const UploadImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1.4rem;
  margin-bottom: 2rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.4rem;
`;

export const CancelButton = styled(Button)`
  background-color: white;
  color: #ff794f;
  border: solid 1px #ff794f;
  width: 8rem;
  margin: 0 0.5rem;
`;

export const SaveButton = styled(Button)`
  background-color: #ff794f;
  color: white;
  width: 8rem;
  margin: 0 0.5rem;
`;

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const AvatarText = styled.div`
  margin: 0;
`;

export const QuestionIcon = styled(Question)`
  width: 1.5rem;
  height: 1.5rem;
  color: black;
`;

export const UploadImageButton = styled(Button)`
  background-color: white;
  color: black;
  width: 6.2rem;
  font-weight: 300;
  border: solid 1px black;
  font-size: small;
  padding: 0.2rem;
`;
