//import { useOutletContext } from "react-router-dom";
import { format } from "date-fns";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";

import { Message as MessageIcon } from "iconsax-react";
import { groupMessagesByDate } from "../../../utils/utilities";
import { Message } from "../../../types/Message";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

export const dummyMessages: Message[] = [
	{
		id: "m1",
		created_at: "2025-04-28T09:00:00Z",
		message:
			"Morning team! Stand-up at 10 AM. Please be prepared to share your progress, blockers, and what you plan to work on today.",
		author: {
			id: "u1",
			fullName: "Courtney Henry",
			profile_picture: "https://randomuser.me/api/portraits/women/1.jpg",
			role: "STUDENT",
		},
		isEdited: false,
		files: [],
	},
	{
		id: "m2",
		created_at: "2025-04-28T11:15:00Z",
		message:
			"Uploading the cleaned dataset all.xlsx ⬆. Please double-check the formatting and column naming conventions before analysis begins.",
		author: {
			id: "u2",
			fullName: "Wade Warren",
			profile_picture: "https://randomuser.me/api/portraits/men/2.jpg",
			role: "STUDENT",
		},
		isEdited: false,
		files: [
			{
				name: "cleaned-dataset.xlsx",
				size: 1_572_864,
				url: "#",
			},
		],
	},
	{
		id: "m3",
		created_at: "2025-04-28T14:30:00Z",
		message:
			"Don’t forget your mid-project report, please. It should include your progress so far, challenges faced, and what’s next in your roadmap.",
		author: {
			id: "u3",
			fullName: "Floyd Miles",
			profile_picture: "https://randomuser.me/api/portraits/men/3.jpg",
			role: "SUPERVISOR",
		},
		isEdited: true,
		files: [],
	},
	{
		id: "m4",
		created_at: "2025-04-29T08:07:00Z",
		message:
			"I think we should meet tomorrow to finalize the EDA section. Around 5 PM? Let me know if that works for everyone, or suggest alternatives.",
		author: {
			id: "cm9zn780i0000um6mxjqx5v5u",
			fullName: "Floyd Miles",
			profile_picture: "https://randomuser.me/api/portraits/men/3.jpg",
			role: "STUDENT",
		},
		isEdited: true,
		files: [],
	},
	{
		id: "m5",
		created_at: "2025-04-29T14:45:00Z",
		message:
			"Here’s the draft ER-diagram for review. I’ve included all core entities and relationships based on our latest schema discussion.",
		author: {
			id: "u4",
			fullName: "Annette Black",
			profile_picture: "https://randomuser.me/api/portraits/women/4.jpg",
			role: "STUDENT",
		},
		isEdited: false,
		files: [],
	},
	{
		id: "m6",
		created_at: "2025-04-29T14:48:00Z",
		message:
			"Don’t forget your mid-project report, please. Make sure to highlight your key contributions, team collaboration, and progress made.",
		author: {
			id: "cm9zn780i0000um6mxjqx5v5u",
			fullName: "Floyd Miles",
			profile_picture: "https://randomuser.me/api/portraits/men/3.jpg",
			role: "STUDENT",
		},
		isEdited: true,
		files: [
			{
				name: "cleaned-dataset.xlsx",
				size: 1_572_864,
				url: "#",
			},
		],
	},
];

export default function ChatMessages() {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const authHeader = useAuthHeader();

	const { conversationId } = useParams<{ conversationId: string }>();

	const currentUser: {
		id: string;
		fullName: string;
		email: string;
		profilePicture: string;
	} | null = useAuthUser();

	//const { conversationId } = useOutletContext<{ conversationId: string }>();

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				setLoading(true);
				setError(null);

				const token = authHeader?.split(" ")[1];
				if (!token) {
					toast.error("No auth token found");
					return;
				}
				const res = await fetch(
					`${import.meta.env.VITE_API_URL}/conversations/${conversationId}/messages`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);

				if (!res.ok) throw new Error("Failed to fetch messages");

				const data: Message[] = await res.json();
				setMessages(data);
			} catch (err) {
				console.error(err);
				setError("Could not load messages.");
			} finally {
				setLoading(false);
			}
		};

		if (conversationId) fetchMessages();
	}, [conversationId]);

	if (!conversationId) {
		return (
			<div className="flex h-[70vh] items-center justify-center text-border">
				<MessageIcon size={100} />
				<h1 className="ml-6 text-[36px]">Start Chatting</h1>
			</div>
		);
	}
	const groupedMessages = groupMessagesByDate(messages);

	// const { data, fetchNextPage } = useGetMessagesInfinite(conversationId, 50);
	// const groupedMessages = useMemo(
	// 	() => groupMessagesByDate(data?.pages.flat() ?? []),
	// 	[data]
	// );

	if (!groupedMessages.length) {
		return (
			<div className="flex h-[70vh] items-center justify-center text-border">
				<MessageIcon size={100} />
				<h1 className="ml-6 text-[36px]">Start Chatting</h1>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="flex h-[70vh] items-center justify-center text-border">
				<h1 className="text-[24px]">Loading messages...</h1>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex h-[70vh] items-center justify-center text-red-600">
				<h1>{error}</h1>
			</div>
		);
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!input.trim()) return;

		// TODO: handle send message logic
		console.log("Send message:", input);
		setInput("");
	};

	return (
		<>
			<div className=" px-8 space-y-6 overflow-y-auto h-[calc(100vh-265px)] md:h-[calc(100vh-290px)] pb-[90px]">
				{groupedMessages.map((group, i) => (
					<div key={i} className="space-y-4">
						<div className="flex items-center gap-2 my-8">
							<div className="flex-1 h-[1px] bg-gray-300" />
							<span className="text-[14px] font-semibold text-gray-700 border-[2px] border-bg-gray-300 px-3 py-1 rounded-full shadow-sm">
								{group.date}
							</span>
							<div className="flex-1 h-[1px] bg-gray-300" />
						</div>
						{group.items.map((msg) => {
							const time = format(
								new Date(msg.created_at),
								"hh:mm a"
							).toLocaleLowerCase();
							const isOwn = msg.author?.id === currentUser?.id;
							return (
								<MessageBubble
									key={msg.id}
									msg={msg}
									isOwn={isOwn}
									time={time}
								/>
							);
						})}
					</div>
				))}
			</div>
			{/* <div className="p-4 border-t fixed bottom-0 w-full pr-[230px] xxl:pr-[540px] lg:pr-[510px] z-[70] bg-background-100 border-gray-300"> */}
			{/* <div className="p-4 border-t space-y-6 overflow-y-auto h-[240px]"> */}
			{/* <div className="p-4 border-t bottom-0 bg-background-100 border-gray-300">
				<div className="flex items-center h-[54px]  bg-[#e6d8c3] px-4 py-2 rounded-full">
					<Paperclip
						size={42}
						className=" rotate-[-43deg] rounded-full bg-border/[50%] p-3 text-border"
					/>
					<input
						type="text"
						placeholder="Type a message"
						className="flex-1 px-4 bg-transparent text-[18px] focus:outline-none"
					/>
					<button>
						<SendHorizontal
							size={42}
							className="rounded-full bg-border/[50%] p-3 text-border"
						/>
					</button>
				</div>
			</div> */}
			<ChatInput
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onSubmit={handleSubmit}
			/>
			{/* <div className="p-4 border-t fixed bottom-0 w-full pr-[230px] xxl:pr-[540px] lg:pr-[510px] z-[70] bg-background-100 border-gray-300">
				<div className="flex items-center h-[54px]  bg-[#e6d8c3] px-4 py-2 rounded-full">
					<Paperclip
						size={42}
						className=" rotate-[-43deg] rounded-full bg-border/[50%] p-3 text-border"
					/>
					<input
						type="text"
						placeholder="Type a message"
						className="flex-1 px-4 bg-transparent text-[18px] focus:outline-none"
					/>
					<button>
						<SendHorizontal
							size={42}
							className="rounded-full bg-border/[50%] p-3 text-border"
						/>
					</button>
				</div>
			</div> */}
		</>
	);
}
