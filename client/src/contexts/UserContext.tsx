import React, { ReactNode, createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export interface User {
	userName: string;
	profilePicture: string | null;
	accountDesc: string;
}

interface UserContextType {
	user: User | null;
	/**
	 * sets user in cookies and state
	 */
	login: (user: User) => void;
	signup: (user: User, password: string, profilePicture: File) => Promise<void>;
	/**
	 * clears user from cookies and state
	 */
	logout: () => void;
	/**
	 * @returns User if valid, null otherwise
	 */
	validateUser: (username: string, password: string) => Promise<User | null>;
	updateUser: (description: string, avatar: File|null) => Promise<void>;
	updatePassword: (old_password: string, new_password: string) => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
	user: null,
	login: () => { },
	logout: () => { },
	signup: () => Promise.resolve(),
	validateUser: () => Promise.resolve(null),
	updateUser: () => Promise.resolve(),
	updatePassword: () => Promise.resolve(),
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		const savedUser = Cookies.get('user');
		if (savedUser) {
		  const parsedUser = JSON.parse(savedUser);
		  setUser(parsedUser);
		}
	  }, []);
	
	const login = (user: User) => {
		Cookies.set('user', JSON.stringify(user));
		setUser(user);
	}
	
	const updatePassword = async (old_password: string, new_password: string) => {
		if (user === null)
			throw new Error("User does not exist!");
		const formData = new FormData();
		formData.append('old_password', old_password);
		formData.append('new_password', new_password);

		const response = await fetch(`http://localhost:8080/api/users/update/${user.userName}`, {
			method: "POST",
			body: formData
		});
		await response.json();
		if (!response.ok)
			throw new Error("Error updating password");
	}

	const updateUser = async (description: string, avatar: File|null) => {
		if (user === null)
			throw new Error("User does not exist!");
		const formData = new FormData();
		formData.append('description', description);
		if (avatar !== null)
			formData.append('avatar', avatar);

		const response = await fetch(`http://localhost:8080/api/users/update/${user.userName}`, {
			method: "POST",
			body: formData
		});
		const data = await response.json();
		if (!response.ok)
			throw new Error("Error updating user");
		login({
			userName: data.username,
			profilePicture: 'http://localhost:8080/api/images/' + data.avatar,
			accountDesc: data.description,
		});
	}

	const signup = async (user: User, password: string, profilePicture: File) => {
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
		if (!response.ok)
			throw new Error("Error creating user");

		const loginUser = await validateUser(user.userName, password)
		if (loginUser === null)
			throw new Error("Error creating user");

		login(loginUser);
	}

	const logout = () => {
		Cookies.remove('user');
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
				profilePicture: 'http://localhost:8080/api/images/' + data.avatar,
				accountDesc: data.description,
			};
		  } catch (error) {
			console.error("Error validating login:", error);
		  }
		return null;
	};

	return (
		<UserContext.Provider value={{ 
			user, login, logout, 
			signup, validateUser, 
			updateUser, updatePassword
			}}>
			{children}
		</UserContext.Provider>
	);
};
