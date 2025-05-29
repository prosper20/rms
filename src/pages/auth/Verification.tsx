import { useSearchParams } from "react-router-dom";
import OtpVerification from "../../components/auth/OtpVerification";
import { useAppContext } from "../../context/AppContext";

const Verification = () => {
	const { registerInfo } = useAppContext();
	const [searchParam] = useSearchParams();
	const mode = searchParam.get("mode");
	const password = mode === "password";

	return (
		<OtpVerification
			emails={registerInfo?.email}
			header={password ? "Password Reset" : "Please verify your email"}
		></OtpVerification>
	);
};

export default Verification;
