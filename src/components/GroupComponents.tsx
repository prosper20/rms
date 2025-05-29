import { CtaButton3 } from "./ButtonComponents/CtaButtons";
import { Card2 } from "./UI/Input/Card1";
import { Circle } from "lucide-react";

interface Props {
	img: string;
	supervisor: string;
}

const GroupComponent1: React.FC<Props> = ({ img, supervisor }) => {
	return (
		<div className="flex justify-between items-center flex-wrap gap-[30px] ">
			<img src={img} alt="image of grouped avatar" />
			<p className="font-header3 text-[23px] sm:text-[28px] text-text-100">
				Supervisor: {supervisor}
			</p>
		</div>
	);
};

export default GroupComponent1;

interface Props2 {
	desc: string;
	courses: string[];
}

export const GroupComponent2: React.FC<Props2> = ({ desc, courses }) => {
	return (
		<div>
			<h1 className="text-[23px] sm:text-[26px] font-header3 text-text-100 mb-[26px]">
				Group Description
			</h1>
			<p className="text-[18px] sm:text-[26px] font-header2 text-text-100 mb-[53px]">
				{desc}
			</p>
			<div className="flex justify-between flex-wrap gap-[10px]">
				{courses.map((course) => {
					return (
						<CtaButton3 className="w-[120px] text-[17px] sm:text-[20px] py-2 sm:w-[160px] mb-5">
							{course}
						</CtaButton3>
					);
				})}
			</div>
		</div>
	);
};

interface role {
	name: string;
	roleplayer: string;
	desc: string;
}

interface Prop3 {
	roles: role[];
}

export const GroupComponent3: React.FC<Prop3> = ({ roles }) => {
	return (
		<div>
			<header className="mb-[32px]">
				<h1 className="text-[24px] sm:text-[36px] font-header3 text-text-100">
					Roles
				</h1>
			</header>

			<ul>
				{roles.map((role) => {
					return (
						<li key={role.name}>
							<div className="lg:flex lg:justify-between gap-5 grid">
								<h1 className="text-[24px] font-header3 capitalize text-text-100]">
									{role.name}
								</h1>
								<div className="bg-background-card w-[100%] lg:w-[80%]  text-[18px] p-4 py-8 lg:py-0 justify-between rounded-[8px] mb-7">
									<p>{role.roleplayer}</p>
									<p className="">{role.desc}</p>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

interface Props4 {}

export const GroupComponent4: React.FC<Props4> = () => {
	return (
		<div className="w-[99%] mx-auto">
			<header>
				<h1 className="text-[24px] sm:text-[36px] font-header3 text-text-100 mb-[17px]">
					Quick Stats
				</h1>
				<Card2 className="!shadow-box-shadow1 rounded-[8px] py-[12px] mb-[48px]">
					<Card2 className="mx-[12px] sm:mx-[39px] rounded-[6px]">
						<div className="flex justify-between items-center px-[25px] py-[5px]">
							<div className="flex items-center  gap-[20px] ">
								<Circle
									size={9}
									className="bg-[#E43A6E] text-[#E43A6E] rounded-full"
								/>
								<p className="text-[16px] sm:text-[20px]">Clarity call</p>
							</div>
							<p className="text-[16px] sm:text-[20px]">
								Monday, April 14 at 1:00 PM
							</p>
						</div>
					</Card2>
					<Card2 className="mx-[12px] sm:mx-[39px] my-[16px] rounded-[6px]">
						<div className="flex justify-between px-[25px] py-[5px]">
							<div className="flex items-center gap-[20px]">
								<Circle
									size={9}
									className="bg-[#E43A6E] text-[#E43A6E] rounded-full"
								/>
								<p className="text-[16px] sm:text-[20px]">Pending tasksl</p>
							</div>
							<p className="text-[16px] sm:text-[20px]">3</p>
						</div>
					</Card2>
				</Card2>
			</header>
		</div>
	);
};
