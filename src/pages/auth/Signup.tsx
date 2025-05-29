import { Link, useNavigate } from "react-router-dom";
import { Profile, Sms, Unlock } from "iconsax-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { genSaltSync, hashSync } from "bcrypt-ts";

import { FormInput, SelectInput } from "../../components/UI/Input/Inputs";
import { signupSchema, TSignup } from "../../types/auth/signup";
import { BASE_URL, PostRequest } from "../../utils/url";
import { useAppContext } from "../../context/AppContext";
import Logo from "../../assets/Logo/logo.svg";

const Signup = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TSignup>({
		resolver: zodResolver(signupSchema),
	});

	const navigate = useNavigate();
	const { setRegisterInfo } = useAppContext();

	const { mutate, isPending } = useMutation({
		mutationFn: PostRequest,
		onSuccess: (res) => {
			if (res.status === 200) {
				navigate("/verify");
				reset();
			}
		},
		onError: () => {
			console.log("error");
			toast.error("This email already exists.");
		},
	});

	const submitHandler = handleSubmit((data: TSignup) => {
		setRegisterInfo(data);
		// const salt = genSaltSync(10);
		// const hash = hashSync(data.password, salt);

		const postData = {
			url: `${BASE_URL}/auth/signup`,
			data: {
				...data,
				password: data.password,
				passwordConfirm: data.passwordConfirm,
			},
		};

		mutate(postData);
	});

	// const submitHandler = handleSubmit(
	// 	(data) => {
	// 	  console.log("Submitted data:", data); // This should log
	// 	},
	// 	(errors) => {
	// 	  console.log("Validation errors:", errors); // This helps debug
	// 	}
	//   );

	return (
		<div className="flex h-screen w-screen bg-[#F5F0EB] overflow-hidden">
			{/* Left image side */}
			<div className="hidden md:flex md:w-1/2 h-full items-start justify-start p-6">
				<div className="w-full h-full relative">
					<img
						src={Logo}
						alt="Spaces logo"
						className="w-20 h-20 absolute top-12 left-12 z-10"
					/>
					<img
						src="/images/signup-image.png"
						alt="Sign up visual"
						className="w-full h-full object-cover rounded-[16px]"
					/>
				</div>
			</div>

			{/* Right form side */}
			<div className="w-full md:w-1/2 flex flex-col justify-center px-8 lg:px-24">
				<h1 className="text-4xl font-bold text-text-100 mb-8">Sign Up</h1>

				<form
					onSubmit={submitHandler}
					className="flex flex-col space-y-6 w-full"
				>
					<FormInput
						id="fullName"
						type="text"
						icon
						IconName={Profile}
						autoComplete="on"
						placeholder="Full Name"
						{...register("fullName")} // fullName
					/>
					{errors.fullName && (
						<p className="text-red-500 text-sm">{errors.fullName.message}</p>
					)}

					<FormInput
						id="email"
						type="email"
						icon
						IconName={Sms}
						autoComplete="on"
						placeholder="Institutional Email"
						{...register("email")}
					/>
					{errors.email && (
						<p className="text-red-500 text-sm">{errors.email.message}</p>
					)}

					{/* <FormInput
						id="role"
						type="text"
						icon
						IconName={Profile}
						autoComplete="on"
						placeholder="Role Selection"
						{...register("role")} //role
					/>
					{errors.email && (
						<p className="text-red-500 text-sm">{errors.email.message}</p>
					)} */}

					<SelectInput
						id="role"
						icon={Profile}
						options={[
							{ label: "Student", value: "STUDENT" },
							{ label: "Supervisor", value: "SUPERVISOR" },
						]}
						{...register("role")}
						error={errors.role}
					/>

					<FormInput
						id="password"
						type="password"
						icon
						password
						IconName={Unlock}
						autoComplete="on"
						placeholder="Password"
						{...register("password")}
					/>
					{errors.password && (
						<p className="text-red-500 text-sm">{errors.password.message}</p>
					)}

					<FormInput
						id="passwordConfirm"
						type="password"
						icon
						password
						IconName={Unlock}
						autoComplete="off"
						placeholder="Confirm Password"
						{...register("passwordConfirm")}
					/>
					{errors.passwordConfirm && (
						<p className="text-red-500 text-sm">
							{errors.passwordConfirm.message}
						</p>
					)}

					<button
						type="submit"
						disabled={isPending}
						className="bg-[#B28B50] text-white font-semibold text-lg py-4 rounded-[12px] shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isPending ? "Signing up..." : "Sign Up"}
					</button>
				</form>

				<p className="mt-6 text-center text-sm text-text-100">
					Already have an account?{" "}
					<Link
						to="/login"
						className="text-button-100 font-medium hover:underline"
					>
						Log In
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Signup;
