import React, { useState } from "react";
import { Eye, EyeSlash } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

type Role = "ADMIN" | "VENDOR" | "SUPER_USER";

const ResetPassword = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [error, setError] = useState("");

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

			// Redirect based on role
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
		}
	};

	return (
		<div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center p-4">
			<div className="w-full max-w-lg bg-white rounded-xl shadow-md p-8">
				<h1 className="text-center text-2xl font-semibold text-[#004225] mb-6">
					Reset Password
				</h1>

				{error && (
					<div className="text-red-600 text-sm mb-4 text-center p-3 bg-red-50 rounded-lg">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Email display only */}
					<div>
						<label className="block mb-2 text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							value={authUser?.email || ""}
							disabled
							className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700 text-base"
						/>
					</div>

					<div className="relative">
						<label className="block mb-2 text-sm font-medium text-gray-700">
							New Password<span className="text-red-600"> *</span>
						</label>
						<input
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007f5f] text-base"
						/>
						<button
							type="button"
							className="absolute top-[42px] right-3 text-gray-500 hover:text-gray-700"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<EyeSlash size="20" variant="Bold" />
							) : (
								<Eye size="20" variant="Bold" />
							)}
						</button>
					</div>

					<div className="relative">
						<label className="block mb-2 text-sm font-medium text-gray-700">
							Confirm Password<span className="text-red-600"> *</span>
						</label>
						<input
							type={showConfirmPassword ? "text" : "password"}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007f5f] text-base"
						/>
						<button
							type="button"
							className="absolute top-[42px] right-3 text-gray-500 hover:text-gray-700"
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
						>
							{showConfirmPassword ? (
								<EyeSlash size="20" variant="Bold" />
							) : (
								<Eye size="20" variant="Bold" />
							)}
						</button>
					</div>

					<button
						type="submit"
						className="w-full bg-[#007f5f] text-white py-3 rounded-lg font-semibold hover:bg-[#006a4e] transition text-base"
					>
						Reset Password
					</button>
				</form>
			</div>
		</div>
	);
};

export default ResetPassword;

// import React, { useState } from "react";
// // import { FaEye, FaEyeSlash } from "react-icons/fa";
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
// 	// const authUser = useAuthUser();
// 	const authHeader = useAuthHeader();
// 	const token = authHeader?.split(" ")[1];

// 	const authUser: {
// 		id: string;
// 		fullName: string;
// 		email: string;
// 		role: Role;
// 		vendor: string;
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
// 			<div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
// 				<h1 className="text-center text-xl font-semibold text-[#004225] mb-4">
// 					Reset Password
// 				</h1>

// 				{error && (
// 					<div className="text-red-600 text-sm mb-3 text-center">{error}</div>
// 				)}

// 				<form onSubmit={handleSubmit} className="space-y-4">
// 					{/* Email display only */}
// 					<div>
// 						<label className="block mb-1 text-sm font-medium text-gray-700">
// 							Email
// 						</label>
// 						<input
// 							type="email"
// 							value={authUser?.email || ""}
// 							disabled
// 							className="w-full p-2 border rounded-lg bg-gray-100 text-gray-500"
// 						/>
// 					</div>

// 					<div className="relative">
// 						<label className="block mb-1 text-sm font-medium text-gray-700">
// 							New Password<span className="text-red-600"> *</span>
// 						</label>
// 						<input
// 							type={showPassword ? "text" : "password"}
// 							value={password}
// 							onChange={(e) => setPassword(e.target.value)}
// 							required
// 							className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007f5f]"
// 						/>
// 						<span
// 							className="absolute top-[38px] right-3 text-gray-500 cursor-pointer"
// 							onClick={() => setShowPassword(!showPassword)}
// 						>
// 							{/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
// 							{showConfirmPassword ? "SHOW" : "HIDE"}
// 						</span>
// 					</div>

// 					<div className="relative">
// 						<label className="block mb-1 text-sm font-medium text-gray-700">
// 							Confirm Password<span className="text-red-600"> *</span>
// 						</label>
// 						<input
// 							type={showConfirmPassword ? "text" : "password"}
// 							value={confirmPassword}
// 							onChange={(e) => setConfirmPassword(e.target.value)}
// 							required
// 							className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007f5f]"
// 						/>
// 						<span
// 							className="absolute top-[38px] right-3 text-gray-500 cursor-pointer"
// 							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// 						>
// 							{/* {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} */}
// 							{showConfirmPassword ? "SHOW" : "HIDE"}
// 						</span>
// 					</div>

// 					<button
// 						type="submit"
// 						className="w-full bg-[#007f5f] text-white py-2 rounded-lg font-semibold hover:bg-[#006a4e] transition"
// 					>
// 						Reset Password
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default ResetPassword;

// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const ResetPassword = () => {
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [confirmPassword, setConfirmPassword] = useState("");
// 	const [showPassword, setShowPassword] = useState(false);
// 	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// 	const [error, setError] = useState("");
// 	const [success, setSuccess] = useState("");

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();

// 		if (password !== confirmPassword) {
// 			setError("Passwords do not match");
// 			setSuccess("");
// 			return;
// 		}

// 		try {
// 			setError("");
// 			// Call your backend API here (adjust URL and payload as needed)
// 			console.log({ email, password });

// 			setSuccess("Password reset successful!");
// 		} catch (err) {
// 			setError("Something went wrong.");
// 		}
// 	};

// 	return (
// 		<div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center p-4">
// 			<div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
// 				<h1 className="text-center text-xl font-semibold text-[#004225] mb-4">
// 					Reset Password
// 				</h1>

// 				{error && (
// 					<div className="text-red-600 text-sm mb-3 text-center">{error}</div>
// 				)}
// 				{success && (
// 					<div className="text-green-600 text-sm mb-3 text-center">
// 						{success}
// 					</div>
// 				)}

// 				<form onSubmit={handleSubmit} className="space-y-4">
// 					<div>
// 						<label className="block mb-1 text-sm font-medium text-gray-700">
// 							Email<span className="text-red-600"> *</span>
// 						</label>
// 						<input
// 							type="email"
// 							value={email}
// 							onChange={(e) => setEmail(e.target.value)}
// 							required
// 							className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007f5f]"
// 						/>
// 					</div>

// 					<div className="relative">
// 						<label className="block mb-1 text-sm font-medium text-gray-700">
// 							New Password<span className="text-red-600"> *</span>
// 						</label>
// 						<input
// 							type={showPassword ? "text" : "password"}
// 							value={password}
// 							onChange={(e) => setPassword(e.target.value)}
// 							required
// 							className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007f5f]"
// 						/>
// 						<span
// 							className="absolute top-9 right-3 text-gray-500 cursor-pointer"
// 							onClick={() => setShowPassword(!showPassword)}
// 						>
// 							{showPassword ? <FaEyeSlash /> : <FaEye />}
// 						</span>
// 					</div>

// 					<div className="relative">
// 						<label className="block mb-1 text-sm font-medium text-gray-700">
// 							Confirm Password<span className="text-red-600"> *</span>
// 						</label>
// 						<input
// 							type={showConfirmPassword ? "text" : "password"}
// 							value={confirmPassword}
// 							onChange={(e) => setConfirmPassword(e.target.value)}
// 							required
// 							className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007f5f]"
// 						/>
// 						<span
// 							className="absolute top-9 right-3 text-gray-500 cursor-pointer"
// 							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// 						>
// 							{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
// 						</span>
// 					</div>

// 					<button
// 						type="submit"
// 						className="w-full bg-[#007f5f] hover:bg-[#004225] text-white font-semibold py-2 rounded-lg transition"
// 					>
// 						Reset Password
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default ResetPassword;
