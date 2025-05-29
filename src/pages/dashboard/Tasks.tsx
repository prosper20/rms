import React, { useState, useEffect } from "react";
import ModalLayout from "../../components/modals/ModalLayout";
import Tasks from "../../components/UI/Tasks";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";

import userAvatar from "../../assets/user-images/default-avatar-photo.jpg";

interface Task {
	id: string;
	title: string;
	description: string;
	dueDate: string;
	status: "TODO" | "IN_PROGRESS" | "COMPLETED";
	assignees: { id: string; fullName: string; profile_picture: string }[];
}

const statusColorMap: Record<"TODO" | "IN_PROGRESS" | "COMPLETED", string> = {
	TODO: "bg-task1",
	IN_PROGRESS: "bg-task2",
	COMPLETED: "bg-taskgreen",
};

const TaskBoard: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [tasks, setTasks] = useState<Task[]>([]);
	const authHeader = useAuthHeader();

	const groupedTasks = {
		TODO: tasks.filter((t) => t.status === "TODO"),
		IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS"),
		COMPLETED: tasks.filter((t) => t.status === "COMPLETED"),
	};

	function handleOpen() {
		setIsOpen(true);
	}

	function handleClose() {
		setIsOpen(false);
	}

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const token = authHeader?.split(" ")[1];
				if (!token) return toast.error("No token found");

				const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
					headers: { Authorization: `Bearer ${token}` },
				});

				if (!res.ok) throw new Error("Failed to fetch tasks");
				const data = await res.json();
				setTasks(data);
			} catch (err) {
				console.error(err);
				toast.error("Error loading tasks");
			}
		};

		fetchTasks();
	}, [authHeader]);

	const updateTaskStatus = async (
		taskId: string,
		newStatus: Task["status"]
	) => {
		try {
			const token = authHeader?.split(" ")[1];
			if (!token) return toast.error("No token found");

			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/tasks/${taskId}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ status: newStatus }),
				}
			);

			if (!res.ok) throw new Error("Failed to update task");

			toast.success("Task status updated");

			// Refresh tasks
			const updated = await res.json();
			setTasks((prev) =>
				prev.map((t) =>
					t.id === taskId ? { ...t, status: updated.status } : t
				)
			);
		} catch (err) {
			console.error(err);
			toast.error("Failed to update status");
		}
	};

	const renderTaskCard = (task: Task) => (
		<div
			key={task.id}
			className="bg-background-primary shadow-box-shadow1 rounded-lg p-4 flex flex-col gap-3"
		>
			<h3 className="font-header2 text-[24px] text-text-100">{task.title}</h3>
			<div
				className={`text-[20px] font-header3 px-2 py-1 my-4 rounded-[8px] w-fit ${statusColorMap[task.status]}`}
			>
				{new Date(task.dueDate).toLocaleDateString()}
			</div>
			<p className="text-[20px] font-header2 text-gray-500">
				{task.description}
			</p>
			<div className="border-b mt-[6px] border-b-text-100"></div>
			<div className="flex justify-between">
				<div className="flex justify-end mt-2">
					<select
						value={task.status}
						onChange={(e) =>
							updateTaskStatus(task.id, e.target.value as Task["status"])
						}
						className="bg-background-100 text-text-100 font-header3 text-[16px] rounded-[8px] px-4 py-2 border border-border shadow-box-shadow1 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
					>
						<option value="TODO">To do</option>
						<option value="IN_PROGRESS">In progress</option>
						<option value="COMPLETED">Completed</option>
					</select>
				</div>

				<div className="flex -space-x-2 mt-2 py-4 justify-end">
					{task.assignees.slice(0, 3).map((assignee) => (
						<img
							key={assignee.id}
							src={
								assignee.profile_picture.trim() !== ""
									? assignee.profile_picture
									: userAvatar
							}
							className="w-11 h-11 rounded-full bg-gray-300 border-2"
							title={assignee.fullName}
						/>
					))}
					{task.assignees.length > 3 && (
						<div className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-300 text-sm font-semibold text-gray-700 border-2 border-white">
							+{task.assignees.length - 3}
						</div>
					)}
				</div>
			</div>
		</div>
	);

	return (
		<div className="p-8 min-h-screen">
			<h1 className="text-[36px] font-header mb-8 text-text-100">Task Board</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{Object.entries(groupedTasks).map(([status, tasks]) => (
					<div key={status}>
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-[30px] font-header1">
								{status.replace("_", " ")}
							</h2>
						</div>
						<div className="space-y-4">
							{tasks.map((task) => renderTaskCard(task))}
							<button
								onClick={handleOpen}
								className="w-full mt-2 py-8 rounded-lg bg-gray-200 font-header3 hover:bg-gray-300 text-[20px]"
							>
								+ Add task
							</button>
						</div>
					</div>
				))}
			</div>
			<ModalLayout isOpen={isOpen} onClose={handleClose}>
				<Tasks />
			</ModalLayout>
		</div>
	);
};

export default TaskBoard;
