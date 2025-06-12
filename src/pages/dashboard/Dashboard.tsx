import React from "react";

import TasksProgressCard from "./widgets/TasksProgressCard";
import CalendarWidget from "./widgets/CalendarWidget";
import ActiveGroupsCard from "./widgets/ActiveGroupsCard";
import ContributionsCard from "./widgets/ContributionsCard";

const DashboardHome: React.FC = () => {
	return (
		<section className="m-4 md:m-8 flex justify-between gap-[15px] max-mm:grid max-mm:grid-cols-1 ">
			<div className="space-y-8 flex-1 max-mm:pt-14">
				<div
					className="
          md:flex md:justify-between md:gap-[24px] max-mm:pr-1 

        "
				>
					<TasksProgressCard className="flex-1 md:mt-[0px] mt-[40px]" />
				</div>

				<div
					className="
          md:flex md:justify-between md:gap-[24px] max-mm:pr-1

        "
				>
					<ActiveGroupsCard
						className="flex-1 max-mw:mb-11"
						header={"Active Vendors"}
						button
					/>
					<div className="flex-1">
						<ContributionsCard className="mt-[20px] max-mw:mb-8" />
					</div>
				</div>
			</div>
			<div>
				<CalendarWidget className=" max-mm:flex-1" />
			</div>
		</section>
	);
};

export default DashboardHome;
