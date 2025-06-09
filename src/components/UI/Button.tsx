import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	variant?: "primary" | "danger" | "outline";
	size?: "sm" | "md" | "lg";
}

const variantStyles = {
	primary:
		"border border-[#0b7570] rounded-[10px] text-white bg-[#0b7570] hover:bg-[#0e8c86] hover:border-[#0e8c86]",
	danger:
		"border border-accountset rounded-[10px] text-accountset bg-transparent hover:bg-accountset hover:text-white",
	outline:
		"border border-[#fecd01] rounded-[10px] bg-transparent hover:bg-[#fecd01] ",
};

const sizeStyles = {
	sm: "px-4 py-2 text-[14px]",
	md: "md:px-[18px] md:py-2  px-8 py-4 text-[20px] md:text-[20px]",
	lg: "px-8 py-4 text-[20px] md:text-[20px]",
};

export const Button: React.FC<ButtonProps> = ({
	children,
	variant = "primary",
	size = "md",
	className = "",
	disabled,
	...props
}) => {
	return (
		<button
			{...props}
			disabled={disabled}
			className={` ${variantStyles[variant]} ${sizeStyles[size]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
		>
			{children}
		</button>
	);
};
