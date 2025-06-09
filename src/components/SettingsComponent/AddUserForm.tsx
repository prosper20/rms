import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";
import LoaderSpinnerSmall from "../Loaders/LoaderSpinnerSmall";

type Vendor = {
	id: string;
	name: string;
};

const AddUserForm: React.FC = () => {
	const [vendors, setVendors] = useState<Vendor[]>([]);
	const [loading, setLoading] = useState(false);
	const [userForm, setUserForm] = useState({
		fullName: "",
		email: "",
		password: "",
		vendorId: "",
		role: "",
	});

	const authHeader = useAuthHeader();
	const token = authHeader?.split(" ")[1];

	useEffect(() => {
		const fetchVendors = async () => {
			try {
				const res = await axios.get(import.meta.env.VITE_API_URL + "/vendors", {
					headers: { Authorization: `Bearer ${token}` },
				});
				setVendors(res.data);
			} catch (err) {
				console.error("Failed to fetch vendors:", err);
				toast.error("Failed to fetch vendors");
			}
		};

		fetchVendors();
	}, [token]);

	const handleUserInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setUserForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddUser = async () => {
		const { fullName, email, password, role, vendorId } = userForm;

		if (!fullName || !email || !password || !role) {
			toast.error("Please fill in all required fields.");
			return;
		}

		const userData = {
			fullName,
			email,
			password,
			role,
			...(role === "VENDOR" ? { vendorId } : {}),
		};

		setLoading(true);
		try {
			await axios.post(import.meta.env.VITE_API_URL + "/auth/user", userData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			toast.success("User added successfully");
			setUserForm({
				fullName: "",
				email: "",
				password: "",
				vendorId: "",
				role: "",
			});
		} catch (err) {
			console.error(err);
			toast.error("Failed to add user");
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="bg-settings/[40%] shadow-profile-info rounded-tr-[15px] px-6 py-8">
			<h2 className="text-[24px] sm:text-[32px] font-header mb-6 text-gray-800">
				Add User
			</h2>

			<div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
				<input
					type="text"
					name="fullName"
					placeholder="Full Name"
					value={userForm.fullName}
					onChange={handleUserInputChange}
					className="border rounded-[10px] border-gray-200 focus:border-primary-300 focus:caret-primary-300 px-4 py-4 text-[14px] font-light text-black outline-none"
				/>

				<input
					type="email"
					name="email"
					placeholder="Email"
					value={userForm.email}
					onChange={handleUserInputChange}
					className="border rounded-[10px] border-gray-200 focus:border-primary-300 focus:caret-primary-300 px-4 py-4 text-[14px] font-light text-black outline-none"
				/>

				<input
					type="password"
					name="password"
					placeholder="Password"
					value={userForm.password}
					onChange={handleUserInputChange}
					className="border rounded-[10px] border-gray-200 focus:border-primary-300 focus:caret-primary-300 px-4 py-4 text-[14px] font-light text-black outline-none"
				/>

				<select
					name="role"
					value={userForm.role}
					onChange={handleUserInputChange}
					className="border rounded-[10px] border-gray-200 focus:border-primary-300 px-4 py-4 text-[14px] font-light text-black outline-none"
				>
					<option value="">*Choose Role</option>
					<option value="ADMIN">Admin</option>
					<option value="SUPER_USER">Super User</option>
					<option value="VENDOR">Vendor</option>
				</select>

				{userForm.role === "VENDOR" && (
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
				)}
			</div>

			<button
				onClick={handleAddUser}
				className={`mt-6 bg-primary-button-100 text-white px-6 py-3 rounded-[5px] text-[16px] font-medium transition-colors duration-200 flex items-center justify-center min-w-[140px] ${
					loading ? "opacity-60 cursor-not-allowed" : ""
				}`}
				disabled={loading}
			>
				{loading ? <LoaderSpinnerSmall /> : "Add User"}
			</button>
		</section>
	);
};

export default AddUserForm;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// type Vendor = {
// 	id: string;
// 	name: string;
// };

// const AddUserForm: React.FC = () => {
// 	const [vendors, setVendors] = useState<Vendor[]>([]);
// 	const [userForm, setUserForm] = useState({
// 		fullName: "",
// 		email: "",
// 		password: "",
// 		vendorId: "",
// 		role: "",
// 	});

// 	useEffect(() => {
// 		axios
// 			.get(import.meta.env.VITE_API_URL + "/vendors", {
// 				withCredentials: true,
// 			})
// 			.then((res) => setVendors(res.data))
// 			.catch((err) => console.error("Failed to fetch vendors:", err));
// 	}, []);

// 	const handleUserInputChange = (
// 		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
// 	) => {
// 		const { name, value } = e.target;
// 		setUserForm((prev) => ({ ...prev, [name]: value }));
// 	};

// 	const handleAddUser = () => {
// 		console.log("Submitting user:", userForm);
// 		// You can call an API here to submit the form data
// 	};

// 	return (
// 		<section className="bg-settings/[40%] shadow-profile-info rounded-tr-[15px] px-6 py-8">
// 			<h2 className="text-[24px] sm:text-[32px] font-header mb-6 text-gray-800">
// 				Add User
// 			</h2>

// 			<div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
// 				<input
// 					type="text"
// 					name="fullName"
// 					placeholder="Full Name"
// 					aria-label="Full Name"
// 					value={userForm.fullName}
// 					onChange={handleUserInputChange}
// 					className="border rounded-[10px] border-gray-200 focus:caret-primary-300 focus:border-primary-300 px-4 py-4 text-[14px] font-light text-black outline-none"
// 				/>

// 				<input
// 					type="email"
// 					name="email"
// 					placeholder="Email"
// 					aria-label="Email"
// 					value={userForm.email}
// 					onChange={handleUserInputChange}
// 					className="border rounded-[10px] border-gray-200 focus:caret-primary-300 focus:border-primary-300 px-4 py-4 text-[14px] font-light text-black outline-none"
// 				/>

// 				<input
// 					type="password"
// 					name="password"
// 					placeholder="Password"
// 					aria-label="Password"
// 					value={userForm.password}
// 					onChange={handleUserInputChange}
// 					className="border rounded-[10px] border-gray-200 focus:caret-primary-300 focus:border-primary-300 px-4 py-4 text-[14px] font-light text-black outline-none"
// 				/>

// 				<select
// 					name="role"
// 					value={userForm.role}
// 					onChange={handleUserInputChange}
// 					className="border rounded-[10px] border-gray-200 focus:border-primary-300 px-4 py-4 text-[14px] font-light text-black outline-none"
// 				>
// 					<option value="">*Choose Role</option>
// 					<option value="ADMIN">Admin</option>
// 					<option value="SUPER_USER">Super User</option>
// 					<option value="VENDOR">Vendor</option>
// 				</select>

// 				{userForm.role === "VENDOR" && (
// 					<select
// 						name="vendorId"
// 						value={userForm.vendorId}
// 						onChange={handleUserInputChange}
// 						className="border rounded-[10px] border-gray-200 focus:border-primary-300 px-4 py-4 text-[14px] font-light text-black outline-none"
// 					>
// 						<option value="">Select Vendor</option>
// 						{vendors.map((vendor) => (
// 							<option key={vendor.id} value={vendor.id}>
// 								{vendor.name}
// 							</option>
// 						))}
// 					</select>
// 				)}
// 			</div>

// 			<button
// 				onClick={handleAddUser}
// 				className="mt-6 bg-primary-button-100 text-white px-6 py-3 rounded-[5px] text-[16px] font-medium transition-colors duration-200"
// 			>
// 				Add User
// 			</button>
// 		</section>
// 	);
// };

// export default AddUserForm;
