import { ClipboardEvent, useRef } from "react";
import { Form, FormMethod, Link } from "react-router-dom";

interface FormProps {
	children: React.ReactNode;
	method: FormMethod;
	prop: string;
	link: string;
	content?: string;
	onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function FormContent({
	children,
	method,
	prop,
	link,
	content,
	onSubmit,
}: FormProps) {
	return (
		<>
			<div className={`${prop}`}>
				<Form
					className={` shadow-box-shadow3 pb-12 pt-4 px-11 sm:w-[440px] h-[auto] w-[90%] flex flex-col rounded-[20px] width mx-auto relative smallest:`}
					onSubmit={onSubmit}
					method={method}
				>
					{children}
				</Form>
				<p className="text-center mt-4 text-blue-950">
					<Link to={link}>{content}</Link>
				</p>
			</div>
		</>
	);
}

interface OtpProps {
	value: string;
	index: number;
	otp: string[];
	setOtp: React.Dispatch<React.SetStateAction<string[]>>;
}

export function InputOtp({ value, index, otp, setOtp }: OtpProps) {
	const inputRef = useRef<HTMLInputElement | null>(null);

	function handleOnChange(index: number, val: string) {
		if (/^\d+$/.test(val) && val.length <= 1) {
			const newOtp = [...otp];
			newOtp[index] = val;
			setOtp(newOtp);
			if (index < otp.length - 1 && inputRef.current) {
				const nextInput = inputRef.current
					.nextElementSibling as HTMLInputElement | null;
				nextInput?.focus();
			}
			return;
		}
	}

	function onHandlePaste(e: ClipboardEvent<HTMLInputElement>) {
		e.preventDefault();
		const pastedData = e.clipboardData.getData("text");
		if (/^\d+$/.test(pastedData) && pastedData.length === otp.length) {
			setOtp(pastedData.split(""));
			return;
		}

		const syntaxError = { error: "Invalid paste data. Must be 4 digits" };

		return syntaxError.error;
	}
	return (
		<input
			ref={inputRef}
			className="sm:w-[50px] text-4xl border-[2px] sm:px-6 sm:py-4 w-[34px] px-3 py-2 border-sidebar-200 rounded-[12px]"
			value={value}
			onChange={(e) => handleOnChange(index, e.target.value)}
			name={`digit${index}`}
			onPaste={(e) => onHandlePaste(e)}
			maxLength={1}
			type="text"
		/>
	);
}

interface EmailContentProp {
	children: React.ReactNode;
}

export function EmailContent({ children }: EmailContentProp) {
	return (
		<div className="flex flex-col justify-center items-center h-[100vh]">
			<div className="p-16 bg-gray-100 text-center py-[100px] leading-loose w-[570px] relative box rounded-[20px]">
				{children}
			</div>
		</div>
	);
}

interface buttonProps {
	content: string;
	prop: string;
	link: string;
}

export function LandingButton({ content, prop, link }: buttonProps) {
	return (
		<Link
			to={link}
			className={`text-[15px] !text-border !bg-background-card px-2 py-1 rounded ${prop}`}
		>
			{" "}
			{content}
		</Link>
	);
}
