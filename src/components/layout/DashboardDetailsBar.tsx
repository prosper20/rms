interface DetailsBarProp {
	className?: string;
	children: React.ReactNode;
}

const DashboardDetailsBar: React.FC<DetailsBarProp> = ({
	children,
	className,
}) => {
	return (
		<div
			className={`w-[392px] xl:h-[100%] pl-[17px] pr-[18px] xl:mt-[-20px] max-mm:mt-3 max-mm:items-center pt-[168px] pb-[23px] max-mw:block xl:shadow-right-sidebar max-mm:shadow-neutral-50 max-mm:flex max-mm:w-full max-mm:gap-[24px] max-mm:p-0 max-mm:mb-[80px] max-mm:justify-between max-mm:pr-1 max-mm:h-[30vw]  ${className}`}
		>
			{children}
		</div>
	);
};

export default DashboardDetailsBar;
