import { useCallback } from "react";
import { User } from "./UserContext";

export interface userHook {
	usernameExists: (username: string) => Promise<boolean>;
	fetchUserDetails: (id: string) => Promise<User | null>;
}

export const useUser = (): userHook => {
	const usernameExists = useCallback(async (username: String) => {
		console.log('checking username availability')
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/taken/${username}`, {
			method: "GET"
		});
		if (!response.ok) {
			throw new Error("Error checking username availability");
		}

		const data = await response.json();
		return data.isTaken;
	}, []);

	const fetchUserDetails = useCallback(async (id: string): Promise<User|null> => {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/user/${id}`, {
			method: "GET"
		});
		if (!response.ok)
			return null;

		const data = await response.json();
		return data
	}, []);

	return {
		usernameExists,
		fetchUserDetails
	};
};