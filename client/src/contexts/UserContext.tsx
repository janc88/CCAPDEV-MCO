import React, { ReactNode, createContext, useState, useEffect, useCallback, useContext } from 'react';
import Cookies from 'js-cookie';

export interface User {
	userName: string;
	profilePicture: string | null;
	accountDesc: string;
}

interface UserContextType {
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
	usernameExists: (username: string) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, _setUser] = useState<User | null>(null);

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

		const response = await fetch(`http://localhost:8080/api/users/update/${user.userName}`, {
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

		const response = await fetch(`http://localhost:8080/api/users/update/${user.userName}`, {
			method: "PATCH",
			body: formData
		});
		const data = await response.json();
		if (!response.ok)
			throw new Error("Error updating user");
		setUser({
			userName: data.username,
			profilePicture: 'http://localhost:8080/api/images/' + data.avatar,
			accountDesc: data.description,
		});
	}, [user, setUser]);


	const login = useCallback(async (username: string, password: string) => {
		const response = await fetch(`http://localhost:8080/api/users/${username}`);
		if (!response.ok)
			throw new Error("Error validating user");
		const data = await response.json();
		if (data.username === username &&
			data.password === password) {
			const newUser = {
				userName: data.username,
				profilePicture: 'http://localhost:8080/api/images/' + data.avatar,
				accountDesc: data.description,
			}
			setUser(newUser);
			return newUser;
		}
		return null;
	}, [setUser]);

	const signup = useCallback(async (user: User, password: string, profilePicture: File) => {
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

		await login(user.userName, password);
	}, [login]);

	const usernameExists = useCallback(async (username: String) => {
	  console.log('checking username availability')
	  const response = await fetch(`http://localhost:8080/api/users/taken/${username}`, {
		method: "GET"
	  });
	  if (!response.ok) {
		throw new Error("Error checking username availability");
	  }
	  
	  const data = await response.json();
	  return data.isTaken;
	}, []);

	return (
		<UserContext.Provider value={{
			user, logout,
			signup, login,
			updateUser, updatePassword,
			usernameExists
		}}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
}