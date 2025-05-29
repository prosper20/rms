import React, { useState } from "react";
import { Lock, Sms } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import LoaderSpinnerSmall from "../../components/Loaders/LoaderSpinnerSmall";
import { FormInput } from "../../components/UI/Input/Inputs";

type Role = "ADMIN" | "VENDOR" | "SUPER_USER";

const ResetPassword = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const authHeader = useAuthHeader();
	const token = authHeader?.split(" ")[1];

	const authUser: {
		id: string;
		fullName: string;
		email: string;
		role: Role;
		vendor: string;
		isProfileComplete: boolean;
		vendorId: string;
	} | null = useAuthUser();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (!authUser) {
			setError("User not authenticated");
			return;
		}

		try {
			setError("");
			setIsLoading(true);

			await axios.post(
				`${import.meta.env.VITE_API_URL}/auth/reset`,
				{ email: authUser.email, password },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			toast.success("Password reset successful");

			if (authUser.role === "SUPER_USER") {
				navigate("/reports");
			} else if (authUser.role === "ADMIN") {
				navigate("/settings");
			} else if (authUser.vendor) {
				navigate(`/reports/${authUser.vendor.toLowerCase()}`);
			} else {
				navigate("/");
			}
		} catch (err: any) {
			setError(err.response?.data?.message || "Something went wrong.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="h-screen bg-white md:bg-[#F5F0EB] flex flex-col md:flex-row overflow-hidden">
			{/* Left: Form Section */}
			<div className="relative w-full md:w-1/2 flex flex-1 items-center justify-center p-6 md:p-12">
				{/* Heading */}
				<div className="absolute w-full max-w-[50rem] top-[15%] left-1/2 transform -translate-x-1/2 z-10 text-center px-8">
					<h1 className="text-4xl md:text-4xl font-bold text-gray-700">
						Protect Your Information
					</h1>
				</div>

				{/* Form Card */}
				<div className="w-full max-w-2xl bg-white rounded-lg shadow-md px-10 py-16 z-0">
					<h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
						Reset your password
					</h2>

					{error && (
						<div className="text-red-600 text-sm mb-4 text-center p-3 bg-red-50 rounded-lg">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-10">
						{/* Display Email */}
						<FormInput
							id="email"
							type="text"
							name="email"
							disabled
							placeholder="Email"
							icon
							IconName={Sms}
							value={authUser?.email || ""}
							onChange={() => {}}
							autoComplete="off"
						/>

						{/* Password */}
						<FormInput
							id="password"
							name="password"
							type="password"
							placeholder="New Password"
							icon
							IconName={Lock}
							password
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							autoComplete="new-password"
						/>

						{/* Confirm Password */}
						<FormInput
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							placeholder="Confirm Password"
							icon
							IconName={Lock}
							password
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							autoComplete="new-password"
						/>

						<button
							type="submit"
							disabled={isLoading}
							className="w-full bg-[#007f5f] text-white py-4 rounded-md font-semibold hover:bg-[#006a4e] transition text-xl disabled:opacity-50 disabled:cursor-not-allowed flex justify-center"
						>
							{isLoading ? <LoaderSpinnerSmall /> : "Reset Password"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;

// import React, { useState } from "react";
// import { Eye, EyeSlash } from "iconsax-react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "sonner";
// import useAuthUser from "react-auth-kit/hooks/useAuthUser";
// import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

// type Role = "ADMIN" | "VENDOR" | "SUPER_USER";

// const ResetPassword = () => {
// 	const [password, setPassword] = useState("");
// 	const [confirmPassword, setConfirmPassword] = useState("");
// 	const [showPassword, setShowPassword] = useState(false);
// 	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// 	const [error, setError] = useState("");

// 	const navigate = useNavigate();
// 	const authHeader = useAuthHeader();
// 	const token = authHeader?.split(" ")[1];

// 	const authUser: {
// 		id: string;
// 		fullName: string;
// 		email: string;
// 		role: Role;
// 		vendor: string;
// 		isProfileComplete: boolean;
// 		vendorId: string;
// 	} | null = useAuthUser();

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();

// 		if (password !== confirmPassword) {
// 			setError("Passwords do not match");
// 			return;
// 		}

// 		if (!authUser) {
// 			setError("User not authenticated");
// 			return;
// 		}

// 		try {
// 			setError("");
// 			await axios.post(
// 				`${import.meta.env.VITE_API_URL}/auth/reset`,
// 				{ email: authUser.email, password },
// 				{
// 					headers: {
// 						Authorization: `Bearer ${token}`,
// 					},
// 				}
// 			);

// 			toast.success("Password reset successful");

// 			// Redirect based on role
// 			if (authUser.role === "SUPER_USER") {
// 				navigate("/reports");
// 			} else if (authUser.role === "ADMIN") {
// 				navigate("/settings");
// 			} else if (authUser.vendor) {
// 				navigate(`/reports/${authUser.vendor.toLowerCase()}`);
// 			} else {
// 				navigate("/");
// 			}
// 		} catch (err: any) {
// 			setError(err.response?.data?.message || "Something went wrong.");
// 		}
// 	};

// 	return (
// 		<div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center p-4">
// 			<div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8">
// 				<h1 className="text-center text-2xl font-semibold text-[#004225] mb-6">
// 					Reset Password
// 				</h1>

// 				{error && (
// 					<div className="text-red-600 text-sm mb-4 text-center p-3 bg-red-50 rounded-lg">
// 						{error}
// 					</div>
// 				)}

// 				<form onSubmit={handleSubmit} className="space-y-6">
// 					{/* Email display only */}
// 					<div>
// 						<label className="block mb-2 text-sm font-medium text-gray-700">
// 							Email
// 						</label>
// 						<input
// 							type="email"
// 							value={authUser?.email || ""}
// 							disabled
// 							className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700 text-base"
// 						/>
// 					</div>

// 					<div className="relative">
// 						<label className="block mb-2 text-sm font-medium text-gray-700">
// 							New Password<span className="text-red-600"> *</span>
// 						</label>
// 						<input
// 							type={showPassword ? "text" : "password"}
// 							value={password}
// 							onChange={(e) => setPassword(e.target.value)}
// 							required
// 							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007f5f] text-base"
// 						/>
// 						<button
// 							type="button"
// 							className="absolute top-[42px] right-3 text-gray-500 hover:text-gray-700"
// 							onClick={() => setShowPassword(!showPassword)}
// 						>
// 							{showPassword ? (
// 								<EyeSlash size="20" variant="Bold" />
// 							) : (
// 								<Eye size="20" variant="Bold" />
// 							)}
// 						</button>
// 					</div>

// 					<div className="relative">
// 						<label className="block mb-2 text-sm font-medium text-gray-700">
// 							Confirm Password<span className="text-red-600"> *</span>
// 						</label>
// 						<input
// 							type={showConfirmPassword ? "text" : "password"}
// 							value={confirmPassword}
// 							onChange={(e) => setConfirmPassword(e.target.value)}
// 							required
// 							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007f5f] text-base"
// 						/>
// 						<button
// 							type="button"
// 							className="absolute top-[42px] right-3 text-gray-500 hover:text-gray-700"
// 							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// 						>
// 							{showConfirmPassword ? (
// 								<EyeSlash size="20" variant="Bold" />
// 							) : (
// 								<Eye size="20" variant="Bold" />
// 							)}
// 						</button>
// 					</div>

// 					<button
// 						type="submit"
// 						className="w-full bg-[#007f5f] text-white py-3 rounded-lg font-semibold hover:bg-[#006a4e] transition text-base"
// 					>
// 						Reset Password
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default ResetPassword;
