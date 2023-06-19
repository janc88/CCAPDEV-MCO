import React, { ReactNode, createContext, useState } from 'react';

interface User {
	userName: string;
	profilePicture: File | null;
	accountDesc: string;
}

interface UserContextType {
	user: User | null;
	setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType>({
	user: null,
	setUser: () => { },
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
