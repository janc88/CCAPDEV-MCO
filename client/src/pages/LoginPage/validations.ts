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
  validate: async (value) => {
    const isUsernameExists = await usernameExists(value);
    return !isUsernameExists ? "Username does not exist" : true;
  },
};

export const passwordValidation = (methods: UseFormReturn): RegisterOptions => {
  return {
    required: "Password is required",
    validate: async (password) => {
      const valid = await validateLogin(
        methods.getValues("username"),
        password
      );
      return !valid ? "Password is incorrect" : true;
    },
  };
};

const validateLogin = async (username, password) => {
  console.log({ username, password });
  try {
    const response = await fetch(`http://localhost:8080/api/users/${username}`);

    if (!response.ok) {
      throw new Error("Error validating login");
    }
    const data = await response.json();

    if (data.username === username && data.password === password) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error validating login:", error);
  }
};
