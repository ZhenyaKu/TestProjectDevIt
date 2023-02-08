import { createContext, PropsWithChildren, useMemo, useState } from "react";
import { Profile } from "../../types";

interface AppContextProps {
	currentEmail: string | null;
	setCurrentEmail: React.Dispatch<React.SetStateAction<string | null>>;
}
export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
	const [currentEmail, setCurrentEmail] = useState<string | null>(null);

	const contextValue = useMemo(
		() => ({ currentEmail, setCurrentEmail }),
		[currentEmail]
	);

	return (
		<AppContext.Provider value={contextValue}>
			{children}
		</AppContext.Provider>
	);
};
