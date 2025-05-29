import {
	AlertTriangle,
	Clock,
	HelpCircle,
	LucideCircleX,
	SaveIcon,
	List,
	LetterText,
	LucideTags,
} from "lucide-react";
// components/Card.tsx
import React from "react";

interface CardProps {
	header: string;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ header, setIsOpen, children }) => {
	function handleCloseSideBar() {
		setIsOpen(false);
	}

	return (
		<div className="rounded-lg shadow-box-shadow1 relative max-w-[320px] min-w-[270px] max-sw:w-[100%] max-sw:min-w-0 max-sw:max-w-[100%] bg-background-transparent border-[2px] pb-[40vh] border-background-card ">
			<div className="px-4 py-2 text-text-100 text-[20px] font-semibold rounded-t-lg">
				<div className="flex justify-between items-center">
					<LucideCircleX
						className="cursor-pointer"
						onClick={handleCloseSideBar}
						size={26}
						color="red"
					/>
					<SaveIcon size={26} color="darkgreen" />
				</div>
				<div className="border-b-sidebar-200 border-b-[1px] mt-2 mb-[20px]"></div>
				{header}
			</div>
			<div className="p-4">{children}</div>
			<div className="border-t-[3px] border-t-black/[20%] absolute bottom-0 w-full h-[44px]"></div>
			<LetterText
				className="cursor-pointer absolute bottom-1 left-[45%]"
				size={36}
				color="black"
			/>
			<List
				className="cursor-pointer absolute bottom-1 left-10"
				size={36}
				color="black"
			/>
			<LucideTags
				size={36}
				color="black"
				className="absolute bottom-1 right-5 cursor-pointer"
			/>
		</div>
	);
};

// components/ListItem.tsx

interface ListItemProps {
	title: string;
	description?: string;
	icon?: React.ReactNode;
}

export const ListItem: React.FC<ListItemProps> = ({
	title,
	description,
	icon,
}) => {
	return (
		<div className="flex items-center space-x-3 mb-[15px]">
			{icon && <div className="flex-shrink-0">{icon}</div>}
			<div>
				<p className="text-[16px] font-medium text-gray-900">{title}</p>
				{description && (
					<p className="text-[14px] text-wrap text-gray-500">{description}</p>
				)}
			</div>
		</div>
	);
};

// pages/index.tsx (example usage)

interface HomeProps {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home: React.FC<HomeProps> = ({ setIsOpen }) => {
	return (
		<div className="container mx-auto p-4">
			<Card setIsOpen={setIsOpen} header="Data Preprocessing Review">
				<div className="border-b-sidebar-200 border-b-[1px] mt-2 mb-[20px]"></div>

				<div className="bg-background-primary mb-[20px] p-7">
					<ListItem
						title="Decision"
						description="All missing categorical values will be filled using mode imputation"
						icon={<HelpCircle className="h-7 w-7 text-yellow-500" />}
					/>
					<ListItem
						title="Deadline"
						description="Submit cleaned dataset by March 30, 2025"
						icon={<Clock className="h-7 w-7 text-red-500" />}
					/>
					<ListItem
						title="Issues"
						description="Git merge conflicts arose during dataset versioning."
						icon={<AlertTriangle className="h-7 w-7 text-red-600" />}
					/>
				</div>
			</Card>
		</div>
	);
};

export default Home;
