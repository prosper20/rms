import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
	DocumentText,
	LogoutCurve,
	IconProps,
	Add,
	Setting2,
	Home2,
	Box,
} from "iconsax-react";
import Logo from "../../assets/Logo/logo.png";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useUploadFileToS3 } from "../../lib/uploadFileToS3";

interface SidebarLink {
	to: string;
	label: string;
	icon: React.FC<IconProps>;
}

type Role = "ADMIN" | "VENDOR" | "SUPER_USER";

const DashboardSidebar: React.FC<{
	className?: string;
	onLinkClick?: () => void;
}> = ({ className = "", onLinkClick }) => {
	const authUser: {
		id: string;
		fullName: string;
		email: string;
		role: Role;
		vendor: string;
		vendorId: string;
	} | null = useAuthUser();

	const uploadFileToS3 = useUploadFileToS3();
	const authHeader = useAuthHeader();
	const token = authHeader?.split(" ")[1];

	const baseLinkClasses =
		"flex items-center gap-[16px] pl-[66px] pt-[13px] pb-[23px] h-[72px] rounded-tr-[10px] text-[24px] font-header2 transition";

	// Dynamically build the links based on role
	const renderLinks = (): JSX.Element[] => {
		if (!authUser) return [];

		const role = authUser.role;
		const links: SidebarLink[] = [];

		if (role === "ADMIN") {
			links.push({
				to: "/settings",
				label: "Settings",
				icon: Setting2,
			});
		}

		if (role === "SUPER_USER") {
			links.push({
				to: "/reports",
				label: "Home",
				icon: Home2,
			});
			["Pentagon", "TFML", "TSEBO", "Nairda"].forEach((vendor) => {
				links.push({
					to: `/reports/${vendor.toLowerCase()}`,
					label: vendor,
					icon: Box,
				});
			});
		}

		if (role === "VENDOR") {
			// Add Upload and Vendor Name
			links.push(
				{
					to: `/reports/${authUser.vendor.toLowerCase()}`,
					label: "Reports",
					icon: DocumentText,
				},
				{
					to: "/dashboard/upload",
					label: "Upload",
					icon: Add,
				}
			);
		}

		return links.map(({ to, label, icon: Icon }) => {
			if (label === "Upload") {
				return (
					<div
						key="upload"
						className={`${baseLinkClasses} hover:bg-background-100/40 cursor-pointer relative`}
						onClick={() => document.getElementById("file-upload")?.click()}
					>
						<Icon size={20} variant="Outline" />
						<span>{label}</span>
						<input
							type="file"
							id="file-upload"
							accept=".doc,.docx,.pdf,.xls,.xlsx,.ppt,.pptx,.csv"
							className="hidden"
							onChange={async (e) => {
								const file = e.target.files?.[0];
								if (!file) return;

								const allowedTypes = [
									"application/msword",
									"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
									"application/pdf",
									"application/vnd.ms-excel",
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
									"application/vnd.ms-powerpoint",
									"application/vnd.openxmlformats-officedocument.presentationml.presentation",
									"text/csv",
								];

								if (!allowedTypes.includes(file.type)) {
									alert("Unsupported file type");
									return;
								}

								try {
									const { key } = await uploadFileToS3(file);

									// Create DB record
									await axios.post(
										`${import.meta.env.VITE_API_URL}/files`,
										{
											name: file.name,
											type: file.type,
											size: file.size,
											url: key,
											path: key,
											vendorId: authUser?.vendorId,
										},
										{
											headers: {
												Authorization: `Bearer ${token}`,
											},
										}
									);

									alert("File uploaded successfully!");
								} catch (err) {
									console.error("Upload error:", err);
									alert("Failed to upload file");
								}
							}}
						/>
					</div>
				);
			}

			return (
				<NavLink
					key={to}
					to={to}
					end={["/reports", "/settings", "/dashboard"].includes(to)}
					className={({ isActive }) =>
						[
							baseLinkClasses,
							isActive
								? "bg-background-100 text-border"
								: "hover:bg-background-100/40 text-white",
						].join(" ")
					}
					onClick={onLinkClick}
				>
					<Icon size={20} variant="Outline" />
					{label}
				</NavLink>
			);
		});
	};

	return (
		<aside
			className={`
        bg-[#007570] text-text-100 flex flex-col
        w-[320px] lg:w-[280px] shrink-0 h-full
        ${className}
      `}
		>
			{/* Logo */}
			<div className="flex flex-col items-center h-[60px] px-6 mt-20 md:mt-10 gap-2">
				{["Reporting and Incident", "Management"].map((text, index) => (
					<span
						key={index}
						className="text-2xl text-[#ffcd00] font-header tracking-wide"
					>
						{text}
					</span>
				))}
				<img src={Logo} className="h-20 w-auto" alt="Spaces Reporting Logo" />
			</div>

			{/* Main Links */}
			<div className="flex flex-col h-[85%]">
				<nav className="flex-1 justify-start overflow-y-auto mt-[72px] space-y-2">
					{renderLinks()}
				</nav>

				{/* Bottom Logout */}
				<div className="pb-6 space-y-2 justify-end">
					<NavLink
						to="/login"
						className={[
							baseLinkClasses,
							"hover:bg-background-100/40 text-white",
						].join(" ")}
						onClick={onLinkClick}
					>
						<LogoutCurve size={20} variant="Outline" />
						Logout
					</NavLink>
				</div>
			</div>
		</aside>
	);
};

export default DashboardSidebar;

// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
// 	DocumentText,
// 	LogoutCurve,
// 	IconProps,
// 	Add,
// 	Setting2,
// } from "iconsax-react";
// import Logo from "../../assets/Logo/logo.png";
// import useAuthUser from "react-auth-kit/hooks/useAuthUser";

// interface SidebarLink {
// 	to: string;
// 	label: string;
// 	icon: React.FC<IconProps>;
// }

// const MAIN_LINKS: SidebarLink[] = [
// 	{ to: "/reports", label: "Reports", icon: DocumentText },
// 	{ to: "/pentagon", label: "Pentagon", icon: DocumentText },
// 	{ to: "/tfml", label: "TFML", icon: DocumentText },
// 	{ to: "/tsebo", label: "TSEBO", icon: DocumentText },

// 	{ to: "/dashboard/settings", label: "Settings", icon: Setting2 }, //add this in admin only
// 	{ to: "/dashboard/upload", label: "Upload", icon: Add },
// ];

// const SECONDARY_LINKS: SidebarLink[] = [
// 	{ to: "/login", label: "Logout", icon: LogoutCurve },
// ];

// type Props = {
// 	className?: string;
// 	onLinkClick?: () => void;
// };

// type Role = "STUDENT" | "SUPERVISOR";

// const DashboardSidebar: React.FC<Props> = ({ className = "", onLinkClick }) => {
// 	const authUser: {
// 		id: string;
// 		fullName: string;
// 		email: string;
// 		vendor: string;
// 		role: Role;
// 	} | null = useAuthUser();
// 	console.log("hello", authUser);
// 	const baseLinkClasses =
// 		"flex items-center gap-[16px] pl-[66px] pt-[13px] pb-[23px] h-[72px] rounded-tr-[10px] text-[24px] text-border font-header2 transition";

// 	return (
// 		<aside
// 			className={`
//         bg-[#007570] text-text-100 flex flex-col
//         w-[320px] lg:w-[280px] shrink-0 h-full
//         ${className}
//       `}
// 		>
// 			{/* Logo block */}
// 			<div className="flex items-center gap-[16px] h-[60px] px-[26px] mt-[38px]">
// 				<img src={Logo} className="w-auto h-[56px]" alt="Spaces logo" />
// 				<span className="text-[40px] text-text-100 font-header tracking-wide">
// 					RMS
// 				</span>
// 			</div>

// 			<div className="flex flex-col h-[85%]">
// 				{/* Navigation */}
// 				<nav className="flex-1 justify-start overflow-y-auto mt-[72px] space-y-2">
// 					{MAIN_LINKS.map(({ to, label, icon: Icon }) => {
// 						let to1 = to;
// 						let label1 = label;
// 						let Icon1 = Icon;

// 						if (authUser?.role === "SUPERVISOR" && label === "Tasks") {
// 							to1 = "/dashboard/projects";
// 							label1 = "Projects";
// 							Icon1 = DocumentText;
// 						}

// 						if (label === "Upload") {
// 							return (
// 								<div
// 									key="upload-button"
// 									className={`${baseLinkClasses} hover:bg-background-100/40 cursor-pointer relative`}
// 									onClick={() =>
// 										document.getElementById("file-upload")?.click()
// 									}
// 								>
// 									<Icon1 size={20} variant="Outline" />
// 									<span>{label1}</span>
// 									<input
// 										type="file"
// 										id="file-upload"
// 										accept=".doc,.docx,.pdf,.xls,.xlsx,.ppt,.pptx,.csv"
// 										className="hidden"
// 										onChange={(e) => {
// 											const files = e.target.files;
// 											if (files && files.length > 0) {
// 												console.log("Selected file:", files[0]);
// 												// TODO: Add upload logic
// 											}
// 										}}
// 									/>
// 								</div>
// 							);
// 						}

// 						return (
// 							<NavLink
// 								key={to1}
// 								to={to1}
// 								end={to1 === "/dashboard"}
// 								className={({ isActive }) =>
// 									[
// 										baseLinkClasses,
// 										isActive
// 											? "bg-background-100"
// 											: "hover:bg-background-100/40",
// 									].join(" ")
// 								}
// 								onClick={onLinkClick}
// 							>
// 								<Icon1 size={20} variant="Outline" />
// 								{label1}
// 							</NavLink>
// 						);
// 					})}

// 					{/* {MAIN_LINKS.map(({ to, label, icon: Icon }) => {
// 						let to1 = to;
// 						let label1 = label;
// 						let Icon1 = Icon;

// 						if (authUser?.role === "SUPERVISOR" && label === "Tasks") {
// 							to1 = "/dashboard/projects";
// 							label1 = "Projects";
// 							Icon1 = DocumentText;
// 						}
// 						return (
// 							<NavLink
// 								key={to1}
// 								to={to1}
// 								end={to1 === "/dashboard"}
// 								className={({ isActive }) =>
// 									[
// 										baseLinkClasses,
// 										isActive
// 											? "bg-background-100"
// 											: "hover:bg-background-100/40",
// 									].join(" ")
// 								}
// 								onClick={onLinkClick}
// 							>
// 								<Icon1 size={20} variant="Outline" />
// 								{label1}
// 							</NavLink>
// 						);
// 					})} */}
// 				</nav>

// 				{/* Bottom section */}
// 				<div className="pb-6 space-y-2 justify-end">
// 					{SECONDARY_LINKS.map(({ to, label, icon: Icon }) => (
// 						<NavLink
// 							key={to}
// 							to={to}
// 							className={({ isActive }) =>
// 								[
// 									baseLinkClasses,
// 									isActive
// 										? "bg-background-100 "
// 										: "hover:bg-background-100/40",
// 								].join(" ")
// 							}
// 							onClick={onLinkClick}
// 						>
// 							<Icon size={20} variant="Outline" />
// 							{label}
// 						</NavLink>
// 					))}
// 				</div>
// 			</div>
// 		</aside>
// 	);
// };

// export default DashboardSidebar;
