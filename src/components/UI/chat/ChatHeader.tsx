import { NavLink, useParams } from "react-router-dom";
import { Files, MessageCircleMoreIcon } from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";

import { Conversation } from "../../../types/Message";
import { useState, useEffect } from "react";
//import { useConversationMeta } from "@/hooks/useConversations";

/**  Shows conversation title and the two tabs  */
const ChatHeader = () => {
	const [conversation, setConversation] = useState<Conversation>();
	const authHeader = useAuthHeader();
	const { conversationId } = useParams<{ conversationId: string }>();
	//const { data: meta } = useConversationMeta(conversationId || "");

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const token = authHeader?.split(" ")[1];
				if (!token) {
					toast.error("No auth token found");
					return;
				}
				const res = await fetch(
					`${import.meta.env.VITE_API_URL}/conversations/${conversationId}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);

				if (!res.ok) throw new Error("Failed to fetch messages");

				const data: Conversation = await res.json();
				setConversation(data);
			} catch (err) {
				console.error("Could not find message");
			}
		};

		if (conversationId) fetchMessages();
	}, [conversationId]);

	return (
		<header className=" border-b text-border px-8 border-border">
			<h1 className="text-[28px] my-[16px] font-header1">
				{conversation ? conversation.title : "Chat Room"}
			</h1>
			<div className="flex gap-[34px] mt-2 text-[24px] font-header2">
				<NavLink
					end
					className={({ isActive }) =>
						isActive ? `border-b-2 border-border` : ""
					}
					to={`/dashboard/chat/${conversationId}`}
				>
					<span className="pb-1 leading-[38px] items-center flex">
						<MessageCircleMoreIcon
							size={29}
							className="text-white"
							fill="#5c4033"
						/>
						<h1>Messages</h1>
					</span>
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						isActive ? `border-b-2 border-border` : ""
					}
					to={`/dashboard/chat/${conversationId}/files`}
				>
					<span className="pb-1 leading-[38px] items-center flex">
						<Files />
						<h1>Files</h1>
					</span>
				</NavLink>
			</div>
		</header>
		// <header className=" border-b px-8">
		// 	{/* <h2 className="text-[28px] my-4 font-header1">{meta?.name}</h2> */}
		// 	<h2 className="text-[28px] my-4 font-header1">Project Pioneers</h2>
		// 	<nav className="flex gap-8 text-[24px] font-header2">
		// 		<NavLink end to={`/dashboard/chat/${conversationId}`}>
		// 			Messages
		// 		</NavLink>
		// 		<NavLink to={`/dashboard/chat/${conversationId}/files`}>Files</NavLink>
		// 	</nav>
		// </header>
	);
};

export default ChatHeader;
