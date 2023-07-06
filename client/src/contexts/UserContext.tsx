import React, { ReactNode, createContext, useState } from 'react';

interface User {
	userName: string;
	profilePicture: File | null;
	accountDesc: string;
}

interface UserContextType {
	user: User | null;
	login: (username: string, password: string) => void;
	signup: (user: User, password: string) => void;
	logout: () => void;
}

export const UserContext = createContext<UserContextType>({
	user: null,
	login: () => { },
	logout: () => { },
	signup: () => { },
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const login = (username: String, password: string) => {
		//do login stuff
		console.log('user logged in')
	}
	const signup = (user: User, password: string) => {
		//do signup stuff
		console.log('user signed up')
		setUser(user);
	}
	const logout = () => {
		setUser(null);
	}
	return (
		<UserContext.Provider value={{ user, login, logout, signup}}>
			{children}
		</UserContext.Provider>
	);
};
