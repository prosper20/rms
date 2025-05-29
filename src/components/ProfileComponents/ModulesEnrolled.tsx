import Card1 from "../UI/Input/Card1";
import Shadow1 from "../UI/Input/Shadows";

export interface ModuleEnrolled {
	id: string;
	name: string;
	members: number;
	img: string;
}

interface Props {
	groups?: ModuleEnrolled[];
	className?: string;
}

const modules: ModuleEnrolled[] = [
	{
		id: "1",
		name: "Machine Learning Fundamentals",
		members: 5,
		img: "/Vector.svg",
	},
	{
		id: "2",
		name: "Creative Writing for Digital Media",
		members: 2,
		img: "/Vector.svg",
	},
	{
		id: "3",
		name: "Design Thinking & UX Principles",
		members: 6,
		img: "/Vector.svg",
	},
	{
		id: "4",
		name: "Project Management Basics",
		members: 4,
		img: "/Vector.svg",
	},
];

const users = "/Vector.svg";

const ModulesEnrolled: React.FC<Props> = ({ groups = modules }) => {
	return (
		<Card1 className="!shadow-profile-info" header="Modules Enrolled In">
			<ul className="px-8 flex flex-col gap-[22px] mt-[17px] pb-[40px]">
				{groups.map((g) => (
					<Shadow1
						key={g.id}
						className="h-[62px] pl-[13px] py-[10px] pr-[20px] text-[#747373] flex items-center justify-between gap-[25px]"
					>
						<div className="flex gap-9 items-center">
							<div className="w-[33px] h-[33px] sm:w-[53px] sm:h-[53px] rounded-[999px] border border-gray-400 bg-cubepink place-content-center place-items-center">
								{/* <Box size={38} strokeWidth={0.7} className="text-purple-500" /> */}
								<img
									className="rounded-[999px] border border-gray-400 "
									src={g.img}
									alt=""
								/>
							</div>
							<div className="font-header1">
								<p className="text-[16px] mb-[4px]">{g.name}</p>
							</div>
						</div>
						<div className="flex items-center gap-[6px]">
							<img
								src={users}
								width={16}
								height={16}
								className="mt-[-3px]"
								alt="User Icon"
							/>
							<p className="text-[14px]">{g.members}</p>
						</div>
					</Shadow1>
				))}
			</ul>
		</Card1>
	);
};

export default ModulesEnrolled;
