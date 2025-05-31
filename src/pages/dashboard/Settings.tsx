// import { useEffect, useState } from "react";
// import axios from "axios";
import ProfileInfo from "../../components/SettingsComponent/ProfileInfo";
import AccountSettings from "../../components/SettingsComponent/AccountSettings";
import AddUserForm from "../../components/SettingsComponent/AddUserForm";
import AddVendorForm from "../../components/SettingsComponent/AddVendorForm";

// type Vendor = {
// 	id: string;
// 	name: string;
// 	created_at: string;
// 	updated_at: string;
// 	users: {
// 		id: string;
// 		fullName: string;
// 		email: string;
// 	}[];
// 	files: any[];
// };

// type UserFormFields = {
// 	fullName: string;
// 	email: string;
// 	password: string;
// 	vendorId: string;
// 	role: "ADMIN" | "SUPER_USER" | "VENDOR";
// };

const SettingsPage = () => {
	// const [vendors, setVendors] = useState<Vendor[]>([]);
	// const [userForm, setUserForm] = useState<UserFormFields>({
	// 	fullName: "",
	// 	email: "",
	// 	password: "",
	// 	vendorId: "",
	// 	role: "ADMIN",
	// });

	// const [vendorName, setVendorName] = useState("");

	// useEffect(() => {
	// 	axios
	// 		.get(import.meta.env.VITE_API_URL + "/vendors", {
	// 			withCredentials: true,
	// 		})
	// 		.then((res) => setVendors(res.data))
	// 		.catch((err) => console.error(err));
	// }, []);

	// const handleUserInputChange = (
	// 	e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	// ) => {
	// 	const { name, value } = e.target;
	// 	setUserForm((prev) => ({ ...prev, [name]: value }));
	// };

	// const handleAddUser = async () => {
	// 	try {
	// 		await axios.post(import.meta.env.VITE_API_URL + "/auth/user", userForm, {
	// 			withCredentials: true,
	// 		});
	// 		alert("User added successfully");
	// 	} catch (err) {
	// 		console.error(err);
	// 		alert("Failed to add user");
	// 	}
	// };

	// const handleAddVendor = async () => {
	// 	try {
	// 		await axios.post(
	// 			import.meta.env.VITE_API_URL + "/vendors",
	// 			{ name: vendorName },
	// 			{ withCredentials: true }
	// 		);
	// 		alert("Vendor added successfully");
	// 		setVendorName("");
	// 		// Refresh vendor list
	// 		const res = await axios.get(import.meta.env.VITE_API_URL + "/vendors", {
	// 			withCredentials: true,
	// 		});
	// 		setVendors(res.data);
	// 	} catch (err) {
	// 		console.error(err);
	// 		alert("Failed to add vendor");
	// 	}
	// };

	return (
		<div className="bg-[#eeeeee] p-3 sm:p-4 sm:pr-[4%] mb-[60px]">
			<div className="flex flex-col gap-[90px]">
				<ProfileInfo />
				{/* Add User Form */}
				{/* <section className="bg-settings/[40%] shadow-profile-info rounded-tr-[15px] px-6 py-8">
					<h2 className="text-[24px] sm:text-[32px] font-header mb-6 text-gray-800">
						Add User
					</h2>

					<div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
						<input
							type="text"
							name="fullName"
							placeholder="Full Name"
							aria-label="Full Name"
							value={userForm.fullName}
							onChange={handleUserInputChange}
							className="border rounded-[10px] border-gray-200 focus:caret-primary-300 focus:border-primary-300 px-4 py-4 text-[14px] font-light text-black outline-none"
						/>

						<input
							type="email"
							name="email"
							placeholder="Email"
							aria-label="Email"
							value={userForm.email}
							onChange={handleUserInputChange}
							className="border rounded-[10px] border-gray-200 focus:caret-primary-300 focus:border-primary-300 px-4 py-4 text-[14px] font-light text-black outline-none"
						/>

						<input
							type="password"
							name="password"
							placeholder="Password"
							aria-label="Password"
							value={userForm.password}
							onChange={handleUserInputChange}
							className="border rounded-[10px] border-gray-200 focus:caret-primary-300 focus:border-primary-300 px-4 py-4 text-[14px] font-light text-black outline-none"
						/>

						<select
							name="role"
							value={userForm.role}
							onChange={handleUserInputChange}
							className="border rounded-[10px] border-gray-200 focus:border-primary-300 px-4 py-4 text-[14px] font-light text-black outline-none"
						>
							<option value="">Choose Role</option>
							<option value="ADMIN">Admin</option>
							<option value="SUPER_USER">Super User</option>
							<option value="VENDOR">Vendor</option>
						</select>

						<select
							name="vendorId"
							value={userForm.vendorId}
							onChange={handleUserInputChange}
							className="border rounded-[10px] border-gray-200 focus:border-primary-300 px-4 py-4 text-[14px] font-light text-black outline-none"
						>
							<option value="">Select Vendor</option>
							{vendors.map((vendor) => (
								<option key={vendor.id} value={vendor.id}>
									{vendor.name}
								</option>
							))}
						</select>
					</div>

					<button
						onClick={handleAddUser}
						className="mt-6 bg-[#0b7570] hover:bg-[#0e8c86] text-white px-6 py-3 rounded-[10px] text-[16px] font-medium transition-colors duration-200"
					>
						Add User
					</button>
				</section> */}

				<AddUserForm />
				<AddVendorForm />

				{/* Add Vendor Form */}
				{/* <section className="bg-settings/[40%] shadow-profile-info rounded-tr-[15px] px-6 py-8">
					<h2 className="text-[24px] sm:text-[32px] font-header mb-6 text-gray-800">
						Add Vendor
					</h2>
					<div className="flex gap-4 flex-col sm:flex-row">
						<input
							type="text"
							placeholder="Vendor Name"
							value={vendorName}
							onChange={(e) => setVendorName(e.target.value)}
							className="flex-grow rounded-[10px] border border-gray-200 focus:caret-primary-300 focus:border-primary-300 px-4 py-4 text-[14px] font-light text-black appearance-none outline-none"
						/>
						<button
							onClick={handleAddVendor}
							className="bg-primary-button-100  text-white px-6 py-2 rounded-[5px] text-[16px]"
						>
							Add Vendor
						</button>
					</div> 
				</section>*/}
				<AccountSettings />
			</div>
		</div>
	);
};

export default SettingsPage;

// import ProfileInfo from "../../components/SettingsComponent/ProfileInfo";
// import AccountSettings from "../../components/SettingsComponent/AccountSettings";
// import NotificationSetting from "../../components/SettingsComponent/NotificationSetting";

// const SettingsPage = () => {
// 	return (
// 		<div className="p-3 sm:p-4 sm:pr-[4%] mb-[60px]">
// 			<div className="flex flex-col gap-[90px]">
// 				{/* Profile Information Section */}
// 				<ProfileInfo />
// 				{/* Account Settings Section */}
// 				<AccountSettings />
// 				{/* Notification Preferences Section */}
// 				<NotificationSetting />
// 			</div>
// 		</div>
// 	);
// };

// export default SettingsPage;
