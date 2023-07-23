import React, { ReactNode, createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useUser, userHook } from './UserHook';
import Cookies from 'js-cookie';

export interface User {
	id: string;
	username: string;
	description: string;
	avatar: string;
}

interface UserContextType extends userHook {
	user: User | null;
	signup: (user: User, password: string, profilePicture: File) => Promise<void>;
	/**
	 * clears user from cookies and state
	 */
	logout: () => void;
	/**
	 * sets user in cookies and state
	 * @returns User if valid, null otherwise
	 */
	login: (username: string, password: string) => Promise<User | null>;
	updateUser: (description: string, avatar: File | null) => Promise<void>;
	updatePassword: (old_password: string, new_password: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, _setUser] = useState<User | null>(null);
	const hook = useUser();

	useEffect(() => {
		const savedUser = Cookies.get('user');
		if (savedUser) {
			const parsedUser = JSON.parse(savedUser);
			_setUser(parsedUser);
		}
	}, []);
	const setUser = useCallback((user: User) => {
		Cookies.set('user', JSON.stringify(user));
		_setUser(user);
	}, []);
	const logout = useCallback(() => {
		Cookies.remove('user');
		_setUser(null);
	}, []);


	const updatePassword = useCallback(async (old_password: string, new_password: string) => {
		if (user === null)
			throw new Error("User does not exist!");
		const formData = new FormData();
		formData.append('old_password', old_password);
		formData.append('new_password', new_password);

		const response = await fetch(`http://localhost:8080/api/users/update/${user.username}`, {
			method: "PATCH",
			body: formData
		});
		await response.json();
		if (!response.ok)
			throw new Error("Error updating password");
	}, [user]);

	const updateUser = useCallback(async (description: string, avatar: File | null) => {
		if (user === null)
			throw new Error("User does not exist!");
		const formData = new FormData();
		formData.append('description', description);
		if (avatar !== null)
			formData.append('avatar', avatar);

		const response = await fetch(`http://localhost:8080/api/users/update/${user.username}`, {
			method: "PATCH",
			body: formData
		});
		const data = await response.json();
		if (!response.ok)
			throw new Error("Error updating user");
		setUser({
			id: data.id,
			username: data.username,
			description: data.description,
			avatar: data.avatar,
		});
	}, [user, setUser]);


	const login = useCallback(async (username: string, password: string) => {
		const response = await fetch(`http://localhost:8080/api/users/login`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});
		if (!response.ok)
			return null;
		const data = await response.json();
		const newUser = {
			id: data.id,
			username: data.username,
			description: data.description,
			avatar: data.avatar,
		}
		setUser(newUser);
		return newUser;
	}, [setUser]);

	const signup = useCallback(async (user: User, password: string, profilePicture: File) => {
		const formData = new FormData();
		formData.append('username', user.username);
		formData.append('description', user.description);
		formData.append('avatar', profilePicture);
		formData.append('password', password);

		const response = await fetch("http://localhost:8080/api/users/", {
			method: "POST",
			body: formData
		});
		await response.json();
		if (!response.ok)
			throw new Error("Error creating user");

		await login(user.username, password);
	}, [login]);

	return (
		<UserContext.Provider value={{
			...hook,
			user, logout,
			signup, login,
			updateUser, updatePassword
		}}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUserContext must be used within a UserProvider');
	}
	return context;
}