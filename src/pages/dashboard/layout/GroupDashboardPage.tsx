import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Info } from "lucide-react";
import { toast } from "sonner";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

import ChatGroupCard from "../widgets/ChatGroupCard";
import GroupMeeting from "../widgets/GroupMeeting";
import GroupNotesCard from "../widgets/GroupNotesCard";
import GroupOverviewCard from "../widgets/GroupOverviewCard";
import GroupSessions from "../widgets/GroupSession";
import GroupTasks from "../widgets/GroupTasksCard";

const GroupDashboardPage: React.FC = () => {
	const { groupId } = useParams<{ groupId: string }>();
	const navigate = useNavigate();
	const authHeader = useAuthHeader();

	const [groupData, setGroupData] = useState<any>(null);

	useEffect(() => {
		const fetchGroupDashboard = async () => {
			try {
				const token = authHeader?.split(" ")[1];
				if (!token) {
					toast.error("No auth token found");
					return;
				}

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/groups/${groupId}/dashboard`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch group dashboard data");
				}

				const data = await response.json();
				setGroupData(data);
			} catch (error) {
				console.error(error);
				toast.error("Failed to load group dashboard");
			}
		};

		if (groupId) {
			fetchGroupDashboard();
		}
	}, [groupId, authHeader]);

	if (!groupData) {
		return <div className="p-8">Loading group dashboard...</div>;
	}

	return (
		<div className="flex flex-col gap-[50px] lg:w-[98%]">
			<header className="mt-[30px] sm:mt-[20px] flex items-center justify-between">
				<h1 className="text-[24px] sm:text-[36px] font-header text-text-100">
					{groupData.groupName || "Group Workspace"}
				</h1>

				<button
					onClick={() => navigate("info")}
					className="text-primary-500 hover:text-primary-700 transition"
					title="Group Info"
				>
					<Info className="w-10 h-10" />
				</button>
			</header>

			{/* first Grid */}
			<section className="flex flex-col gap-[50px] lg:grid lg:grid-cols-2 lg:gap-[15px]">
				<GroupOverviewCard
					groupDetails={{
						id: groupData.id,
						groupName: groupData.groupName,
						title: `Module: ${groupData.module || "No module"}`,
						details: groupData.description || "No description available.",
						memberCount: groupData.members?.length || 0,
					}}
					tags={groupData.tags?.map((tag: string, idx: number) => ({
						id: `${idx}`,
						tag,
						title: tag,
					}))}
				/>

				<GroupTasks
					groupId={groupData.id}
					items={groupData.tasks?.map((task: any) => ({
						id: task.id,
						title: task.title,
						status: task.status,
						description: task.description,
						assignees: task.assignees,
					}))}
				/>
			</section>

			<ChatGroupCard messages={groupData.chat?.messages || []} />

			{/* second Grid */}
			<section className="flex flex-col gap-[50px] lg:grid lg:grid-cols-2 lg:gap-[15px] xl:grid-cols-3">
				<GroupNotesCard
					items={groupData.notes?.map((note: any) => ({
						id: note.id,
						img: "",
						alt: "Note",
						text: note.title,
						buttonValue: "View All",
					}))}
					className="xl:flex-1"
				/>

				<GroupSessions
					items={groupData.sessions?.map((session: any) => ({
						id: session.id,
						img: "",
						alt: "Session",
						title: session.goal,
						time: `${new Date(session.date).toLocaleDateString()} ${session.time}`,
					}))}
					className="xl:flex-2"
				/>

				<GroupMeeting className="xl:flex-1" />
			</section>
		</div>
	);
};
export default GroupDashboardPage;

// import { useNavigate } from "react-router-dom";
// import { Info } from "lucide-react";

// import ChatGroupCard from "../widgets/ChatGroupCard";
// import GroupMeeting from "../widgets/GroupMeeting";
// import GroupNotesCard from "../widgets/GroupNotesCard";
// import GroupOverviewCard from "../widgets/GroupOverviewCard";
// import GroupSessions from "../widgets/GroupSession";
// import GroupTasks from "../widgets/GroupTasksCard";

// const GroupDashboardPage: React.FC = () => {
// 	const navigate = useNavigate();

// 	return (
// 		<div className="flex flex-col gap-[50px] lg:w-[98%]">
// 			<header className="mt-[30px] sm:mt-[20px] flex items-center justify-between">
// 				<h1 className="text-[24px] sm:text-[36px] font-header text-text-100">
// 					Project Pioneers Workspace
// 				</h1>

// 				<button
// 					onClick={() => navigate("info")}
// 					className="text-primary-500 hover:text-primary-700 transition"
// 					title="Group Info"
// 				>
// 					<Info className="w-10 h-10" />
// 				</button>
// 			</header>

// 			{/* first Grid */}
// 			<section className="flex flex-col gap-[50px] lg:grid lg:grid-cols-2 lg:gap-[15px]">
// 				<GroupOverviewCard />
// 				<GroupTasks />
// 			</section>

// 			<ChatGroupCard />

// 			{/* second Grid */}
// 			<section className="flex flex-col gap-[50px] lg:grid lg:grid-cols-2 lg:gap-[15px] xl:grid-cols-3">
// 				<GroupNotesCard className="xl:flex-1" />
// 				<GroupSessions className="xl:flex-2" />
// 				<GroupMeeting className="xl:flex-1" />
// 			</section>
// 		</div>
// 	);
// };
// export default GroupDashboardPage;
