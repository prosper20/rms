import { useState } from "react";
import { commentInputProps } from "../types/FormInput";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { getRequest } from "./url.ts";

export const useEmojiPicker = () => {
	const [input, setInput] = useState<commentInputProps>({
		comment: "",
	});
	const addEmoji = (e: { unified: string }) => {
		const sym = e.unified.split("-");
		const codesArray: number[] = [];
		sym.forEach((el: string) => codesArray.push(parseInt(el, 16)));
		const emoji = String.fromCodePoint(...codesArray);

		setInput((prevInput) => ({
			...prevInput,
			comment: prevInput.comment + emoji,
		}));
	};

	return { setInput, input, addEmoji };
};

export function useUser() {
	const auth = useAuthHeader();
	const authUser: { username: string } | null = useAuthUser();
	const token = auth?.split(" ")[1];
	const username = authUser?.username;

	const { data: user, isLoading } = useQuery({
		queryKey: ["user"],
		queryFn: () =>
			getRequest({
				url: `/users/profile/${username}`,
				token: token ?? "",
			}),
	});

	return { user, isLoading, token, username };
}
