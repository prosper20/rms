import React, { ReactNode, createContext, useContext, useState } from "react";
import { FormDataProps } from "../types/Signup";
interface AppContextProps {
	replyComment: boolean | null;
	setReplyComment: React.Dispatch<React.SetStateAction<boolean>>;
	replyData: {
		username: string;
		date: string;
		time: string;
		content: string;
	} | null;
	setReplyData: React.Dispatch<
		React.SetStateAction<{
			username: string;
			date: string;
			time: string;
			content: string;
		} | null>
	>;
	registerInfo: FormDataProps | null;
	resetEmail: { email: string } | null;
	setResetEmail: React.Dispatch<React.SetStateAction<{ email: string } | null>>;
	setRegisterInfo: React.Dispatch<React.SetStateAction<FormDataProps | null>>;
}
export const AppContext = createContext<AppContextProps | undefined>(undefined);
const AppProvider = ({ children }: { children: ReactNode }) => {
	const [replyComment, setReplyComment] = useState<boolean>(false);
	const [replyData, setReplyData] = useState<{
		username: string;
		date: string;
		time: string;
		content: string;
	} | null>(null);
	const [registerInfo, setRegisterInfo] = useState<FormDataProps | null>(null);
	const [resetEmail, setResetEmail] = useState<{ email: string } | null>(null);

	const value = {
		replyComment,
		resetEmail,
		replyData,
		registerInfo,
		setResetEmail,
		setReplyComment,
		setReplyData,
		setRegisterInfo,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
function useAppContext() {
	const context = useContext(AppContext);

	if (!context) {
		throw new Error("useApp must be used within an AppProvider");
	}

	return context;
}

export { AppProvider, useAppContext };
