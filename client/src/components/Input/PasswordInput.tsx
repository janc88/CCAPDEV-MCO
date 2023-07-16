import { useState } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import { PwordContainer, PwordToggleContainer, TextInput } from "./styles/Input.styled";
import {Visibility, VisibilityOff} from '@styled-icons/material/'
import React from "react";

interface PasswordInputProps {
	id: string;
	register: UseFormRegister<FieldValues>;
	name?: string;
	px?: string;
	validation?: RegisterOptions<FieldValues, string>;
}
export const PasswordInput: React.FC<PasswordInputProps> = ({
	id, register, validation,
	name = id, px = '19px'
  }) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const togglePasswordVisibility = () => {
	  setIsPasswordVisible(!isPasswordVisible);
	};
	return (
	  <PwordContainer>
		<TextInput
		  type={isPasswordVisible ? 'text' : 'password'}
		  id={id}
		  style={{
			paddingRight: `calc(${px} + 20px)`
		  }}
		  {...register(name, validation)}>
		</TextInput>

		<PwordToggleContainer onClick={togglePasswordVisibility}>
          {isPasswordVisible ? (
            <VisibilityOff size={px} />
          ) : (
            <Visibility size={px} />
          )}
        </PwordToggleContainer>
      </PwordContainer>
	);
};