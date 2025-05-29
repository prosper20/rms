import { FC } from "react";
import { Download, Files } from "lucide-react";
import { Message } from "../../../types/Message";
import userAvatar from "../../../assets/user-images/default-avatar-photo.jpg";

interface MessageBubbleProps {
	msg: Message;
	isOwn: boolean;
	time: string;
}

const MessageBubble: FC<MessageBubbleProps> = ({ msg, isOwn, time }) => {
	// const fileBgColor = "#e6d8c3";
	// bg-[#e0d9d2]

	if (isOwn) {
		return (
			<div className="space-y-1 flex justify-end">
				<div className="flex flex-col max-w-[55rem] bg-gray-200 py-6 px-8 rounded-t-[10px] rounded-bl-[10px]">
					<p className="text-[18px] text-border">{msg.message}</p>
					{msg.files.length > 0 &&
						msg.files.map((file) => (
							<div
								key={file.name}
								className="mt-2 w-[306px] bg-[#e6d8c3] p-3 rounded-[10px] flex items-center gap-3"
							>
								<Files size={35} />
								<div className="flex-1">
									<div className="flex justify-between">
										<p className="text-[15px] font-header1 text-border">
											{file.name}
										</p>
										<Download
											strokeWidth={3}
											className="text-border cursor-pointer"
										/>
									</div>
									<p className="text-[10px] font-header1 text-border/[73%]">
										{file.size}
									</p>
								</div>
							</div>
						))}
					<span className="text-[14px] text-border/[56%] font-[300] ml-2 text-right">
						{time}
					</span>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-1 flex gap-6">
			<img
				src={
					msg.author.profile_picture?.trim() !== ""
						? msg.author.profile_picture
						: userAvatar
				}
				alt={msg.author.fullName}
				className="w-[56px] h-[56px] rounded-[16px] object-cover hidden md:block"
			/>
			<div>
				<p className="text-[20px] font-header3 text-border">
					{msg.author.fullName}
					{msg.author.role === "SUPERVISOR" && (
						<span className="bg-background-card text-[12px] ml-2 px-2 py-[1px] rounded-md">
							{msg.author.role}
						</span>
					)}
					<span className="text-[14px] text-border/[56%] font-[300] ml-2">
						{time}
					</span>
				</p>

				<div className="max-w-[55rem] bg-gray-200 py-6 px-8 rounded-tr-[10px] rounded-br-[10px] rounded-tl-[10px]">
					<p className="text-[18px] font-header2 text-border">{msg.message}</p>

					{msg.files.length > 0 &&
						msg.files.map((file) => (
							<div
								key={file.name}
								className="mt-2 w-[306px] bg-[#e6d8c3] p-3 rounded-[10px] flex items-center gap-3"
							>
								<Files size={35} />
								<div className="flex-1">
									<div className="flex justify-between">
										<p className="text-[15px] font-header1 text-border">
											{file.name}
										</p>
										<Download
											strokeWidth={3}
											className="text-border cursor-pointer"
										/>
									</div>
									<p className="text-[10px] font-header1 text-border/[73%]">
										{file.size}
									</p>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default MessageBubble;
