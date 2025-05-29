import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";

import Card1 from "../../../components/UI/Input/Card1";

const CreateGroupPage: React.FC = () => {
	const navigate = useNavigate();
	const authHeader = useAuthHeader();

	const [searchTerm, setSearchTerm] = useState("");
	const [groupName, setGroupName] = useState("");
	const [description, setDescription] = useState("");
	const [purpose, setPurpose] = useState("");
	const [module, setModule] = useState("");
	const [supervisorId, setSupervisorId] = useState<string | null>(null);
	const [tagInput, setTagInput] = useState("");
	const [tags, setTags] = useState<string[]>([]);

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
					supervisorId,
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

	const [supervisors, setSupervisors] = useState<
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

	const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && tagInput.trim()) {
			e.preventDefault();
			setTags((prev) => [...prev, tagInput.trim()]);
			setTagInput("");
		}
	};

	const handleRemoveTag = (tagToRemove: string) => {
		setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
	};

	return (
		<div className=" w-full flex flex-col lg:flex-row gap-8 px-4 py-8">
			{/* Left Side: Group List */}
			<div className="flex-1 w-full md:max-w-[60%]">
				<Card1
					header="Create a New Group"
					className="p-6 min-h-[80vh] flex flex-col gap-6"
				>
					<input
						type="text"
						placeholder="Group name"
						className="w-full py-6 text-[14px] px-4 border rounded-[12px] bg-background-primary shadow-box-shadow1 focus:outline-none"
						value={groupName}
						onChange={(e) => setGroupName(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Group description"
						className="w-full py-6 text-[14px] px-4 border rounded-[12px] bg-background-primary shadow-box-shadow1 focus:outline-none"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>

					<input
						type="text"
						placeholder="Purpose of the group"
						className="w-full py-6 text-[14px] px-4 border rounded-[12px] bg-background-primary shadow-box-shadow1 focus:outline-none"
						value={purpose}
						onChange={(e) => setPurpose(e.target.value)}
					/>

					{/* Supervisor Select */}
					<select
						className="w-full appearance-none p-4 pl-4 pr-8 text-[14px] rounded-[12px] border focus:caret-primary-300 focus:border-primary-300 bg-background-primary shadow-box-shadow1 focus:outline-none text-slate-400/80 font-[100]"
						value={supervisorId || ""}
						onChange={(e) => setSupervisorId(e.target.value || null)}
					>
						<option value="">Select Supervisor (optional)</option>
						{supervisors.map((sup) => (
							<option key={sup.id} value={sup.id}>
								{sup.fullName}
							</option>
						))}
					</select>

					<input
						type="text"
						placeholder="Module (optional)"
						className="w-full py-6 text-[14px] px-4 border rounded-[12px] bg-background-primary shadow-box-shadow1 focus:outline-none"
						value={module}
						onChange={(e) => setModule(e.target.value)}
					/>

					{/* Tags Input */}
					<div className="flex flex-col gap-2">
						<input
							type="text"
							placeholder="Enter tags and press Enter"
							className="w-full py-6 text-[14px] px-4 border rounded-[12px] bg-background-primary shadow-box-shadow1 focus:outline-none"
							value={tagInput}
							onChange={(e) => setTagInput(e.target.value)}
							onKeyDown={handleAddTag}
						/>
						<div className="flex flex-wrap gap-2">
							{tags.map((tag) => (
								<span
									key={tag}
									className=" font-semibold bg-[#D8C4AA] text-[#5C4033] rounded-lg pl-4 pr-2 py-1 text-lg flex items-center gap-2"
								>
									{tag}
									<button
										onClick={() => handleRemoveTag(tag)}
										className="ml-1 font-semibold text-[12px]"
									>
										×
									</button>
								</span>
							))}
						</div>
					</div>

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
					header="Join an existing group"
					className="p-6 min-h-full md:min-h-[80vh]"
				>
					<div className="relative mb-6">
						<input
							type="text"
							placeholder="Search groups ..."
							className="w-full py-3 pl-4 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<span className="absolute right-3 top-3 text-gray-400">🔍</span>
					</div>

					<h2 className="text-lg font-semibold mb-4 text-text-100 border-b border-border-200">
						Groups related to you
					</h2>

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
				</Card1>
			</div>
		</div>
	);
};

export default CreateGroupPage;
