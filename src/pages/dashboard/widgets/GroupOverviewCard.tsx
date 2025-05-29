import Card1, { Card2 } from "../../../components/UI/Input/Card1";
// import { CtaButton3 } from "../../../components/ButtonComponents/CtaButtons";
import { Link } from "react-router-dom";
import { getColorFromInitials } from "../../../utils/utilities";

interface TagProps {
	id: string;
	tag: string;
	title: string;
}

interface GroupDetails {
	id: string;
	groupName: string;
	title: string;
	details: string;
	memberCount: number;
}

interface Props {
	groupDetails: GroupDetails;
	tags: TagProps[];
	className?: string;
}

const GroupOverviewCard: React.FC<Props> = ({
	groupDetails,
	tags,
	className,
}) => {
	return (
		<Card1 header="Group Overview" className={`px-6 py-6 ${className}`}>
			<Card2 className="py-6 px-4 rounded-[8px]">
				{/* Header Row */}
				<div className="flex justify-between items-center gap-4 mb-6 flex-wrap">
					<div className="flex items-center gap-4">
						<div
							className="w-[73px] h-[73px] flex items-center justify-center rounded-[8px] text-white font-bold text-[28px] leading-none"
							style={{
								backgroundColor: getColorFromInitials(
									groupDetails.groupName.substring(0, 2)
								),
								aspectRatio: "1 / 1",
							}}
						>
							{groupDetails.groupName.substring(0, 2)}
						</div>

						<Link to={`/dashboard/groups/${groupDetails.id}/info`}>
							<p className="text-wrap cursor-pointer hover:underline font-header2 text-[20px] sm:text-[24px] text-text-100">
								{groupDetails.title}
							</p>
						</Link>
					</div>

					<p className="text-[18px] font-header3 text-text-100">
						Total members: {groupDetails.memberCount}
					</p>
				</div>

				{/* Description */}
				<p className="text-[16px] text-text-100/[68%] font-header2 mb-6">
					{groupDetails.details}
				</p>

				{/* Tags */}
				<div className="flex gap-2 flex-wrap">
					{tags.map((tag) => (
						<span
							key={tag.id}
							className="inline-flex items-center justify-center px-4 lg:h-[29px] md:w-[137px] md:h-[36px] text-[16px] md:text-[20px] font-header1 text-border bg-background-card rounded-[8px]"
						>
							{tag.title}
						</span>
					))}
				</div>
			</Card2>
		</Card1>
	);
};

export default GroupOverviewCard;
