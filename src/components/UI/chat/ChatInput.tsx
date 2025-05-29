import { FC } from "react";
import { Paperclip, SendHorizontal } from "lucide-react";

interface ChatInputProps {
	value: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const ChatInput: FC<ChatInputProps> = ({ value, onChange, onSubmit }) => {
	return (
		<form
			onSubmit={onSubmit}
			className=" p-4 border-t bottom-0 bg-background-100 border-gray-300"
		>
			<div className="max-w-6xl mx-auto flex items-center bg-[#e6d8c3] px-4 py-2 rounded-full h-[54px]">
				<Paperclip
					size={42}
					className="rotate-[-43deg] rounded-full bg-border/[50%] p-3 text-border cursor-pointer"
				/>
				<input
					type="text"
					value={value}
					onChange={onChange}
					placeholder="Type a message"
					className="flex-1 px-4 bg-transparent text-[18px] focus:outline-none"
				/>
				<button type="submit">
					<SendHorizontal
						size={42}
						className="rounded-full bg-border/[50%] p-3 text-border"
					/>
				</button>
			</div>
		</form>
	);
};

export default ChatInput;
