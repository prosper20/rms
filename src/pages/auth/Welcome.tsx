import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo/logo.svg";

const Welcome: React.FC = () => {
	const navigate = useNavigate();

	const handleStart = () => {
		navigate("/login");
	};

	return (
		<div className="h-screen w-screen flex flex-col md:flex-row bg-[#F5F0EB] overflow-hidden">
			{/* Left Content */}
			<div className="md:w-1/2 flex-1 flex flex-col justify-center items-center text-center px-6 py-12">
				<div className="mb-6 w-full max-w-[500px]">
					{/* Logo */}
					<div className="mb-6">
						<img
							src={Logo}
							alt="Spaces Icon"
							className="w-12 h-12 mx-auto mb-4"
						/>
					</div>

					<h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
						Welcome to Spaces
					</h1>
					<p className="text-gray-600 text-lg lg:text-xl">
						Your collaborative hub for study groups and projects
					</p>

					<button
						onClick={handleStart}
						className="mt-8 px-6 py-4 bg-[#B28B50] text-white font-semibold text-lg rounded-md hover:bg-[#a67230] transition w-full"
					>
						Get Started
					</button>
				</div>
			</div>

			<div className="hidden md:block md:w-1/2 rounded-tl-[10px] rounded-bl-[10px] h-full overflow-hidden">
				<img
					src="/images/welcome-image.png"
					alt="Students collaborating"
					className="w-full h-full object-cover"
				/>
			</div>
		</div>
	);
};

export default Welcome;
