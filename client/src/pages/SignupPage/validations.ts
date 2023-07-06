import { RegisterOptions, UseFormReturn } from "react-hook-form";

const usernameExists = async (username: String) => {
  try {
    const response = await fetch("http://localhost:8080/api/users/taken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      throw new Error("Error checking username availability");
    }

    const data = await response.json();

    if (data.isTaken) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking username availability:", error);
  }
};

export const usernameValidation: RegisterOptions = {
  required: "Username is required",
  minLength: {
    value: 4,
    message: "Username must be at least 4 characters long",
  },
  validate: async (value) => {
    const isUsernameExists = await usernameExists(value);
    return isUsernameExists ? 'Username already exists' : true;
  },
};

export const passwordValidation: RegisterOptions = {
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters long",
  },
};

export const confirmPwdValidation = (
  methods: UseFormReturn
): RegisterOptions => {
  return {
    required: "Please confirm your password",
    validate: (value: string) =>
      value === methods.getValues("password") || "Passwords do not match",
  };
};
