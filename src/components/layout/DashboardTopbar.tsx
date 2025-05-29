import React from "react";
import { Menu } from "lucide-react";
import SearchFiles from "../SearchFiles";

interface DashboardTopbarProps {
	onHamburgerClick: () => void;
}

const DashboardTopbar: React.FC<DashboardTopbarProps> = ({
	onHamburgerClick,
}) => {
	return (
		<header
			className="
        sticky top-0 z-30 bg-background-100
        lg:place-content-center lg:place-items-end
		lg:block
		xxl:place-items-start
        h-[98px] 
		border-b-primary-button-100
		border-b-[1px]
		lg:px-[62px]
		px-[10px]
		flex
		w-full
		justify-between
		max-sw:h-[75px]
      "
		>
			<div className="bg-background-100 flex items-center w-full max-sw:h-[74px]">
				<button
					onClick={onHamburgerClick}
					className="lg:hidden p-2 rounded-md hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-button-100 mr-[16px]"
					aria-label="Open sidebar"
				>
					<Menu size={35} className="max-sw:w-[27px]" />
				</button>
				<div className="flex-1 min-w-0 items-center justify-center">
					<SearchFiles />
				</div>
			</div>
		</header>
	);
};

export default DashboardTopbar;
