import { Verified } from "lucide-react";
import { EmailContent } from "../components/auth/AuthUtils";
import { LandingButton } from "../components/auth/AuthUtils";
export default function EmailSuccess() {
	return (
		<>
			<EmailContent>
				<h1 className="text-3xl text-center p-5 mb-8">
					Email Verification Successfull!
				</h1>
				<LandingButton
					content={"Continue to Login "}
					prop={"pt-[9px] pb-[9px] text-[15px] text-white bg-green-600"}
					link={"/login"}
				/>
				<div className="absolute w-full place-items-center top-[0px] left-0 mt-[20px] m-auto text-sidebar-100">
					<Verified size={57} className="sm:w-full w-[40px]" />
				</div>
			</EmailContent>
		</>
	);
}
