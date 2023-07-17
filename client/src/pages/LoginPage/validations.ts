import { RegisterOptions } from "react-hook-form";

export const usernameValidation: RegisterOptions = {
	required: "Username is required",
	minLength: {
	  value: 4,
	  message: "Username must be at least 4 characters long",
	}
};

export const passwordValidation: RegisterOptions = {
	required: "Password is required",
	minLength: {
	  value: 8,
	  message: "Password must be at least 8 characters long",
	},
};
