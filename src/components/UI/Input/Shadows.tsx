interface Shadow1Prop {
	className?: string;
	children: React.ReactNode;
}

const Shadow1: React.FC<Shadow1Prop> = ({ className, children, ...props }) => (
	<li className={`shadow-box-shadow2 rounded-[5px] ${className}`} {...props}>
		{children}
	</li>
);

export default Shadow1;

interface Shadow2Prop {
	className?: string;
	children: React.ReactNode;
}

export const Shadow2: React.FC<Shadow2Prop> = ({
	className,
	children,
	...props
}) => (
	<div className={`shadow-box-shadow2 rounded-[5px] ${className}`} {...props}>
		{children}
	</div>
);
