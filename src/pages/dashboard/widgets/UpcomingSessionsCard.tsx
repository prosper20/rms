import React from "react";
import Card1 from "../../../components/UI/Input/Card1";
import Shadow1, { Shadow2 } from "../../../components/UI/Input/Shadows";
import CtaButton1 from "../../../components/ButtonComponents/CtaButtons";

interface Session {
	id: string;
	date: string; // ISO
	title: string;
	subtitle: string;
}

interface Props {
	sessions?: Session[];
	className?: string;
}

const sampleSessions: Session[] = [
	{
		id: "1",
		date: "2025-04-16T11:00:00Z",
		title: "Kickoff & Icebreakers",
		subtitle: "sem 2B | 11:00 AM",
	},
	{
		id: "2",
		date: "2025-04-16T09:00:00Z",
		title: "Coding Jam Session",
		subtitle: "sem 1B | 09:00 AM",
	},
];

const UpcomingSessionsCard: React.FC<Props> = ({
	className,
	sessions = sampleSessions,
}) => (
	<Card1
		header={"Upcoming sessions"}
		buttonText="View all"
		className={`pb-[30px] ${className}`}
		headButton
		isStroked
	>
		<ul className="divide-y divide-gray-100">
			{sessions.map((s) => (
				<Shadow1
					key={s.id}
					className="h-[62px] mt-[11px] mx-[16px] py-[10px] text-[#747373] pr-[13px] justify-start flex items-center gap-[10px]"
				>
					{/* Date pill */}
					<Shadow2 className="flex flex-col w-[57px] h-[62px] justify-center items-center">
						<span className="text-lightpink text-[12px] font-header2">
							{new Date(s.date).toLocaleString("en", { month: "short" })}
						</span>
						<span className="text-lightpink text-[18px] font-header2">
							{new Date(s.date).getDate()}
						</span>
					</Shadow2>

					<div className=" w-[146px]">
						<p className="font-header2 text-[14px] text-text-100 ">{s.title}</p>
						<p className="text-[12px] text-gray-500">{s.subtitle}</p>
					</div>

					<CtaButton1>Join</CtaButton1>
				</Shadow1>
			))}
		</ul>
	</Card1>
);

export default UpcomingSessionsCard;
