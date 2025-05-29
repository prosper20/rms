import { Download, Files, Paperclip, SendHorizontal } from "lucide-react";
import { rawMessages } from "../pages/dashboard/Chat";
import { format } from "date-fns";

interface Message {
	date: string;
	items: typeof rawMessages;
}

interface ChatProps {
	groupedMessages: Message[];
}

const ChatMessages: React.FC<ChatProps> = ({ groupedMessages }) => {
	return (
		<>
			<div className="px-8 space-y-6 overflow-y-auto h-[calc(100vh-240px)] pb-[90px]">
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
								new Date(msg.time),
								"hh:mm a"
							).toLocaleLowerCase();

							if (msg.type === "info") {
								return (
									<div key={msg.id} className="text-right space-y-1 ">
										<div className="text-xs text-gray-500">{time}</div>
										<div className="inline-block text-[18px] text-border/[56%] shadow-sm">
											{msg.text}
										</div>
									</div>
								);
							}

							return (
								<div key={msg.id} className="space-y-1">
									<div className="flex items-start gap-6">
										<img
											src={msg.avatar}
											alt={msg.name}
											className="w-[56px] h-[56px] rounded-[16px] object-cover"
										/>
										<div>
											<p className="text-[20px] font-header3 text-border">
												{msg.name}
												{msg.tag && (
													<span className="bg-background-card text-[12px] ml-2 px-2 py-[1px] rounded-md">
														{msg.tag}
													</span>
												)}
												<span className="text-[14px] text-border/[56%] font-[300] ml-2">
													{time}
												</span>
											</p>

											<p className="text-[18px] font-header2 text-border/[56%]">
												{msg.text}
											</p>
											{msg.file && (
												<div className="mt-2 w-[306px] bg-[#e6d8c3] p-3 rounded-[10px]  flex items-center gap-3">
													<Files size={45} />
													<div className="flex-1">
														<div className="flex justify-between">
															<p className="text-[20px] font-header1 text-border">
																{msg.file.name}
															</p>
															<Download
																strokeWidth={3}
																className="self-end text-border cursor-pointer"
															/>
														</div>
														<p className="text-[20px] font-header1 text-border/[73%]">
															{msg.file.size}
														</p>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				))}
			</div>
			<div className="p-4 border-t fixed bottom-0 w-full pr-[230px] xxl:pr-[540px] lg:pr-[510px] z-[70] bg-background-100 border-gray-300">
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
			</div>
		</>
	);
};

export default ChatMessages;
