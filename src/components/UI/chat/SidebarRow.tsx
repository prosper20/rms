import { FC } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Conversation } from "../../../types/Message";

interface SidebarRowProps {
	conversation: Conversation;
}

const SidebarRow: FC<SidebarRowProps> = ({ conversation }) => {
	const { conversationId } = useParams();

	// useNavigate
	// const navigate = useNavigate();
	const isSelected = conversationId === conversation.id;

	const formatGroup = (name: string) => {
		if (name.length >= 20) {
			return (name = name.slice(0, 18) + "...");
		}

		return name;
	};

	return (
		// <li
		// 	onClick={() => navigate(`/dashboard/chat/${conversation.id}`)}
		// 	className={`cursor-pointer rounded-lg px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 ${
		// 		isSelected ? "bg-neutral-200 dark:bg-neutral-800" : ""
		// 	}`}
		// >
		// 	<div className="flex justify-between items-center">
		// 		<span className="truncate">{conversation.title}</span>
		// 		{/* {isOnline && <span className="w-2 h-2 rounded-full bg-green-500" />} */}
		// 	</div>
		// 	{conversation.lastMessageSent && (
		// 		<p className="text-xs text-neutral-500 truncate">
		// 			{conversation.lastMessageSent.message}
		// 		</p>
		// 	)}
		// </li>

		<li
			className={`group rounded-[12px] relative cursor-pointer hover:bg-border/[5%]  ${isSelected ? "bg-border/[15%]" : "bg-border/[15%]"} `}
			key={conversation.id}
		>
			<Link className="" to={`/dashboard/chat/${conversation.id}`}>
				<div className="flex justify-between hover:bg-text-200 items-center cursor-pointer text-[24px] px-4 py-3 rounded-[12px]">
					<h1>{formatGroup(conversation.title)}</h1>
					<p className="bg-background-card text-[20px] text-text-100 font-header1 leading-[25px] rounded-[15px] w-[49px]">
						+{6}
					</p>
				</div>
			</Link>
			<div className=" absolute top-[35px] w-fit hidden group-hover:block bg-gray-200 text-gray-500 text-[13px] rounded py-1 px-2 whitespace-nowrap shadow-lg">
				{conversation.title}
			</div>
		</li>
	);
};

export default SidebarRow;
