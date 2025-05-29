import { useState } from "react";
import { Link } from "react-router-dom";

const AccountSettings: React.FC = () => {
	const [passwords, setPasswords] = useState({
		current: "",
		new: "",
		confirm: "",
	});

	// Handle password changes
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPasswords((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<section className="mb-4">
			<h2 className="text-[24px] sm:text-[32px] font-header mb-2 text-text-100">
				Account Settings
			</h2>
			<div className="bg-setting1/[40%] rounded-tr-[15px] px-[12px] sm:px-[36px] py-[19px] sm:py-[48px] shadow-profile-info">
				<div className="mb-3">
					<h3 className="text-[24px] sm:text-[32px] font-header3 mb-3 text-text-100">
						Password
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-[28px]">
						<div className="flex flex-col">
							<label className="text-[18px] lg:text-[20px] text-text-100 mb-4">
								Current Password
							</label>
							<input
								type="password"
								name="current"
								value={passwords.current}
								onChange={handlePasswordChange}
								className="border border-b-background-100/[40%] px-5 py-2 md:py-4 text-[16px] rounded-[12px] md:w-[200px] lg:w-[100%]"
							/>
						</div>

						<div className="flex flex-col">
							<label className="text-[18px] lg:text-[20px] text-text-100 mb-4">
								New Password
							</label>
							<input
								type="password"
								name="new"
								value={passwords.new}
								onChange={handlePasswordChange}
								className="border border-b-background-100/[40%] px-5 py-2 md:py-4 text-[16px] rounded-[12px] md:w-[200px] lg:w-[100%]"
							/>
						</div>

						<div className="flex flex-col">
							<label className="text-[18px] lg:text-[20px] text-text-100 mb-4">
								Confirm Password
							</label>
							<input
								type="password"
								name="confirm"
								value={passwords.confirm}
								onChange={handlePasswordChange}
								className="border border-b-background-100/[40%] px-5 py-2 md:py-4 text-[16px] rounded-[12px] md:w-[200px] lg:w-[100%]"
							/>
						</div>
					</div>

					<div className="text-[16px] font-header2 text-text-100/[80%] mb-6">
						Can't remember your current password?{" "}
						<Link to="#" className="text-border underline">
							Reset password
						</Link>
					</div>
				</div>

				<div className="flex justify-between items-center">
					<button className="bg-primary-button-100  px-[18px] py-2 text-[14px] md:text-[22px] rounded-[15px] font-header text-white">
						Save Changes
					</button>
				</div>
				<div className="mt-[50px] sm:mt-[100px] flex justify-end">
					<button className="bg-accountset text-white px-[18px] py-2 text-[14px] md:text-[22px] font-header border-border rounded-[15px]">
						Delete Account
					</button>
				</div>
			</div>
		</section>
	);
};

export default AccountSettings;
