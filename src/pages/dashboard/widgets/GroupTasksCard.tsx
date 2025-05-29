import { Card2, Card3 } from "../../../components/UI/Input/Card1";
import addButton from "../../../assets/images/button.svg";
import { useState } from "react";
import Tasks from "../../../components/UI/Tasks";
import ModalLayout from "../../../components/modals/ModalLayout";
import { CircleOff } from "lucide-react";

interface Task {
	id: string;
	title: string;
	status: "TODO" | "IN_PROGRESS" | "COMPLETED";
	description: string;
	assignees: {
		id: string;
		fullName: string;
		profile_picture?: string;
	}[];
}

interface Props {
	groupId: string;
	items?: Task[];
	className?: string;
}

const statusColorMap: Record<Task["status"], string> = {
	TODO: "bg-gray-300 text-gray-800",
	IN_PROGRESS: "bg-yellow-300 text-yellow-800",
	COMPLETED: "bg-green-400 text-green-800",
};

const GroupTasksCard: React.FC<Props> = ({
	className,
	items = [],
	groupId,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	function handleOpen() {
		setIsOpen(true);
	}

	function handleClose() {
		setIsOpen(false);
	}

	return (
		<div className={`${className}`}>
			<Card3
				img={addButton}
				alt="Add Task"
				header="Tasks"
				handleOpen={handleOpen}
				className="px-[21px] py-[9px]"
				style={{ paddingLeft: "20px" }}
				headButton
			>
				<Card2 className="px-[24px] py-[41px] rounded-[8px] md:mb-6 mb-[18px]">
					{items.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-10 text-center">
							<p className="text-[20px] font-header2 text-gray-400 mb-4">
								No tasks added yet
							</p>
							<p className="text-[14px] text-gray-400 mb-6">
								Click the + above or the button below to get started.
							</p>
							<div className="w-[80px] h-[80px] rounded-full bg-gray-100 flex items-center justify-center">
								<CircleOff
									size={40}
									strokeWidth={1}
									className="text-[#747373]"
								/>
							</div>
						</div>
					) : (
						<ul className="flex flex-col gap-[24px]">
							{items.map((task) => (
								<li key={task.id}>
									<div className="flex justify-between items-center flex-wrap gap-[20px] text-[18px] text-text-100 font-header3">
										<p>{task.title}</p>
										<span
											className={`text-xs font-medium px-3 py-1 rounded-full ${statusColorMap[task.status]}`}
										>
											{task.status.replace("_", " ")}
										</span>
									</div>

									<div className="mt-2 text-[14px] text-text-200 space-y-1">
										{task.assignees.length > 0 && (
											<p>
												<span className="font-semibold">Assigned to:</span>{" "}
												{task.assignees[0].fullName}
											</p>
										)}
										<p>{task.description}</p>
									</div>
								</li>
							))}
						</ul>
					)}

					{/* New Task Button */}
					<div className="mt-6 flex justify-end">
						<button
							onClick={handleOpen}
							className="text-sm px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
						>
							+ New Task
						</button>
					</div>
				</Card2>
			</Card3>

			<ModalLayout isOpen={isOpen} onClose={handleClose}>
				<Tasks groupId={groupId} />
			</ModalLayout>
		</div>
	);
};

export default GroupTasksCard;
