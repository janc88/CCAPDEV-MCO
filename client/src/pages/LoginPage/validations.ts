import { RegisterOptions } from "react-hook-form";

export const validateUsername = async (username: string) => {
  try {
    const response = await fetch("http://localhost:8080/api/users/taken", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      throw new Error("Error checking username availability");
    }

    const data = await response.json();

	return data.isTaken || 'Username doesn\'t exists';
  } catch (error) {
    console.error("Error checking username availability:", error);
  }
};

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
