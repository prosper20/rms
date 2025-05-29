import MobileProfileInfo from "../components/ProfileComponents/MobileProfileInfo";
import ModulesEnrolled from "../components/ProfileComponents/ModulesEnrolled";
import ProfileInformation from "../components/ProfileComponents/ProfileInformation";
import ActiveGroupsCard from "./dashboard/widgets/ActiveGroupsCard";

const ProfilePage = () => (
	<div className="w-[94%] mx-auto">
		<h1 className="text-[24px] sm:text-[36px] font-header text-text-100 sm:mt-[10px] mt-[20px] mb-[32px]">
			Profile's Information
		</h1>
		<div className="mb-[78px]">
			<ProfileInformation></ProfileInformation>
			<MobileProfileInfo />
		</div>

		<div className="grid md:grid-cols-2 gap-[20px] mb-[50px]">
			<ModulesEnrolled />
			<ActiveGroupsCard
				className="!shadow-profile-info"
				header={"Groups"}
			></ActiveGroupsCard>
		</div>
	</div>
);
export default ProfilePage;
