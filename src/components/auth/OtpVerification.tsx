import { useState } from "react";
import FormContent, { EmailContent, InputOtp } from "./AuthUtils";
import { Verified, BadgeX } from "lucide-react";

interface Props {
	children?: React.ReactNode;
	header: string;
	emails?: string | undefined;
}

const OtpVerification: React.FC<Props> = ({ header, emails }) => {
	const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
	const [error] = useState<string | null>(null);
	const isSubmitting: boolean = false;
	let startTimer;
	let formattedTime;
	const duration = 1;

	return (
		<div>
			{!error ? (
				<FormContent
					method={"post"}
					prop={
						"sm:h-[100vh] h-[100vh] text-center items-center flex flex-col justify-center text-text-100"
					}
					link={"/authentication?mode=login"}
				>
					<p className="text-[24px] font-header2 mb-3 mt-[80px] max-bw:text-[19px] sm:mt-[103px]">
						{header}
					</p>
					<p className="mb-6 max-bw:mb-3 text-[14px]">
						Enter the OTP we sent to{" "}
					</p>
					<p className="font-bold text-[14px] mb-6">{emails} </p>
					<div className="flex justify-center items-center gap-3">
						{otp.map((digits: string, index: number) => {
							return (
								<>
									<InputOtp
										key={index}
										index={index}
										value={digits}
										setOtp={setOtp}
										otp={otp}
									/>
									<input type="hidden" name="otp" value={otp.join("")} />
									<input type="hidden" name="email" value={emails} />
								</>
							);
						})}
					</div>
					<p className="sm:mt-9 mt-9 text-[14px] mb-3 max-bw:hidden">
						Check your email to access your OTP
					</p>
					<p className="text-[12px] max-bw:mt-4">
						If you don't see it, you may need to check your spam folder.
					</p>
					<p className="mt-6 mb-0 text-[12px] ">Still can't find the email?</p>
					<p className="my-4 text-[12px]">
						{duration > 0 ? formattedTime : "01:00"}
					</p>
					<button
						onClick={startTimer}
						type="button"
						disabled={duration > 0}
						className="disabled:bg-stone-300 rounded-[8px] text-[12px] w-[88px] text-text-100 mb-4 p-2 bg-sidebar-200/60 m-auto"
					>
						Resend OTP
					</button>
					<button className="py-[5px] px-2 disabled:bg-stone-300 bg-sidebar-100 mt-4 text-white text-[12px] rounded-[3px]">
						{isSubmitting ? "Processing..." : "Continue"}
					</button>
					{/* <img
        className="absolute w-[90px] top-0 left-[40%] mt-[20px] m-auto"
        src={tick}
        alt=""
      /> */}
					<div className="absolute w-full place-items-center top-0 left-0 mt-[20px] m-auto text-sidebar-100">
						<Verified size={57} className="sm:w-full w-[40px]" />
					</div>
				</FormContent>
			) : (
				<EmailContent>
					<>
						<h1 className="text-3xl text-red-600 text-center p-2 ">Error</h1>
						<h1 className="text-3xl text-center p-5 mb-8">{error}</h1>

						<button
							className="px-3 py-1 text-[15px] text-white bg-slate-500"
							// onClick={refresh}
						>
							Refresh
						</button>
						<BadgeX size={57} className="sm:w-full w-[40px]" />
						{/* <img 
            className="absolute w-[90px] top-0 left-[43%] mt-[-40px]" 
            src={badTick} alt="" /> */}
					</>
				</EmailContent>
			)}
		</div>
	);
};

export default OtpVerification;
