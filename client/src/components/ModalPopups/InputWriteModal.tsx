import React from "react";
import styled from "styled-components";
import {
    TitleBoxWrapper,
    DescriptionBoxWrapper,
} from "./ModalPopup";

interface TitleBoxProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface DescriptionBoxProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}  

export const TitleBox: React.FC<TitleBoxProps> = ({ value, onChange }) => {
  return (
    <TitleBoxWrapper
      type = "text"
      value = {value}
      onChange = {onChange}
      placeholder = "Title"
    />
  );
};

export const DescriptionBox: React.FC<DescriptionBoxProps> = ({ value, onChange }) => {
  return (
    <DescriptionBoxWrapper
      value = {value}
      onChange = {onChange}
      placeholder = "Say something about this restaurant..."
    />
  );
};