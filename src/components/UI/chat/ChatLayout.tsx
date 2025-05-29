import { Outlet, useLocation } from "react-router-dom";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";

const ChatLayout = () => {
	// const location = useLocation();
	const { pathname } = useLocation();

	const isRootRoute = pathname === "/dashboard/chat";
	const isConversationView =
		pathname.startsWith("/dashboard/chat/") && !isRootRoute;

	return (
		// <div className="flex fixed w-full lg:pr-[290px] pr-[10px]">
		<div className="flex fixed w-full lg:pr-[290px]">
			<div
				className={`md:border-r-primary-button-100
		md:border-r-[1px] basis-[100%] md:basis-[45%] min-w-[218px] text-border text-center ${isConversationView ? "hidden" : "block"} md:block `}
			>
				<ChatSidebar />
			</div>
			<div
				className={`w-full h-screen bg-transparent flex flex-col justify-between ${isRootRoute ? "hidden" : ""} sm:block`}
			>
				<div>
					<ChatHeader />
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default ChatLayout;

// import { Outlet, useLocation } from "react-router-dom";
// import ChatSidebar from "./ChatSidebar";
// import ChatHeader from "./ChatHeader";

// const ChatLayout = () => {
// 	const { pathname } = useLocation();

// 	const isRootRoute = pathname === "/dashboard/chat";
// 	const isConversationView =
// 		pathname.startsWith("/dashboard/chat/") && !isRootRoute;

// 	return (
// 		<div className="flex fixed inset-0">
// 			{/* ─ Sidebar ─────────────────────────────────────────────────── */}
// 			<div
// 				className={`
//           ${isConversationView ? "hidden" : "block"}   /* hide on mobile when a chat is open */
//           sm:block                                     /* always show from ≥640 px */
//           md:border-r md:border-primary-button-100
//           w-full sm:w-72 lg:w-80                       /* 18 rem → 20 rem */
//           flex-shrink-0
//         `}
// 			>
// 				<ChatSidebar />
// 			</div>

// 			<div
// 				className={`
//           ${isRootRoute ? "hidden" : "flex"}
//           sm:flex flex-1 h-screen flex-col bg-transparent
//         `}
// 			>
// 				<ChatHeader />
// 				<Outlet />
// 			</div>
// 		</div>
// 	);
// };

// export default ChatLayout;
