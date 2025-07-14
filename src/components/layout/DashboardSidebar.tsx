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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import LoaderSpinnerSmall from "../../components/Loaders/LoaderSpinnerSmall";

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
	const [uploading, setUploading] = React.useState(false);
	const queryClient = useQueryClient();

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

	const uploadMutation = useMutation({
		mutationFn: async (file: File) => {
			setUploading(true);

			const { key } = await uploadFileToS3(file);

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
		},
		onSuccess: () => {
			toast.success("File uploaded successfully!");
			queryClient.invalidateQueries({
				predicate: (query) => query.queryKey[0] === "files",
			});
		},
		onError: (err: any) => {
			console.error("Upload failed:", err);
			toast.error("Failed to upload file");
		},
		onSettled: () => {
			setUploading(false);
		},
	});

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
						className={`${baseLinkClasses} hover:bg-background-100/40 cursor-pointer relative text-white hover:text-border`}
						// onClick={() => document.getElementById("file-upload")?.click()}
						onClick={() =>
							!uploading && document.getElementById("file-upload")?.click()
						}
					>
						{/* <Icon size={20} variant="Outline" />
						<span>{label}</span> */}
						<Add size={20} variant="Outline" />
						<span>
							{uploading ? (
								<div className="flex gap-2 items-center">
									<span>Upload</span>
									<LoaderSpinnerSmall />
								</div>
							) : (
								"Upload"
							)}
						</span>
						<input
							type="file"
							id="file-upload"
							accept=".doc,.docx,.pdf,.xls,.xlsx,.ppt,.pptx,.csv"
							className="hidden"
							onChange={(e) => {
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
									toast.error("Unsupported file type");
									return;
								}

								uploadMutation.mutate(file);
							}}
						/>

						{/* <input
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
						/> */}
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
