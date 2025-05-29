export type TButton = {
	children: React.ReactNode;
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	disabled?: boolean;
	className?: string;
};
