import React, { useEffect, useState, FormEvent } from "react";
import { Input, SelectInput2 } from "./Input/Inputs";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";

interface Student {
	id: string;
	fullName: string;
	email: string;
}

interface Group {
	id: string;
	groupName: string;
}

interface Project {
	id: string;
	name: string;
}

interface Props {
	groupId?: string;
}

const Tasks: React.FC<Props> = ({ groupId }) => {
	const authHeader = useAuthHeader();
	const token = authHeader?.split(" ")[1];

	const [students, setStudents] = useState<Student[]>([]);
	const [groups, setGroups] = useState<Group[]>([]);
	const [projects, setProjects] = useState<Project[]>([]);

	const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		dueDate: "",
		tag: "",
		groupId: groupId || "",
		projectId: "",
	});

	useEffect(() => {
		if (groupId) setFormData((prev) => ({ ...prev, groupId }));
	}, [groupId]);

	useEffect(() => {
		const fetchInitialData = async () => {
			if (!token) return toast.error("No auth token found");

			try {
				const [studentsRes, groupsRes, projectsRes] = await Promise.all([
					fetch(`${import.meta.env.VITE_API_URL}/users?role=STUDENT`, {
						headers: { Authorization: `Bearer ${token}` },
					}),
					fetch(`${import.meta.env.VITE_API_URL}/groups`, {
						headers: { Authorization: `Bearer ${token}` },
					}),
					fetch(`${import.meta.env.VITE_API_URL}/projects`, {
						headers: { Authorization: `Bearer ${token}` },
					}),
				]);

				if (!studentsRes.ok || !groupsRes.ok || !projectsRes.ok)
					throw new Error("One or more requests failed");

				const studentsData = await studentsRes.json();
				const groupsData = await groupsRes.json();
				const projectsData = await projectsRes.json();

				setStudents(studentsData.users || []);
				setGroups(groupsData || []);
				setProjects(projectsData || []);
			} catch (err) {
				console.error(err);
				toast.error("Failed to fetch required data");
			}
		};

		fetchInitialData();
	}, [token]);

	const toggleAssignee = (id: string) => {
		setSelectedAssignees((prev) =>
			prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
		);
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!token) {
			toast.error("No auth token found");
			return;
		}

		const payload = {
			...formData,
			dueDate: new Date(formData.dueDate).toISOString(),
			groupId: formData.groupId || null,
			projectId: formData.projectId || null,
			tag: formData.tag || "general",
			status: "TODO",
			assigneeIds: selectedAssignees,
		};

		try {
			setLoading(true);
			const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			});

			if (!res.ok) throw new Error("Task creation failed");

			toast.success("Task created successfully!");
			setFormData({
				title: "",
				description: "",
				dueDate: "",
				tag: "",
				groupId: groupId || "",
				projectId: "",
			});
			setSelectedAssignees([]);
		} catch (err) {
			console.error(err);
			toast.error("Failed to create task");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h2 className="text-[18px] md:text-[36px] font-header text-border mb-4">
				Add Task
			</h2>
			<hr className="border-b border-black/[60%] mb-6" />

			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				<div className="flex flex-col md:flex-row gap-4">
					<Input
						label="Title"
						name="title"
						value={formData.title}
						onChange={handleChange}
						required
					/>
					<Input
						label="Tag"
						name="tag"
						value={formData.tag}
						onChange={handleChange}
						placeholder="e.g. scrum"
					/>
				</div>

				<div className="flex flex-col md:flex-row gap-4">
					<Input
						label="Description"
						name="description"
						value={formData.description}
						onChange={handleChange}
						required
					/>
					<Input
						label="Due Date"
						name="dueDate"
						type="datetime-local"
						value={formData.dueDate}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="flex flex-col md:flex-row gap-4">
					{!groupId && (
						<SelectInput2
							id="groupId"
							name="groupId"
							label="Group"
							options={groups.map((g) => ({ label: g.groupName, value: g.id }))}
							value={formData.groupId}
							onChange={handleChange}
							placeholder="Select a group"
						/>
					)}
					<SelectInput2
						id="projectId"
						name="projectId"
						label="Project"
						options={[
							{ label: "None", value: "" },
							...projects.map((p) => ({ label: p.name, value: p.id })),
						]}
						value={formData.projectId}
						onChange={handleChange}
						placeholder="Select a project"
					/>
				</div>

				<div className="flex flex-col w-full">
					<label className="text-[16px] md:text-[24px] text-border font-header mb-1">
						Assign to:
					</label>
					<div className="flex flex-wrap gap-3">
						{students.map((student) => (
							<label
								key={student.id}
								className={`flex items-center gap-2 px-4 py-2 md:h-[52px] rounded-full border shadow-add-task border-border/[40%] bg-background-100 text-[16px] md:text-[20px] font-header2 text-border cursor-pointer hover:bg-brown-50 transition`}
							>
								<input
									type="checkbox"
									className="accent-brown-800 w-4 h-4"
									value={student.id}
									checked={selectedAssignees.includes(student.id)}
									onChange={() => toggleAssignee(student.id)}
								/>
								<span>{student.fullName}</span>
							</label>
						))}
					</div>
				</div>

				<div className="flex justify-end">
					<button
						type="submit"
						disabled={loading}
						className="mt-4 rounded-full border border-brown-800 text-brown-800 font-header shadow-add-task bg-background-100 px-8 md:w-[178px] md:h-[52px] hover:bg-brown-100 transition text-[16px] md:text-[32px]"
					>
						{loading ? "Creating..." : "Add"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Tasks;
