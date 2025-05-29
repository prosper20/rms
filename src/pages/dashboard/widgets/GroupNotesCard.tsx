import Card1, { Card2 } from "../../../components/UI/Input/Card1";
import file from "../../../assets/images/Notes.svg";
import { CtaButton3 } from "../../../components/ButtonComponents/CtaButtons";
import { Fragment } from "react/jsx-runtime";
import { FileText } from "lucide-react";

interface NotesValue {
	id: number | string;
	img: string;
	alt: string;
	text: string;
	buttonValue: string;
}

interface Props {
	items?: NotesValue[];
	className?: string;
}

const NotesValueDefault: NotesValue[] = [
	{
		id: 1,
		img: file,
		alt: "image of notes",
		text: "Confusion Matrix - what it tells us",
		buttonValue: "View all",
	},
];

const GroupNotesCard: React.FC<Props> = ({
	className,
	items = NotesValueDefault,
}) => {
	const hasNotes = items && items.length > 0;

	return (
		<Card1 className={`px-[24px] pb-[19px] ${className}`} header={"Notes"}>
			<Card2 className="px-[16px] py-[19px] mt-7 rounded-[10px] mb-[8px]">
				{!hasNotes ? (
					<div className="flex flex-col items-center justify-center text-center py-10">
						<p className="text-[20px] font-header2 text-gray-400 mb-2">
							No notes available yet
						</p>
						<div className="w-[70px] h-[70px] rounded-full bg-gray-100 flex items-center justify-center">
							<FileText
								size={36}
								strokeWidth={1.2}
								className="text-[#747373]"
							/>
						</div>
					</div>
				) : (
					items.map((item) => (
						<Fragment key={item.id}>
							<div className="flex items-start justify-between gap-[20px]">
								<img
									src={item.img || file}
									alt={item.alt}
									className="w-[55px] h-[55px]"
								/>
								<p className="text-[20px] font-header2 text-text-100">
									{item.text}
								</p>
							</div>

							<CtaButton3 className="w-[125px] px-4 py-2 h-[25.56px] self-end text-[16px] mt-[22px] sm:mt-0 mb-[28px]">
								{item.buttonValue}
							</CtaButton3>
						</Fragment>
					))
				)}
			</Card2>
		</Card1>
	);
};

export default GroupNotesCard;
