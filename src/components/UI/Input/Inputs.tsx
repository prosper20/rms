"use client";
import React, { useState, forwardRef } from "react";
import { Eye, EyeSlash } from "iconsax-react";
import { FormInputProps } from "../../../types/FormInput";

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
	(
		{
			label,
			value,
			name,
			id,
			type,
			additionalClasses,
			placeholder,
			onChange,
			additionalAttributes,
			textarea,
			password,
			icon,
			IconName,
			pattern,
			rows,
			cols,
			disabled,
			required,
			minLength,
			maxLength,
			autoComplete,
		},
		ref
	) => {
		const [visible, setVisible] = useState<boolean>(false);

		return (
			<div className="flex w-full flex-col gap-y-1">
				<label className="text-left font-light capitalize text-black text-[14px]">
					{label} {label && <span className="text-red-500">*</span>}
				</label>
				{!textarea && (
					<div className="relative">
						{icon && IconName && (
							<i className="absolute left-6 top-6 flex -translate-x-1/2 items-center">
								<IconName size="14" color="#808080" variant="TwoTone" />
							</i>
						)}

						<input
							name={name}
							id={id}
							value={value}
							ref={ref}
							className={`${
								additionalClasses
									? additionalClasses +
										"w-full outline-none text-[14px] font-light"
									: `w-full rounded-[10px] border border-gray-200 focus:caret-primary-300 focus:border-primary-300 bg-transparent ${icon ? "px-12" : "px-4"} py-4 text-[14px] font-light  outline-none`
							}`}
							type={!visible ? type : "text"}
							required={required}
							minLength={minLength}
							maxLength={maxLength}
							autoComplete={autoComplete}
							pattern={pattern}
							placeholder={placeholder}
							disabled={disabled}
							onChange={onChange}
							{...additionalAttributes}
						/>
						{password && (
							<i className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center text-black">
								<button
									type="button"
									onClick={() => setVisible(!visible)}
									aria-label={visible ? "Hide password" : "Show password"}
								>
									<span className="sr-only">
										{visible ? "Hide password" : "Show password"}
									</span>
									{visible ? (
										<Eye size="14" color="#808080" variant="TwoTone" />
									) : (
										<EyeSlash size="14" color="#808080" variant="TwoTone" />
									)}
								</button>
							</i>
						)}
					</div>
				)}
				{textarea && (
					<textarea
						className="w-full outline-none focus:ring-1 ring-black rounded-md border border-gray-200 bg-transparent px-4 py-4 text-[14px] font-light"
						rows={rows}
						cols={cols}
						disabled={disabled}
						placeholder={placeholder}
						maxLength={maxLength}
						onChange={onChange}
					></textarea>
				)}
			</div>
		);
	}
);
import { FieldError } from "react-hook-form";

type Option = {
	label: string;
	value: string;
};

type SelectInputProps = {
	id: string;
	options: Option[];
	error?: FieldError;
	icon?: React.ElementType;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
	({ id, options, error, icon: Icon, ...rest }, ref) => {
		return (
			<div className=" relative w-full">
				{/* Icon on the left-hand side */}
				{Icon && (
					<div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-gray-500">
						<Icon size="14" color="#808080" variant="TwoTone" />
					</div>
				)}

				<select
					id={id}
					ref={ref}
					{...rest}
					className={`w-full appearance-none p-4 pl-12 pr-8 text-[14px] rounded-[12px] border  focus:caret-primary-300 focus:border-primary-300 bg-transparent  ${
						error ? "border-red-500" : "border-gray-200"
					}  focus:outline-none text-slate-400/80 font-[100] `}
				>
					<option value="">Role</option>
					{options.map((opt) => (
						<option key={opt.value} value={opt.value}>
							{opt.label}
						</option>
					))}
				</select>

				{/* Error text */}
				{error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
			</div>
		);
	}
);

SelectInput.displayName = "SelectInput";

// interface InputProps {
// 	label: string;
// 	name: string;
// }

// export const Input: React.FC<InputProps> = ({ label, name }) => {
// 	return (
// 		<>
// 			<div className="flex flex-col ">
// 				<label className="text-[16px] md:text-[24px] text-border font-header mb-1">
// 					{label}
// 				</label>
// 				<input
// 					type="text"
// 					name={name}
// 					className="rounded-full border shadow-add-task border-border/[40%] bg-background-100 px-4 md:px-8 text-[16px] md:text-[24px] text-border font-header2 outline-none py-1 w-[100%] md:w-[325px] md:h-[52px]"
// 				/>
// 			</div>
// 		</>
// 	);
// };

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	name: string;
}

export const Input: React.FC<InputProps> = ({
	label,
	name,
	value,
	onChange,
	type = "text",
	placeholder,
	required,
	className,
	...rest
}) => {
	return (
		<div className="flex flex-col w-full">
			<label
				htmlFor={name}
				className="text-[16px] md:text-[24px] text-border font-header mb-1"
			>
				{label}
			</label>
			<input
				id={name}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				className={`rounded-full border shadow-add-task border-border/[40%] bg-background-100 px-4 md:px-8 text-[16px] md:text-[24px] text-border font-header2 outline-none py-1 w-full md:w-[325px] md:h-[52px] ${className || ""}`}
				{...rest}
			/>
		</div>
	);
};

// import React, { forwardRef } from "react";
// import { FieldError } from "react-hook-form";

// type Option = {
// 	label: string;
// 	value: string;
// };

type SelectInputProps2 = {
	id: string;
	name: string;
	options: Option[];
	label?: string;
	error?: FieldError;
	placeholder?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const SelectInput2 = forwardRef<HTMLSelectElement, SelectInputProps2>(
	(
		{
			id,
			name,
			label,
			options,
			error,
			placeholder = "Select an option",
			...rest
		},
		ref
	) => {
		return (
			<div className="flex flex-col w-full">
				{label && (
					<label
						htmlFor={id}
						className="text-[16px] md:text-[24px] text-border font-header mb-1"
					>
						{label}
					</label>
				)}
				<select
					id={id}
					name={name}
					ref={ref}
					{...rest}
					className={`rounded-full border shadow-add-task border-border/[40%] bg-background-100 px-4 md:px-8 text-[16px] md:text-[24px] text-border font-header2 outline-none py-1 w-full md:w-[325px] md:h-[52px] ${
						error ? "border-red-500" : ""
					}`}
				>
					<option value="">{placeholder}</option>
					{options.map((opt) => (
						<option key={opt.value} value={opt.value}>
							{opt.label}
						</option>
					))}
				</select>
				{error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
			</div>
		);
	}
);

SelectInput.displayName = "SelectInput";
