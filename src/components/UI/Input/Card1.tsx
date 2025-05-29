interface CardProps {
	className?: string;
	isStroked?: boolean;
	header?: string;
	headButton?: boolean;
	buttonText?: string;
	headLink?: string;
	children: React.ReactNode;
	style?: React.CSSProperties;
}

const Card1: React.FC<CardProps> = ({
	className,
	isStroked,
	header,
	headButton,
	buttonText,
	headLink,
	children,
	...style
}) => {
	return (
		<div
			className={`rounded-[8px] bg-background-primary shadow-box-shadow1 flex flex-col ${className}`}
		>
			<header
				className={`flex items-center mt-[32px] justify-between px-[16px] ${isStroked ? "border-b" : ""}`}
			>
				<h3 className="text-[24px] text-text-100 font-header1" {...style}>
					{header}
				</h3>
				{headButton && (
					<a
						href={headLink}
						className="text-[12px] text-right font-header1 underline underline-offset-[24.5%] text-lightpink hover:underline"
					>
						{buttonText}
					</a>
				)}
			</header>

			{children}
		</div>
	);
};

export default Card1;

interface Card2Prop {
	className?: string;
	children: React.ReactNode;
}

export const Card2: React.FC<Card2Prop> = ({ className, children }) => {
	return (
		<div className={`shadow-box-shadow1 flex flex-col ${className}`}>
			{children}
		</div>
	);
};

interface Card3Props {
	className?: string;
	isStroked?: boolean;
	header: string;
	headButton?: boolean;
	handleOpen?: () => void;
	imgStyle?: string;
	img?: string;
	alt: string;
	children: React.ReactNode;
	style?: React.CSSProperties;
}

export const Card3: React.FC<Card3Props> = ({
	className,
	isStroked,
	header,
	headButton,
	handleOpen,
	imgStyle,
	img,
	alt,
	children,
	...style
}) => {
	return (
		<div
			className={`rounded-[8px] bg-background-primary shadow-box-shadow1 flex flex-col ${className}`}
		>
			<header
				className={`flex items-center mt-[32px] justify-between px-[16px] ${isStroked ? "border-b" : ""}`}
			>
				<h3 className="text-[24px] text-text-100 font-header1" {...style}>
					{header}
				</h3>
				{headButton && (
					<button onClick={handleOpen} className={`cursor-pointer${imgStyle}`}>
						<img src={img} alt={alt} />
					</button>
				)}
			</header>

			{children}
		</div>
	);
};
