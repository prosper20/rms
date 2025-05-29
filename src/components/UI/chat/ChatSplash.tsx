import { Message as MessageIcon } from "iconsax-react";

export default function ChatSplash() {
	return (
		<div className="flex justify-center pr-[300px] text-border items-center h-[70vh]">
			<MessageIcon size={100} />
			<h1 className="text-[36px]">Start Chatting</h1>
		</div>
	);
}
