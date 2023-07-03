import React from "react";
import { CloseButton, CloseIcon, ImageContainer } from "./ModalPopup";

interface ImageWithCloseButtonProps {
  src: string;
  onDelete: () => void;
}

const ImageWithCloseButton: React.FC<ImageWithCloseButtonProps> = ({ src, onDelete }) => {
  return (
    <ImageContainer>
      <img src={src}/>
      <CloseButton onClick={onDelete}>
        <CloseIcon>X</CloseIcon>
      </CloseButton>
    </ImageContainer>
  );
};

export default ImageWithCloseButton;