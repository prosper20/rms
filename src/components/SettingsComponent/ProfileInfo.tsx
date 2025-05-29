import { useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import userAvatar from "../../assets/user-images/default-avatar-photo.jpg";
import { formatText } from "../../utils/utilities";

type Role = "STUDENT" | "SUPERVISOR";

const ProfileInfo: React.FC = () => {
	const authUser: {
		id: string;
		fullName: string;
		email: string;
		profilePicture: string;
		role: Role;
	} | null = useAuthUser();
	// State for profile information
	const role = authUser!.role;
	const [profileInfo] = useState({
		name: authUser?.fullName || "N/A",
		email: authUser?.email || "N/A",
		role: formatText(role),
	});
	return (
		<section className="mb-4">
			<h2 className="text-[24px] sm:text-[32px] font-header mb-[43px] text-gray-800">
				Profile Information
			</h2>
			<div className="bg-settings/[40%] shadow-profile-info rounded-tr-[15px] lg:px-40 px-[10px] py-[30px]">
				<div className="flex gap-3">
					<div className=" flex justify-center flex-wrap items-center gap-[53px]">
						<img
							src={
								authUser?.profilePicture?.trim() || "" !== ""
									? authUser?.profilePicture
									: userAvatar
							}
							className="w-[140px] h-[140px] sm:w-[233px] sm:h-[233px] rounded-full object-cover border border-black/10"
							alt="profile image"
						/>
						<div className="flex items-center justify-center sm:gap-[30px]">
							<div className="flex flex-col gap-[25px] text-[18px] sm:text-[25px] font-header3">
								<div className="sm:flex sm:gap-[20px]">
									<label className="w-[100px]">Name</label>
									<p className="bg-background-primary shadow-box-shadow1 font-header2 text-text-100/[83%] px-[10px] sm:px-[20px] py-[5px] ">
										{profileInfo.name}
									</p>
								</div>
								<div className="sm:flex sm:gap-[20px]">
									<label className="w-[100px]">Email</label>
									<p className="bg-background-primary shadow-box-shadow1 font-header2 text-text-100/[83%] px-[10px] sm:px-[20px] py-[5px] ">
										{profileInfo.email}
									</p>
								</div>
								<div className="sm:flex sm:gap-[20px]">
									<label className="w-[100px]">Role</label>
									<p className="bg-background-primary shadow-box-shadow1 font-header2 text-text-100/[83%] px-[10px] sm:px-[20px] py-[5px] ">
										{profileInfo.role}
									</p>
								</div>
							</div>
							<div className="flex flex-col gap-[25px]"></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProfileInfo;
