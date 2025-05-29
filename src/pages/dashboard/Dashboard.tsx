import React from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

/* ← import the widgets you already coded */
import CreateJoinCard from "./widgets/CreateJoinCard";
import TasksProgressCard from "./widgets/TasksProgressCard";
import CalendarWidget from "./widgets/CalendarWidget";
import ActiveGroupsCard from "./widgets/ActiveGroupsCard";
import UpcomingSessionsCard from "./widgets/UpcomingSessionsCard";
import AgendaCard from "./widgets/AgendaCard";
import ContributionsCard from "./widgets/ContributionsCard";
import DashboardDetailsBar from "../../components/layout/DashboardDetailsBar";

const DashboardHome: React.FC = () => {
	const authUser: {
		id: string;
		fullName: string;
		email: string;
		profilePicture: string;
	} | null = useAuthUser();

	return (
		<section className="flex justify-between gap-[15px] max-mm:grid max-mm:grid-cols-1 ">
			{/* ───────────── Greeting header ───────────── */}
			<div className="space-y-8 flex-1 max-mm:pt-14">
				<header>
					<h1 className="text-[36px] font-header text-text-100">
						Welcome Back,
					</h1>
					<p className="font-header1 text-[24px] text-text-100/[71%] mb-[58px]">
						{authUser?.fullName}
					</p>
				</header>

				{/* ───────────── Cards grid ───────────── */}

				<div
					className="
          md:flex md:justify-between md:gap-[24px] max-mm:pr-1 

        "
				>
					{/* Row 1 */}
					<CreateJoinCard className="flex-1 " />
					<TasksProgressCard className="flex-1 md:mt-[0px] mt-[40px]" />
				</div>

				<div
					className="
          md:flex md:justify-between md:gap-[24px] max-mm:pr-1

        "
				>
					{/* Row 2 */}
					<ActiveGroupsCard
						className="flex-1 max-mw:mb-11"
						header={"Active Groups"}
						button
					/>
					<div className="flex-1">
						<UpcomingSessionsCard className="" />
						<ContributionsCard className="mt-[20px] max-mw:mb-8" />
					</div>
				</div>

				{/* Row 3 */}
			</div>
			<DashboardDetailsBar>
				<CalendarWidget className=" max-mm:flex-1" />
				<AgendaCard className="max-mm:flex-1 mt-[48px] max-mm:mt-0" />
			</DashboardDetailsBar>
		</section>
	);
};

export default DashboardHome;
