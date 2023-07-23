import { RegisterOptions, UseFormReturn } from "react-hook-form";
export const passwordValidation: RegisterOptions = {
	required: "Password is required",
	minLength: {
		value: 8,
		message: "Password must be at least 8 characters long",
	},
};

export const confirmPwdValidation = (
	{ getValues }: UseFormReturn
): RegisterOptions => {
	return {
		required: "Please confirm your password",
		validate: (value: string) =>
			value === getValues("new_password") || "Passwords do not match",
	};
};
