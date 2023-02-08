import { createContext, PropsWithChildren, useMemo, useState } from "react";

interface AppContextProps {
	currentUserEmail: string | null;
	setCurrentUserEmail: string | null;
}
export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
	const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(
		null
	);

	return (
		<AppContext.Provider value={{ currentUserEmail, setCurrentUserEmail }}>
			{children}
		</AppContext.Provider>
	);
};
