// import React, { useState } from "react";
// import { Profile, Sms, Lock } from "iconsax-react";

// import { FormInput } from "../UI/Input/Inputs";
// import { Button } from "../UI/Button";

// type User = {
// 	id: string;
// 	fullName: string;
// 	email: string;
// 	role: "ADMIN" | "VENDOR" | "SUPER_USER";
// 	profile_complete: boolean;
// };

// const dummyUsers: User[] = [
// 	{
// 		id: "1",
// 		fullName: "John Doe",
// 		email: "john@example.com",
// 		role: "ADMIN",
// 		profile_complete: true,
// 	},
// 	{
// 		id: "2",
// 		fullName: "Jane Smith",
// 		email: "jane@example.com",
// 		role: "VENDOR",
// 		profile_complete: false,
// 	},
// ];

// const userOptions = dummyUsers.map((user) => ({
// 	label: user.fullName,
// 	value: user.id,
// }));

// const roleOptions = [
// 	{ label: "Admin", value: "ADMIN" },
// 	{ label: "Vendor", value: "VENDOR" },
// 	{ label: "Super User", value: "SUPER_USER" },
// ];

// const AccountSettings: React.FC = () => {
// 	const [selectedUserId, setSelectedUserId] = useState<string>("");
// 	const [formData, setFormData] = useState<User | null>(null);
// 	const [newPassword, setNewPassword] = useState("");

// 	const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
// 		const user = dummyUsers.find((u) => u.id === e.target.value) || null;
// 		setSelectedUserId(e.target.value);
// 		setFormData(user);
// 	};

// 	const handleInputChange = (
// 		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
// 	) => {
// 		const { name, value } = e.target;
// 		if (formData) {
// 			setFormData({ ...formData, [name]: value });
// 		}
// 	};

// 	const handlePasswordReset = () => {
// 		console.log(
// 			`Resetting password to: ${newPassword} for user ID: ${selectedUserId}`
// 		);
// 	};

// 	const handleDeleteUser = () => {
// 		console.log(`Deleting user ID: ${selectedUserId}`);
// 	};

// 	const handleSaveChanges = () => {
// 		console.log("Saving updated user data:", formData);
// 	};

// 	return (
// 		<section className="space-y-6">
// 			<h2 className="text-[24px] sm:text-[32px] font-header text-text-100">
// 				Manage Users
// 			</h2>

// 			<div className="space-y-4 bg-white rounded-[15px] p-6 shadow-md">
// 				{/* User Selector */}
// 				<div className="flex w-full flex-col gap-y-1">
// 					<label
// 						htmlFor="userSelect"
// 						className="text-left font-light capitalize text-black text-[14px]"
// 					>
// 						Select a user <span className="text-red-500">*</span>
// 					</label>
// 					<div className="relative">
// 						<select
// 							id="userSelect"
// 							name="userSelect"
// 							value={selectedUserId}
// 							onChange={handleUserSelect}
// 							className={`w-full rounded-[10px] border border-gray-200 focus:caret-primary-300 focus:border-primary-300 bg-transparent px-4 py-4 text-[14px] font-light text-black appearance-none outline-none ${
// 								!selectedUserId ? "text-gray-400" : ""
// 							}`}
// 						>
// 							<option value="" disabled hidden>
// 								Choose a user
// 							</option>
// 							{userOptions.map((user) => (
// 								<option key={user.value} value={user.value}>
// 									{user.label}
// 								</option>
// 							))}
// 						</select>

// 						<div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
// 							<svg
// 								className="w-4 h-4"
// 								fill="none"
// 								stroke="currentColor"
// 								viewBox="0 0 24 24"
// 								xmlns="http://www.w3.org/2000/svg"
// 							>
// 								<path
// 									strokeLinecap="round"
// 									strokeLinejoin="round"
// 									strokeWidth={2}
// 									d="M19 9l-7 7-7-7"
// 								/>
// 							</svg>
// 						</div>
// 					</div>
// 				</div>

// 				{formData && (
// 					<>
// 						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// 							<FormInput
// 								id="fullName"
// 								label="Full Name"
// 								name="fullName"
// 								type="text"
// 								value={formData.fullName}
// 								onChange={handleInputChange}
// 								icon
// 								IconName={Profile}
// 								autoComplete="on"
// 							/>

// 							<FormInput
// 								id="email"
// 								label="Email"
// 								name="email"
// 								type="email"
// 								value={formData.email}
// 								onChange={handleInputChange}
// 								icon
// 								IconName={Sms}
// 								autoComplete="on"
// 							/>

// 							{/* Role Selector */}
// 							<div className="flex w-full flex-col gap-y-1">
// 								<label
// 									htmlFor="role"
// 									className="text-left font-light capitalize text-black text-[14px]"
// 								>
// 									Role <span className="text-red-500">*</span>
// 								</label>
// 								<div className="relative">
// 									<select
// 										id="role"
// 										name="role"
// 										value={formData.role}
// 										onChange={handleInputChange}
// 										className={`w-full rounded-[10px] border border-gray-200 focus:caret-primary-300 focus:border-primary-300 bg-transparent px-4 py-4 text-[14px] font-light text-black appearance-none outline-none`}
// 									>
// 										{roleOptions.map((role) => (
// 											<option key={role.value} value={role.value}>
// 												{role.label}
// 											</option>
// 										))}
// 									</select>

// 									<div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
// 										<svg
// 											className="w-4 h-4"
// 											fill="none"
// 											stroke="currentColor"
// 											viewBox="0 0 24 24"
// 											xmlns="http://www.w3.org/2000/svg"
// 										>
// 											<path
// 												strokeLinecap="round"
// 												strokeLinejoin="round"
// 												strokeWidth={2}
// 												d="M19 9l-7 7-7-7"
// 											/>
// 										</svg>
// 									</div>
// 								</div>
// 							</div>
// 						</div>

// 						<div className="pt-4">
// 							<FormInput
// 								id="resetPassword"
// 								label="Reset Password"
// 								name="newPassword"
// 								type="password"
// 								icon
// 								IconName={Lock}
// 								value={newPassword}
// 								password
// 								onChange={(e) => setNewPassword(e.target.value)}
// 								autoComplete="reset-password"
// 							/>

// 							<Button onClick={handlePasswordReset} variant="outline" size="lg">
// 								Reset Password
// 							</Button>
// 						</div>

// 						<div className="flex justify-between items-center mt-6">
// 							<Button onClick={handleSaveChanges} variant="primary">
// 								Save Changes
// 							</Button>
// 							<Button
// 								onClick={handleDeleteUser}
// 								variant="danger"
// 								className="mt-6"
// 							>
// 								Delete Account
// 							</Button>
// 						</div>
// 					</>
// 				)}
// 			</div>
// 		</section>
// 	);
// };

// export default AccountSettings;

import React, { useState } from "react";
import { Profile, Sms, Lock } from "iconsax-react";

import { FormInput } from "../UI/Input/Inputs";
import { Button } from "../UI/Button";

type User = {
	id: string;
	fullName: string;
	email: string;
	role: "ADMIN" | "VENDOR" | "SUPER_USER";
	profile_complete: boolean;
};

const dummyUsers: User[] = [
	{
		id: "1",
		fullName: "John Doe",
		email: "john@example.com",
		role: "ADMIN",
		profile_complete: true,
	},
	{
		id: "2",
		fullName: "Jane Smith",
		email: "jane@example.com",
		role: "VENDOR",
		profile_complete: false,
	},
];

const userOptions = dummyUsers.map((user) => ({
	label: user.fullName,
	value: user.id,
}));

const roleOptions = [
	{ label: "Admin", value: "ADMIN" },
	{ label: "Vendor", value: "VENDOR" },
	{ label: "Super User", value: "SUPER_USER" },
];

const AccountSettings: React.FC = () => {
	const [selectedUserId, setSelectedUserId] = useState<string>("");
	const [formData, setFormData] = useState<User | null>(null);
	const [newPassword, setNewPassword] = useState("");

	const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const user = dummyUsers.find((u) => u.id === e.target.value) || null;
		setSelectedUserId(e.target.value);
		setFormData(user);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		if (formData) {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handlePasswordReset = () => {
		console.log(
			`Resetting password to: ${newPassword} for user ID: ${selectedUserId}`
		);
	};

	const handleDeleteUser = () => {
		console.log(`Deleting user ID: ${selectedUserId}`);
	};

	const handleSaveChanges = () => {
		console.log("Saving updated user data:", formData);
	};

	return (
		<section className="space-y-6 bg-settings/[40%] shadow-profile-info rounded-tr-[15px] pb-3 px-1">
			<h2 className="px-6 pt-8 text-[24px] sm:text-[32px] font-header  text-gray-800">
				Manage Users
			</h2>

			{/* User Selection + Details */}
			<div className="flex flex-col  items-start justify-start gap-6">
				<div className="flex w-full flex-col md:flex-row items-start p-6 justify-start gap-6">
					<div className=" p-6 space-y-8 w-full bg-white rounded-2xl shadow-md">
						{/* User Selector */}
						<div className="flex w-full flex-col gap-y-1">
							<label
								htmlFor="userSelect"
								className="text-left font-light capitalize text-black text-[14px]"
							>
								Select a user <span className="text-red-500">*</span>
							</label>
							<div className="relative">
								<select
									id="userSelect"
									name="userSelect"
									value={selectedUserId}
									onChange={handleUserSelect}
									className={`w-full rounded-[10px] border border-gray-200 focus:caret-primary-300 focus:border-primary-300 bg-transparent px-4 py-4 text-[14px] font-light text-black appearance-none outline-none ${
										!selectedUserId ? "text-gray-400" : ""
									}`}
								>
									<option value="" disabled hidden>
										Choose a user
									</option>
									{userOptions.map((user) => (
										<option key={user.value} value={user.value}>
											{user.label}
										</option>
									))}
								</select>

								<div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</div>
							</div>
						</div>

						{formData && (
							<>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
									<FormInput
										id="fullName"
										label="Full Name"
										name="fullName"
										type="text"
										value={formData.fullName}
										onChange={handleInputChange}
										icon
										IconName={Profile}
										autoComplete="on"
									/>

									<FormInput
										id="email"
										label="Email"
										name="email"
										type="email"
										value={formData.email}
										onChange={handleInputChange}
										icon
										IconName={Sms}
										autoComplete="on"
									/>

									{/* Role Selector */}
									<div className="flex w-full flex-col gap-y-1">
										<label
											htmlFor="role"
											className="text-left font-light capitalize text-black text-[14px]"
										>
											Role <span className="text-red-500">*</span>
										</label>
										<div className="relative">
											<select
												id="role"
												name="role"
												value={formData.role}
												onChange={handleInputChange}
												className={`w-full rounded-[10px] border border-gray-200 focus:caret-primary-300 focus:border-primary-300 bg-transparent px-4 py-4 text-[14px] font-light text-black appearance-none outline-none`}
											>
												{roleOptions.map((role) => (
													<option key={role.value} value={role.value}>
														{role.label}
													</option>
												))}
											</select>

											<div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M19 9l-7 7-7-7"
													/>
												</svg>
											</div>
										</div>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center gap-4 mt-6">
									<Button
										onClick={handleSaveChanges}
										variant="primary"
										size="md"
										className="flex-1 sm:flex-none"
									>
										Save Changes
									</Button>
								</div>
							</>
						)}
					</div>
					{/* Separate Reset Password Card */}
					{formData && (
						<div className="bg-white w-full rounded-2xl p-6 shadow-md max-w-xl ">
							{/* <h3 className="text-xl font-semibold mb-4">Reset Password</h3> */}
							<FormInput
								id="resetPassword"
								label="New Password"
								name="newPassword"
								type="password"
								icon
								IconName={Lock}
								value={newPassword}
								password
								onChange={(e) => setNewPassword(e.target.value)}
								autoComplete="reset-password"
							/>

							<Button
								onClick={handlePasswordReset}
								variant="outline"
								size="lg"
								className="w-full mt-6"
								disabled={!newPassword}
							>
								Reset Password
							</Button>
						</div>
					)}
					{formData && (
						<div className="bg-yellow-400 bg-opacity-10 space-y-6 md:hidden w-full rounded-2xl p-6 shadow-md max-w-xl">
							<p className="text-accountset text-[14px]">
								<span className="font-bold text-[15px]">Delete this User</span>
								<br />
								Deleting this account will permanently remove it from the
								databse. This cannot be undone.
							</p>
							<Button
								onClick={handleDeleteUser}
								variant="danger"
								size="md"
								className="flex-1 sm:flex-none w-full"
							>
								Delete Account
							</Button>
						</div>
					)}
				</div>
				{formData && (
					<div className="bg-yellow-400 bg-opacity-10 space-y-6 hidden md:block w-full rounded-2xl p-12 shadow-md ">
						<p className="text-accountset text-[14px]">
							<span className="font-bold text-[15px]">Delete this User</span>
							<br />
							Deleting this account will permanently remove it from the databse.
							This cannot be undone.
						</p>
						<Button
							onClick={handleDeleteUser}
							variant="danger"
							size="md"
							className="flex-1 sm:flex-none "
						>
							Delete Account
						</Button>
					</div>
				)}
			</div>
		</section>
	);
};

export default AccountSettings;

// import { useState } from "react";
// import { Link } from "react-router-dom";

// const AccountSettings: React.FC = () => {
// 	const [passwords, setPasswords] = useState({
// 		current: "",
// 		new: "",
// 		confirm: "",
// 	});

// 	// Handle password changes
// 	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const { name, value } = e.target;
// 		setPasswords((prev) => ({ ...prev, [name]: value }));
// 	};

// 	return (
// 		<section className="mb-4">
// 			<h2 className="text-[24px] sm:text-[32px] font-header mb-2 text-text-100">
// 				Account Settings
// 			</h2>
// 			<div className="bg-setting1/[40%] rounded-tr-[15px] px-[12px] sm:px-[36px] py-[19px] sm:py-[48px] shadow-profile-info">
// 				<div className="mb-3">
// 					<h3 className="text-[24px] sm:text-[32px] font-header3 mb-3 text-text-100">
// 						Password
// 					</h3>

// 					<div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-[28px]">
// 						<div className="flex flex-col">
// 							<label className="text-[18px] lg:text-[20px] text-text-100 mb-4">
// 								Current Password
// 							</label>
// 							<input
// 								type="password"
// 								name="current"
// 								value={passwords.current}
// 								onChange={handlePasswordChange}
// 								className="border border-b-background-100/[40%] px-5 py-2 md:py-4 text-[16px] rounded-[12px] md:w-[200px] lg:w-[100%]"
// 							/>
// 						</div>

// 						<div className="flex flex-col">
// 							<label className="text-[18px] lg:text-[20px] text-text-100 mb-4">
// 								New Password
// 							</label>
// 							<input
// 								type="password"
// 								name="new"
// 								value={passwords.new}
// 								onChange={handlePasswordChange}
// 								className="border border-b-background-100/[40%] px-5 py-2 md:py-4 text-[16px] rounded-[12px] md:w-[200px] lg:w-[100%]"
// 							/>
// 						</div>

// 						<div className="flex flex-col">
// 							<label className="text-[18px] lg:text-[20px] text-text-100 mb-4">
// 								Confirm Password
// 							</label>
// 							<input
// 								type="password"
// 								name="confirm"
// 								value={passwords.confirm}
// 								onChange={handlePasswordChange}
// 								className="border border-b-background-100/[40%] px-5 py-2 md:py-4 text-[16px] rounded-[12px] md:w-[200px] lg:w-[100%]"
// 							/>
// 						</div>
// 					</div>

// 					<div className="text-[16px] font-header2 text-text-100/[80%] mb-6">
// 						Can't remember your current password?{" "}
// 						<Link to="#" className="text-border underline">
// 							Reset password
// 						</Link>
// 					</div>
// 				</div>

// 				<div className="flex justify-between items-center">
// 					<button className="bg-primary-button-100  px-[18px] py-2 text-[14px] md:text-[22px] rounded-[15px] font-header text-white">
// 						Save Changes
// 					</button>
// 				</div>
// 				<div className="mt-[50px] sm:mt-[100px] flex justify-end">
// 					<button className="bg-accountset text-white px-[18px] py-2 text-[14px] md:text-[22px] font-header border-border rounded-[15px]">
// 						Delete Account
// 					</button>
// 				</div>
// 			</div>
// 		</section>
// 	);
// };

// export default AccountSettings;
