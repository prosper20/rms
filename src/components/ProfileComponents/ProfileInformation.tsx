import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import userAvatar from "../../assets/user-images/default-avatar-photo.jpg";

const ProfileInformation: React.FC = () => {
	const authUser: {
		id: string;
		fullName: string;
		email: string;
		profilePicture: string;
	} | null = useAuthUser();
	return (
		<div className="p-4 relative max-pd:hidden">
			<div className="flex items-center">
				<div className="absolute left-0">
					<img
						src={
							authUser?.profilePicture?.trim() || "" !== ""
								? authUser?.profilePicture
								: userAvatar
						}
						className="w-[233px] h-[233px] max-sw:w-[50px] max-sw:h-[50px] rounded-full object-cover border border-black/10"
						alt="profile image"
					/>
				</div>
				<div className="flex flex-1 flex-col justify-center align-center rounded-tl-[145px] h-[190px] rounded-bl-[145px] shadow-profile-info p-[29px] rounded-tr-[15px] bg-background-primary">
					<div className="mx-auto pl-[120px]">
						<h1 className="text-[32px] text-text-100  border-b leading-11 border-b-gray-300 text-center mb-[26px]">
							{authUser?.fullName || "NA"}
						</h1>
						<p className="text-[24px] mb-[13px] italic text-center font-header3">
							{authUser?.email || "NA"}
						</p>
						<p className="text-[24px] text-center font-header3">
							Systems Engineering
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileInformation;
