import { useNavigate } from "react-router-dom";
import { Lock, Sms } from "iconsax-react";
import { toast } from "sonner";
import { FormInput } from "../../components/UI/Input/Inputs";
import LoaderSpinnerSmall from "../../components/Loaders/LoaderSpinnerSmall";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { loginSchema, TLogin } from "../../types/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";

const LoginForm = () => {
	const navigate = useNavigate();
	const signIn = useSignIn();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TLogin>({ resolver: zodResolver(loginSchema) });

	const loginMutation = useMutation({
		mutationFn: async (formData: TLogin) => {
			try {
				const response = await axios.post(
					import.meta.env.VITE_API_URL + "/auth/login",
					formData,
					{ withCredentials: true }
				);
				return response.data;
			} catch (err: any) {
				throw new Error(err.response?.data?.message || "Login failed");
			}
		},
		onSuccess: (response) => {
			if (response.accessToken) {
				signIn({
					auth: {
						type: "Bearer",
						token: response.accessToken,
					},
					userState: {
						id: response.id,
						fullName: response.fullName,
						email: response.email,
						vendor: response.vendor,
						isProfileComplete: response.isProfileComplete,
						vendorId: response.vendorId,
						role: response.role,
					},
				});
				toast.success("Login Successful");
				reset();
				if (!response.isProfileComplete) {
					navigate("/reset");
				} else {
					if (response.role === "SUPER_USER") {
						navigate("/reports");
					} else if (response.role === "ADMIN") {
						navigate("/settings");
					} else if (response.vendor) {
						navigate(`/reports/${response.vendor.toLowerCase()}`);
					} else {
						navigate("/");
					}
				}
			}
		},
		onError: (err: Error) => {
			toast.error(err.message);
		},
	});

	const submitHandler = handleSubmit((data) => {
		loginMutation.mutate(data);
	});

	return (
		<div className="h-screen bg-white md:bg-[#F5F0EB] flex flex-col md:flex-row overflow-hidden">
			{/* Left: Form Section */}
			<div className="relative w-full md:w-1/2 flex flex-1 items-center justify-center p-6 md:p-12">
				{/* Absolute heading in left section */}
				<div className="absolute w-full max-w-[50rem] top-[15%] left-1/2 transform -translate-x-1/2 z-10 text-center px-8">
					<h1 className="text-4xl md:text-4xl font-bold text-gray-700">
						Reporting and Incident Management System
					</h1>
				</div>

				{/* Login Form Card */}
				<div className="w-full max-w-2xl bg-white rounded-lg shadow-md px-10 py-16 z-0">
					<h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
						Welcome
					</h2>

					<form onSubmit={submitHandler} className="space-y-10">
						<div className="relative">
							<FormInput
								id="email"
								type="text"
								icon
								IconName={Sms}
								autoComplete="on"
								placeholder="Email"
								{...register("email")}
							/>
							{errors.email && (
								<p className="text-red-500 text-sm absolute mt-1">
									{errors.email.message}
								</p>
							)}
						</div>

						<div className="relative">
							<FormInput
								id="password"
								type="password"
								icon
								IconName={Lock}
								autoComplete="on"
								password
								placeholder="Password"
								{...register("password")}
							/>
							{errors.password && (
								<p className="text-red-500 text-sm absolute mt-1">
									{errors.password.message}
								</p>
							)}
						</div>

						<div className="text-md text-gray-700">
							If you encounter any errors{" "}
							<a
								href="mailto:pentagontechteam@gmail.com"
								className="text-[#007f5f] underline"
							>
								contact tech support
							</a>
						</div>

						<button
							type="submit"
							disabled={loginMutation.isPending}
							className="w-full bg-[#007f5f] text-white py-4 rounded-md font-semibold hover:bg-[#006a4e] transition text-xl disabled:opacity-50 disabled:cursor-not-allowed flex justify-center"
						>
							{loginMutation.isPending ? <LoaderSpinnerSmall /> : "Login"}
						</button>
					</form>
				</div>
			</div>

			{/* Right: Image Section */}
			<div className="hidden md:block w-full md:w-1/2 h-full">
				<img
					src="/images/tower-croped.png"
					alt="Background Visual"
					className="object-cover h-full w-full"
				/>
			</div>
		</div>
	);
};

export default LoginForm;

// import { useNavigate } from "react-router-dom";
// import { Lock, Sms } from "iconsax-react";
// import { toast } from "sonner";
// import { FormInput } from "../../components/UI/Input/Inputs";
// import LoaderSpinnerSmall from "../../components/Loaders/LoaderSpinnerSmall";
// import { useMutation } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import { loginSchema, TLogin } from "../../types/auth/login";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import useSignIn from "react-auth-kit/hooks/useSignIn";
// // import Logo from "../../assets/Logo/logo.png";

// const LoginForm = () => {
// 	const navigate = useNavigate();
// 	const signIn = useSignIn();

// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 		reset,
// 	} = useForm<TLogin>({ resolver: zodResolver(loginSchema) });

// 	const loginMutation = useMutation({
// 		mutationFn: async (formData: TLogin) => {
// 			try {
// 				const response = await axios.post(
// 					import.meta.env.VITE_API_URL + "/auth/login",
// 					formData,
// 					{ withCredentials: true }
// 				);

// 				// const { accessToken, refreshToken } = response.data;
// 				// localStorage.setItem("access-token", accessToken);
// 				// localStorage.setItem("refresh-token", refreshToken);

// 				// const userProfile = await axios.get(
// 				// 	import.meta.env.VITE_API_URL + "/api/users/me",
// 				// 	{
// 				// 		headers: {
// 				// 			Authorization: `Bearer ${accessToken}`,
// 				// 		},
// 				// 		withCredentials: true,
// 				// 	}
// 				// );

// 				// localStorage.setItem("user", JSON.stringify(userProfile.data));
// 				return response.data;
// 			} catch (err: any) {
// 				throw new Error(err.response?.data?.message || "Login failed");
// 			}
// 		},
// 		onSuccess: (response) => {
// 			if (response.accessToken) {
// 				signIn({
// 					auth: {
// 						type: "Bearer",
// 						token: response.accessToken,
// 					},
// 					userState: {
// 						id: response.id,
// 						fullName: response.fullName,
// 						email: response.email,
// 						vendor: response.vendor,
// 						isProfileComplete: response.isProfileComplete,
// 						vendorId: response.vendorId,
// 						role: response.role,
// 					},
// 				});
// 				toast.success("Login Successful");
// 				reset();
// 				if (!response.isProfileComplete) {
// 					navigate("/reset");
// 				} else {
// 					if (response.role === "SUPER_USER") {
// 						navigate("/reports");
// 					} else if (response.role === "ADMIN") {
// 						navigate("/settings");
// 					} else if (response.vendor) {
// 						navigate(`/reports/${response.vendor.toLowerCase()}`);
// 					} else {
// 						navigate("/");
// 					}
// 				}
// 			}
// 		},
// 		onError: (err: Error) => {
// 			toast.error(err.message);
// 		},
// 	});

// 	const submitHandler = handleSubmit((data) => {
// 		loginMutation.mutate(data);
// 	});

// 	return (
// 		<div className="flex h-screen w-screen bg-[#F5F0EB] overflow-hidden">
// 			{/* <div className="w-full md:w-1/2 flex flex-col px-8 lg:px-24 relative">
// 				<div className="flex items-center justify-center gap-4 mb-8 flex flex-col">
// 					<img src={Logo} alt="Logo" className="w-auto h-[48px]" />
// 					<span className="text-xl font-semibold">
// 						Report Management System
// 					</span>
// 				</div> */}

// 			<div className="w-full md:w-1/2 flex flex-col px-8 lg:px-24 py-8">
// 				{" "}
// 				{/* Added py-8 for top padding */}
// 				{/* Header with logo and title - positioned at top with reasonable space */}
// 				<div className="flex flex-col items-center gap-4 pt-8">
// 					{" "}
// 					{/* Added pt-8 for more top space */}
// 					{/* <img src={Logo} alt="Logo" className="w-auto h-[48px]" /> */}
// 					<h1 className="text-3xl font-semibold">
// 						REPORTING AND INCIDENT MANAGEMENT SYSTEM
// 					</h1>
// 				</div>
// 				<div className="flex flex-1 flex-col justify-center min-h-full">
// 					<h1 className="text-4xl font-bold text-text-100 mb-8">Log In</h1>

// 					<form
// 						onSubmit={submitHandler}
// 						className="flex flex-col space-y-6 w-full"
// 					>
// 						<div className="relative">
// 							<FormInput
// 								id="email"
// 								type="text"
// 								icon
// 								IconName={Sms}
// 								autoComplete="on"
// 								placeholder="Institutional Email"
// 								{...register("email")}
// 							/>
// 							{errors.email && (
// 								<p className="text-red-500 text-sm absolute mt-1">
// 									{errors.email.message}
// 								</p>
// 							)}
// 						</div>

// 						<div className="relative">
// 							<FormInput
// 								id="password"
// 								type="password"
// 								icon
// 								IconName={Lock}
// 								autoComplete="on"
// 								password
// 								placeholder="Password"
// 								{...register("password")}
// 							/>
// 							{errors.password && (
// 								<p className="text-red-500 text-sm absolute mt-1">
// 									{errors.password.message}
// 								</p>
// 							)}
// 						</div>

// 						<button
// 							type="submit"
// 							disabled={loginMutation.isPending}
// 							className="justify-center items-center w-full flex bg-[#0d7f5f] text-white font-semibold text-lg py-4 rounded-[12px] shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
// 						>
// 							{loginMutation.isPending ? <LoaderSpinnerSmall /> : "Login"}
// 						</button>
// 					</form>
// 				</div>
// 			</div>

// 			<div className="hidden md:flex md:w-1/2 h-full items-center justify-center py-10">
// 				<img
// 					src="/images/tower-croped.png"
// 					alt="Login visual"
// 					className="max-w-full max-h-full object-contain rounded-[10px] shadow-lg"
// 				/>
// 			</div>
// 		</div>
// 	);
// };

// export default LoginForm;
