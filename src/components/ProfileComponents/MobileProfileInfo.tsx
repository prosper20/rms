import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import userAvatar from "../../assets/user-images/default-avatar-photo.jpg";

const MobileProfileInfo: React.FC = () => {
	const authUser: {
		id: string;
		fullName: string;
		email: string;
		profilePicture: string;
	} | null = useAuthUser();
	return (
		<div className="hidden max-pd:block">
			<div className="flex flex-1 flex-col justify-center align-center shadow-profile-info py-[39px] rounded-tr-[15px] bg-background-primary">
				<div className="mx-auto mb-[15px]">
					<img
						src={
							authUser?.profilePicture?.trim() || "" !== ""
								? authUser?.profilePicture
								: userAvatar
						}
						className="w-[233px] h-[233px] max-sw:w-[120px] max-sw:h-[120px] rounded-full object-cover border border-black/10"
						alt="profile image"
					/>
				</div>
				<div className="mx-auto">
					<h1 className="text-[19px] sm:text-[25px] text-text-100  border-b leading-11 border-b-gray-300 text-center mb-[16px]">
						{authUser?.fullName || "NA"}
					</h1>
					<p className="text-[17px] sm:text-[20px] mb-[13px] italic text-center font-header3">
						{authUser?.email || "NA"}
					</p>
					<p className="text-[17px] sm:text-[20px] text-center font-header3">
						Systems Engineering
					</p>
				</div>
			</div>
		</div>
	);
};

export default MobileProfileInfo;
