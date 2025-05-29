import { Outlet, useLocation } from "react-router-dom";
import ReportFiles from "../../pages/dashboard/ReportFiles";
// import ChatSidebar from "./ChatSidebar";
// import ChatHeader from "./ChatHeader";

const ReportLayout = () => {
	// const location = useLocation();
	const { pathname } = useLocation();

	// const isRootRoute = pathname === "/reports";
	//const isConversationView = pathname.startsWith("/reports/") && !isRootRoute;

	return (
		// <div className="flex fixed w-full lg:pr-[290px] pr-[10px]">
		<div className="flex  w-full">
			{/* <div
                className={`md:border-r-primary-button-100
        md:border-r-[1px] basis-[100%] md:basis-[45%] min-w-[218px] text-border text-center ${isConversationView ? "hidden" : "block"} md:block `}
            >
                <ChatSidebar />
            </div> */}
			<div className={`w-full h-screen flex justify-center items-start`}>
				<div className=" w-full">
					<Outlet />
					{/* <ReportFiles /> */}
				</div>
			</div>
		</div>
	);
};

export default ReportLayout;
