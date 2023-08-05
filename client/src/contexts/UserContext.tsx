import React, { ReactNode, createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useUser, userHook } from './UserHook';

export interface User {
	id: string;
	username: string;
	description: string;
	avatar: string;
	ownedRestoId: string | null;
}

interface UserContextType extends userHook {
	user: User | null;
	signup: (user: User, password: string, profilePicture: File, rememberMe: boolean) => Promise<void>;
	/**
	 * clears user from cookies and state
	 */
	logout: () => Promise<void>;
	/**
	 * sets user in cookies and state
	 * @returns User if valid, null otherwise
	 */
	login: (username: string, password: string, rememberMe: boolean) => Promise<User | null>;
	updateUser: (description: string, avatar: File | null) => Promise<void>;
	updatePassword: (old_password: string, new_password: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const hook = useUser();

	useEffect(() => {
		(async () => {
			const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/me`, {
				method: "GET",
				credentials: 'include'
			});
			if (response.ok)
				setUser(await response.json());
		})();
	}, []);

	const logout = useCallback(async () => {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/logout`, {
			method: "POST",
			credentials: 'include'
		});
		await response.json();
		if (!response.ok)
			throw new Error("Error logging out");
		setUser(null);
	}, []);


	const updatePassword = useCallback(async (old_password: string, new_password: string) => {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/update/`, {
			method: "PATCH",
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({ old_password, new_password })
		});
		await response.json();
		if (!response.ok)
			throw new Error("Error updating password");
	}, []);

	const updateUser = useCallback(async (description: string, avatar: File | null) => {
		const formData = new FormData();
		formData.append('description', description);
		if (avatar !== null)
			formData.append('avatar', avatar);

		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/update/`, {
			method: "PATCH",
			credentials: 'include',
			body: formData
		});
		const data = await response.json();
		if (!response.ok)
			throw new Error("Error updating user");
		setUser(data);
	}, []);


	const login = useCallback(async (username: string, password: string, rememberMe: boolean) => {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({ username, password, rememberMe })
		});
		if (!response.ok)
			return null;
		const data = await response.json();
		setUser(data);
		return data;
	}, [setUser]);

	const signup = useCallback(async (user: User, password: string, profilePicture: File, rememberMe: boolean) => {
		const formData = new FormData();
		formData.append('username', user.username);
		formData.append('description', user.description);
		formData.append('avatar', profilePicture);
		formData.append('password', password);

		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
			method: "POST",
			body: formData,
			credentials: 'include'
		});
		await response.json();
		if (!response.ok)
			throw new Error("Error creating user");

		await login(user.username, password, rememberMe);
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