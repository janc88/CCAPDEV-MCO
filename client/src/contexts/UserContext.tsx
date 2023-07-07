import React, { ReactNode, createContext, useState } from 'react';

export interface User {
	userName: string;
	profilePicture: string | null;
	accountDesc: string;
}

interface UserContextType {
	user: User | null;
	login: (user: User) => void;
	/**
	 * @returns Error message if invalid, true otherwise
	 */
	signup: (user: User, password: string, profilePicture: File) => Promise<string | boolean>;
	logout: () => void;
	/**
	 * @returns User if valid, null otherwise
	 */
	validateUser: (username: string, password: string) => Promise<User | null>;
}

export const UserContext = createContext<UserContextType>({
	user: null,
	login: () => { },
	logout: () => { },
	signup: () => Promise.resolve("ERROR!"),
	validateUser: () => Promise.resolve(null),
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const login = (user: User) => {
		//TODO: login stuff
		console.log('user logged in')
		setUser(user);
	}
	const signup = async (user: User, password: string, profilePicture: File) => {
		try {
			const formData = new FormData();
			formData.append('username', user.userName);
			formData.append('description', user.accountDesc);
			formData.append('avatar', profilePicture);
			formData.append('password', password);

			const response = await fetch("http://localhost:8080/api/users/", {
			  method: "POST",
			  body: formData
			});
			await response.json();
			if (!response.ok)return "Error creating user";

			const loginUser = await validateUser(user.userName, password)
			if (loginUser === null) return "Error creating user";

			login(loginUser);
			console.log("User created successfully!");
			return true;
		  } catch (error) {
			console.error("Error creating user:", error);
			return "Error creating user:" + error;
		  }
	}
	const logout = () => {
		//TODO: logout stuff
		setUser(null);
	}
	const validateUser = async (username: string, password: string) => {
		try {
			const response = await fetch(`http://localhost:8080/api/users/${username}`);
			if (!response.ok)
			  throw new Error("Error validating user");
			const data = await response.json();
			if (data.username === username && 
				data.password === password)
			return {
				userName: data.username,
				profilePicture: data.avatar,
				accountDesc: data.description,
			};
		  } catch (error) {
			console.error("Error validating login:", error);
		  }
		return null;
	};
	return (
		<UserContext.Provider value={{ user, login, logout, signup, validateUser}}>
			{children}
		</UserContext.Provider>
	);
};
