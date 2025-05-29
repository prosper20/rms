import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";

import Card1 from "../components/UI/Input/Card1";

const Projects: React.FC = () => {
	const navigate = useNavigate();
	const authHeader = useAuthHeader();

	const [searchTerm, setSearchTerm] = useState("");
	const [groupName, setGroupName] = useState("");
	const [description, setDescription] = useState("");
	const [purpose, setPurpose] = useState("");
	const [module] = useState("");
	const [supervisorId] = useState<string | null>(null);
	// const [tagInput, setTagInput] = useState("");
	const [tags] = useState<string[]>([]);

	const handleCreateGroup = async () => {
		try {
			const token = authHeader?.split(" ")[1];
			if (!token) {
				toast.error("No auth token found");
				return;
			}

			const response = await fetch(`${import.meta.env.VITE_API_URL}/groups`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					groupName,
					description,
					purpose,
					module,
					tags,
					supervisor: supervisorId,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to create group");
			}

			const data = await response.json();
			toast.success("Group created successfully!");
			navigate(`/dashboard/groups/${data.id}`);
		} catch (error) {
			console.error(error);
			toast.error("Failed to create group");
		}
	};

	const [groups, setGroups] = useState<
		{
			id: string;
			groupName: string;
			description: string;
			purpose: string;
			module: string | null;
			tags: string[];
			created_at: string;
			updated_at: string;
			members: {
				id: string;
				groupId: string;
				userId: string;
				user: {
					id: string;
					fullName: string;
					email: string;
					role: string;
					profile_picture: string;
				};
			}[];
		}[]
	>([]);

	const filteredGroups = groups.filter((group) =>
		group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	useEffect(() => {
		const fetchGroups = async () => {
			try {
				const token = authHeader?.split(" ")[1];
				if (!token) {
					toast.error("No auth token found");
					return;
				}

				const response = await fetch(`${import.meta.env.VITE_API_URL}/groups`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					throw new Error("Failed to fetch groups");
				}

				const data = await response.json();
				setGroups(data); // directly save the array of groups
			} catch (error) {
				console.error(error);
				toast.error("Failed to load groups");
			}
		};

		fetchGroups();
	}, [authHeader]);

	const [, setSupervisors] = useState<
		{
			id: string;
			fullName: string;
			email: string;
			role: string;
			profile_picture: string;
		}[]
	>([]);

	useEffect(() => {
		const fetchSupervisors = async () => {
			try {
				const token = authHeader?.split(" ")[1];
				if (!token) {
					toast.error("No auth token found");
					return;
				}

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/users?role=SUPERVISOR`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch supervisors");
				}

				const data = await response.json();
				setSupervisors(data.users);
			} catch (error) {
				console.error(error);
				toast.error("Failed to load supervisors");
			}
		};

		fetchSupervisors();
	}, [authHeader]);

	const colors = ["#C5BD1B", "#B28B50", "#9747FF", "#E43A6E"];

	function getColorFromInitials(initials: string) {
		if (!initials) return colors[0];

		const firstChar = initials[0].toUpperCase();
		const charCode = firstChar.charCodeAt(0);
		const colorIndex = charCode % colors.length;
		return colors[colorIndex];
	}

	// const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
	//     if (e.key === "Enter" && tagInput.trim()) {
	//         e.preventDefault();
	//         setTags((prev) => [...prev, tagInput.trim()]);
	//         setTagInput("");
	//     }
	// };

	// const handleRemoveTag = (tagToRemove: string) => {
	//     setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
	// };

	return (
		<div className=" w-full flex flex-col lg:flex-row gap-8 px-4 py-8">
			{/* Left Side: Group List */}
			<div className="flex-1 w-full md:max-w-[60%]">
				<Card1
					header="Create Project"
					className="p-6 min-h-[80vh] flex flex-col gap-6"
				>
					<input
						type="text"
						placeholder="Project Title"
						className="w-full py-6 text-[14px] px-4 border rounded-[12px] bg-background-primary shadow-box-shadow1 focus:outline-none"
						value={groupName}
						onChange={(e) => setGroupName(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Project description"
						className="w-full py-6 text-[14px] px-4 border rounded-[12px] bg-background-primary shadow-box-shadow1 focus:outline-none"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>

					<input
						type="text"
						placeholder="Tasks/subtasks (optional)"
						className="w-full py-6 text-[14px] px-4 border rounded-[12px] bg-background-primary shadow-box-shadow1 focus:outline-none"
						value={purpose}
						onChange={(e) => setPurpose(e.target.value)}
					/>

					<button
						onClick={handleCreateGroup}
						type="button"
						className="bg-[#B28B50] text-white font-semibold text-lg py-6 text-[14px] rounded-[12px] shadow-md mt-6"
					>
						Create Group
					</button>
				</Card1>
			</div>

			{/* Right Side: Overview Card (Desktop only) */}
			<div className="hidden lg:block w-full max-w-[40%]">
				<Card1
					header="Previously Posted Projects"
					className="p-6 min-h-full md:min-h-[80vh]"
				>
					<div className="relative mb-6">
						<input
							type="text"
							placeholder="Search groups ..."
							className="w-full py-3 mt-8 pl-4 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<span className="absolute right-3 top-3 text-gray-400">🔍</span>
					</div>

					<div className="flex flex-col">
						{filteredGroups.map((group, index) => (
							<div
								key={group.id}
								onClick={() => navigate(`/dashboard/groups/${group.id}`)}
								className={`flex items-center justify-between py-4 cursor-pointer transition ${
									index !== filteredGroups.length - 1
										? "border-b border-border-200"
										: ""
								}`}
							>
								<div className="flex items-center gap-4">
									<div
										className="w-12 h-12 flex items-center justify-center rounded-[8px] text-white font-bold text-lg"
										style={{
											backgroundColor: getColorFromInitials(
												group.groupName.substring(0, 2)
											),
											aspectRatio: "1 / 1",
										}}
									>
										{group.groupName.substring(0, 2)}
									</div>
									<div>
										<h3 className="font-semibold text-[18px] text-text-100">
											{group.groupName}
										</h3>
										<p className="text-sm text-text-100/[68%]">
											{group.description}
										</p>
									</div>
								</div>
								<button
									className="text-text-100 text-2xl hover:text-primary-500"
									onClick={(e) => e.stopPropagation()}
								>
									...
								</button>
							</div>
						))}
					</div>
					<div className="flex justify-end mt-9">
						<button className="border-[#9F7740] border rounded-[10px] px-4 py-2 underline text-[16px] font-header3">
							View All
						</button>
					</div>
				</Card1>
			</div>
		</div>
	);
};

export default Projects;
