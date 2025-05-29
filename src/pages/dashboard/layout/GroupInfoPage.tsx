import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card2 } from "../../../components/UI/Input/Card1";
// import brainImg from "../../../assets/images/Module Icon.svg";
import userAvatar from "../../../assets/user-images/avatar.png";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";

const GroupInfoPage = () => {
	const { groupId } = useParams<{ groupId: string }>();
	const authHeader = useAuthHeader();

	const [group, setGroup] = useState<any>(null);

	useEffect(() => {
		const fetchGroup = async () => {
			try {
				const token = authHeader?.split(" ")[1];
				if (!token) {
					toast.error("No auth token found");
					return;
				}

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/groups/${groupId}`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch group details");
				}

				const data = await response.json();
				setGroup(data);
			} catch (error) {
				console.error(error);
				toast.error("Failed to load group info");
			}
		};

		if (groupId) {
			fetchGroup();
		}
	}, [groupId, authHeader]);

	if (!group) {
		return <div className="p-8">Loading group information...</div>;
	}

	const tags = group.tags || [];

	return (
		<div className="px-4 py-6 flex flex-col gap-8">
			<h1 className="text-[24px] sm:text-[36px] font-header text-text-100">
				{group.groupName || "Group Workspace"}
			</h1>

			{/* Module Card */}
			{group.module && (
				<Card2 className="flex items-center gap-6 p-6 rounded-[8px] bg-background-primary">
					<img
						// src={brainImg} alt="Module Icon"
						className="w-[80px] h-[80px] rounded-full"
						src={`https://api.dicebear.com/8.x/shapes/svg?seed=${encodeURIComponent(group.groupName)}`}
					/>
					<div>
						<p className="text-[18px] text-text-100">Module:</p>
						<h2 className="text-[24px] font-header2 text-text-100">
							{group.module}
						</h2>
					</div>
				</Card2>
			)}

			{/* Members and Supervisor */}
			<div className="flex justify-between items-center">
				<div className="flex -space-x-4">
					{group.members
						?.slice(0, 5)
						.map((member: any) => (
							<img
								key={member.userId}
								src={member.user.profile_picture || userAvatar}
								alt={member.user.fullName}
								className="w-10 h-10 rounded-full border-2 border-white"
							/>
						))}
				</div>
				<p className="text-text-100 font-header2">
					Supervisor: {group.supervisor ? group.supervisor.fullName : "None"}
				</p>
			</div>

			{/* Group Description */}
			<div>
				<h2 className="font-header2 text-[20px] mb-2 text-text-100">
					Group Description
				</h2>
				<p className="text-[16px] text-text-100/[68%]">
					{group.description || "No description available."}
				</p>
			</div>

			{/* Purpose Section */}
			{group.purpose && (
				<div
					className={` flex flex-col p-6 rounded-[12px] bg-background-primary`}
				>
					<h2 className="text-[22px] font-header2 text-text-100 mb-2">
						Purpose
					</h2>
					<p className="text-[16px] text-text-100/[80%]">{group.purpose}</p>
				</div>
				// <Card2 className="p-6 rounded-[12px] bg-background-primary shadow-box-shadow1">

				// </Card2>
			)}

			{/* Tags */}
			{tags.length > 0 && (
				<div className="flex flex-wrap gap-2 mt-4">
					{tags.map((tag: string) => (
						<span
							key={tag}
							className="bg-[#D8C4AA] text-[#5C4033] rounded-lg px-4 py-2 text-sm font-semibold"
						>
							{tag}
						</span>
					))}
				</div>
			)}

			{/* Roles Section */}
			<div className="mt-8">
				<h2 className="font-header2 text-[24px] text-text-100 mb-4">Roles</h2>
				<div className="flex flex-col gap-4">
					{group.groupRoles.map((role: any) => (
						<div key={role.id} className="flex flex-col gap-1">
							<p className="text-text-100 font-header2 text-[18px]">
								{role.title}
							</p>
							<div className="bg-[#D8C4AA] p-3 rounded-[8px]">
								<h3 className="text-[#5C4033] font-semibold">
									{role.user.fullName}
								</h3>
								<p className="text-[#5C4033] text-sm">{role.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Quick Stats */}
			<div className="mt-8">
				<h2 className="font-header2 text-[24px] text-text-100 mb-4">
					Quick Stats
				</h2>
				<div className="flex flex-col gap-4">
					<Card2 className="flex justify-between items-center px-4 py-4">
						<div className="flex items-center gap-2">
							<span className="w-3 h-3 bg-pink-500 rounded-full"></span>
							<p className="text-text-100">Total Tasks</p>
						</div>
						<p className="text-text-100 text-sm">{group.tasks?.length || 0}</p>
					</Card2>
					<Card2 className="flex justify-between items-center px-4 py-4">
						<div className="flex items-center gap-2">
							<span className="w-3 h-3 bg-pink-500 rounded-full"></span>
							<p className="text-text-100">Total Sessions</p>
						</div>
						<p className="text-text-100 text-sm">
							{group.sessions?.length || 0}
						</p>
					</Card2>
				</div>
			</div>
		</div>
	);
};

export default GroupInfoPage;
