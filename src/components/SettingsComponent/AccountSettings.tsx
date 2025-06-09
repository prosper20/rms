import React, { useEffect, useState } from "react";
import { Profile, Sms, Lock } from "iconsax-react";
import { FormInput } from "../UI/Input/Inputs";
import { Button } from "../UI/Button";
import { toast } from "sonner";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import LoaderSpinnerSmall from "../Loaders/LoaderSpinnerSmall";

const roleOptions = [
	{ label: "Admin", value: "ADMIN" },
	{ label: "Vendor", value: "VENDOR" },
	{ label: "Super User", value: "SUPER_USER" },
];

type User = {
	id: string;
	fullName: string;
	email: string;
	role: "ADMIN" | "VENDOR" | "SUPER_USER";
	profile_complete: boolean;
};

const AccountSettings: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [selectedUserId, setSelectedUserId] = useState<string>("");
	const [formData, setFormData] = useState<User | null>(null);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [loadingSaveChanges, setSaveChangesLoading] = useState(false);
	const [loadingPasswordReset, setPasswordResetLoading] = useState(false);
	const [deleteUserLoading, setDeleteUserLoading] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [deleteConfirmation, setDeleteConfirmation] = useState("");

	const authHeader = useAuthHeader();
	const token = authHeader?.split(" ")[1];

	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true);
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				const data = await response.json();
				setUsers(data.users);
			} catch (err) {
				toast.error("Failed to fetch users");
			} finally {
				setLoading(false);
			}
		};
		fetchUsers();
	}, [token]);

	const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const user = users.find((u) => u.id === e.target.value) || null;
		setSelectedUserId(e.target.value);
		setFormData(user);
		setNewPassword("");
		setConfirmPassword("");
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		if (formData) {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handlePasswordReset = async () => {
		if (newPassword !== confirmPassword) {
			return toast.error("Passwords do not match");
		}
		try {
			setPasswordResetLoading(true);
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/auth/admin/reset-password`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						userId: selectedUserId,
						newPassword,
						confirmPassword,
					}),
				}
			);

			if (!response.ok) throw new Error("Error resetting password");
			setNewPassword("");
			setConfirmPassword("");
			toast.success("Password reset successfully");
		} catch (err) {
			toast.error("Failed to reset password");
		} finally {
			setPasswordResetLoading(false);
		}
	};

	const handleDeleteUser = async () => {
		try {
			setDeleteUserLoading(true);
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/users/${selectedUserId}/disable`,
				{
					method: "PATCH",
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			if (!response.ok) throw new Error("Error deleting user");

			setUsers(users.filter((user) => user.id !== selectedUserId));
			setFormData(null);
			setSelectedUserId("");
			toast.success("User deleted successfully");
		} catch (err) {
			toast.error("Failed to delete user");
		} finally {
			setDeleteUserLoading(false);
			setShowDeleteModal(false);
			setDeleteConfirmation("");
		}
	};

	const handleSaveChanges = async () => {
		try {
			setSaveChangesLoading(true);
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/users/${selectedUserId}`,
				{
					method: "PUT",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);

			if (!response.ok) throw new Error("Error updating user");
			toast.success("User updated successfully");
		} catch (err) {
			toast.error("Failed to update user");
		} finally {
			setSaveChangesLoading(false);
		}
	};

	const userOptions = users.map((user) => ({
		label: user.fullName,
		value: user.id,
	}));

	return (
		<section className="space-y-6 bg-settings/[40%] shadow-profile-info rounded-tr-[15px] pb-3 px-1">
			{showDeleteModal && (
				<div className="fixed inset-0 bg-black bg-opacity-60 flex items-end sm:items-center justify-center z-50 pb-6 sm:pb-0">
					<div className="bg-white w-[90%] md:w-[520px] lg:w-[540px] rounded-2xl border-2 border-gray-100 shadow-md p-6 md:py-10 md:px-12 space-y-6 text-center flex flex-col items-center">
						<h2 className="text-[22px] font-medium">Confirm Deletion</h2>
						<p className="text-[15px] text-[#3F3F3F]">
							To confirm deletion, please type:{" "}
							<span className="font-semibold text-[#656565]">
								delete {formData!.fullName}
							</span>
						</p>

						<input
							type="text"
							placeholder={`delete ${formData!.fullName}`}
							value={deleteConfirmation}
							onChange={(e) => setDeleteConfirmation(e.target.value)}
							className="w-full border border-[#E5E5E5] rounded-[0.7rem] p-3 outline-none text-[15px] placeholder:text-[#808080]"
						/>

						<div className="flex justify-between gap-4 w-full mt-4 bg-[#F5F5F5] rounded-xl py-4 px-6">
							<Button
								onClick={() => {
									setShowDeleteModal(false);
									setDeleteConfirmation("");
								}}
								variant="outline"
							>
								Cancel
							</Button>
							<Button
								onClick={handleDeleteUser}
								variant="danger"
								disabled={deleteConfirmation !== `delete ${formData!.fullName}`}
							>
								{deleteUserLoading ? (
									<div className="flex items-center justify-center px-12 py-2">
										<LoaderSpinnerSmall />
									</div>
								) : (
									"Delete"
								)}
							</Button>
						</div>
					</div>
				</div>
			)}

			<h2 className="px-6 pt-8 text-[24px] sm:text-[32px] font-header  text-gray-800">
				Manage Users
			</h2>

			<div className="flex flex-col  items-start justify-start gap-6">
				<div className="flex w-full flex-col md:flex-row items-start p-6 justify-start gap-6">
					<div className=" p-6 space-y-8 w-full bg-white rounded-2xl shadow-md">
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
									className={`w-full rounded-[10px] border border-gray-200 bg-transparent px-4 py-4 text-[14px] font-light text-black appearance-none outline-none ${!selectedUserId ? "text-gray-400" : ""}`}
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

						{loading ? (
							<div className="flex items-center justify-center">
								<LoaderSpinnerSmall />
							</div>
						) : (
							formData && (
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
													className="w-full rounded-[10px] border border-gray-200 bg-transparent px-4 py-4 text-[14px] font-light text-black appearance-none outline-none"
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

									<div className="flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center gap-4 mt-6">
										<Button
											onClick={handleSaveChanges}
											variant="primary"
											size="md"
											className="flex-1 sm:flex-none"
										>
											{loadingSaveChanges ? (
												<div className="flex items-center justify-center px-12 py-2">
													<LoaderSpinnerSmall />
												</div>
											) : (
												"Save Changes"
											)}
										</Button>
									</div>
								</>
							)
						)}
					</div>

					{formData && (
						<div className="bg-white w-full rounded-2xl p-6 shadow-md max-w-xl ">
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
								autoComplete="new-password"
							/>
							<FormInput
								id="confirmPassword"
								label="Confirm Password"
								name="confirmPassword"
								type="password"
								icon
								IconName={Lock}
								value={confirmPassword}
								password
								onChange={(e) => setConfirmPassword(e.target.value)}
								autoComplete="new-password"
							/>
							<Button
								onClick={handlePasswordReset}
								variant="outline"
								size="lg"
								className="w-full mt-6"
								disabled={!newPassword || !confirmPassword}
							>
								{loadingPasswordReset ? (
									<div className="flex items-center justify-center px-12 py-2">
										<LoaderSpinnerSmall />
									</div>
								) : (
									"Reset Password"
								)}
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
								onClick={() => setShowDeleteModal(true)}
								variant="danger"
								size="md"
								className="w-full"
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
							onClick={() => setShowDeleteModal(true)}
							variant="danger"
							size="md"
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
