import { Card2 } from "./UI/Input/Card1";

interface Props {
	image: string;
	alt?: string;
	text: string;
}

const GroupHeader: React.FC<Props> = ({ image, alt, text }) => {
	return (
		<Card2 className="bg-white !shadow-box-shadow1 rounded-[8px] sm:pr-[200px]">
			<div className="flex gap-[10px] sm:gap-[48px] items-center flex-wrap sm:flex-nowrap sm:justify-between justify-center">
				<img className="w-[240px] mt-[10px] sm:mt-0" src={image} alt={alt} />
				<p className="text-[23px] py-[30px] sm:text-[32px] font-header3 text-text-100 text-center sm:text-left">
					{text}
				</p>
			</div>
		</Card2>
	);
};

export default GroupHeader;
