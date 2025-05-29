import Card1, { Card2 } from "../../../components/UI/Input/Card1";
import img1 from "../../../assets/images/Decision.svg";
import img2 from "../../../assets/images/Time Limit.svg";
import img3 from "../../../assets/images/Error.svg";

interface MeetingProps {
	id: string | number;
	meeting: string;
	img: string;
	alt: string;
	no: number;
}

interface Props {
	items?: MeetingProps[];
	className?: string;
}

const meeting: MeetingProps[] = [
	{
		id: 1,
		meeting: "Decisions",
		img: img1,
		alt: "img of decision",
		no: 1,
	},
	{
		id: 2,
		meeting: "Deadlines",
		img: img2,
		alt: "img of deadlines",
		no: 2,
	},
	{
		id: 3,
		meeting: "Issues",
		img: img3,
		alt: "img of issues",
		no: 3,
	},
];

const GroupMeeting: React.FC<Props> = ({ className, items = meeting }) => {
	return (
		<Card1 header="Meetings" className={`pb-[20px] ${className}`}>
			<Card2 className="mx-[24px] px-[10px] py-[19px] rounded-[8px] flex flex-col gap-[20px] mt-[10px]">
				{items.map((item) => {
					return (
						<div key={item.id} className="flex justify-between items-center">
							<div className="flex gap-[10px] items-center">
								<img
									className="w-[32px] h-[32px]"
									src={item.img}
									alt={item.alt}
								/>
								<p className="text-[20px] font-header2">{item.meeting}</p>
							</div>
							<p className="text-[20px] font-header2">{item.no}</p>
						</div>
					);
				})}
			</Card2>
		</Card1>
	);
};

export default GroupMeeting;
