import React from "react";
import ReactDOM from "react-dom";
import { Overlay } from "./ViewModalPopup";

interface ModalProps {
  onBackdropClick: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onBackdropClick, children }) => {
  return ReactDOM.createPortal(
    <Overlay onClick={onBackdropClick}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </Overlay>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
