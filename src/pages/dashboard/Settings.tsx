import ProfileInfo from "../../components/SettingsComponent/ProfileInfo";
import AccountSettings from "../../components/SettingsComponent/AccountSettings";
import AddUserForm from "../../components/SettingsComponent/AddUserForm";
import AddVendorForm from "../../components/SettingsComponent/AddVendorForm";

const SettingsPage = () => {
	return (
		<div className="bg-[#eeeeee] p-3 sm:p-4 sm:pr-[4%] mb-[60px]">
			<div className="flex flex-col gap-[90px]">
				<ProfileInfo />
				<AddUserForm />
				<AddVendorForm />
				<AccountSettings />
			</div>
		</div>
	);
};

export default SettingsPage;
