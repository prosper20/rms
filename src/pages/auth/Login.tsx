import { useNavigate } from "react-router-dom";
import { Lock, Sms } from "iconsax-react";
import { Toaster } from "sonner";
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
		setError,
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
			const message = err.message;
			if (message === "Incorrect password" || message === "User not found") {
				setError("password", {
					type: "manual",
					message: "Incorrect email or password",
				});
			} else {
				toast.error(message);
			}
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
				<div className="absolute w-full max-w-[50rem] top-[15%] left-1/2 transform -translate-x-1/2 z-10 text-center px-8 short:hidden">
					<h1 className="text-4xl md:text-4xl font-bold text-gray-700">
						Reporting and Incident Management System
					</h1>
				</div>

				{/* <div className="absolute w-full max-w-[50rem] top-[15%] left-1/2 transform -translate-x-1/2 z-10 text-center px-8">
					<h1 className="text-4xl md:text-4xl font-bold text-gray-700">
						Reporting and Incident Management System
					</h1>
				</div> */}

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

						<div className="text-md text-right text-gray-700">
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
			<div className="hidden lg:block w-full md:w-1/2 h-full">
				<img
					src="/images/tower-croped.png"
					alt="Background Visual"
					className="object-cover h-full w-full"
				/>
			</div>
			<Toaster richColors position="top-right" />
		</div>
	);
};

export default LoginForm;
