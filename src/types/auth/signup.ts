import { z } from "zod";

export const signupSchema = z
	.object({
		email: z.string({ required_error: "Email is required" }).email(),
		password: z
			.string({ required_error: "Password is required" })
			.min(1, "Password is required"),
		passwordConfirm: z.string({
			required_error: "Confirm password is required",
		}),
		fullName: z
			.string({ required_error: "Full name is required" })
			.min(1, "Full name is required"),
		role: z.enum(["STUDENT", "SUPERVISOR"], {
			required_error: "Role is required",
		}),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Password must match",
		path: ["passwordConfirm"],
	});

export type TSignup = z.infer<typeof signupSchema>;

// import { z } from "zod";

// export const signupSchema = z
// 	.object({
// 		email: z
// 			.string({ required_error: "Email is required" })
// 			.email("Invalid email address")
// 			.regex(/^[\w-.]+@live\.tees\.ac\.uk$/, {
// 				message:
// 					"Email must be a valid institutional email (e.g. user@live.tees.ac.uk)",
// 			}),
// 		password: z
// 			.string({ required_error: "Password is required" })
// 			.min(1, "Password is required"),
// 		passwordConfirm: z.string({
// 			required_error: "Confirm password is required",
// 		}),
// 		fullName: z
// 			.string({ required_error: "Full name is required" })
// 			.min(1, "Full name is required"),
// 		role: z.enum(["STUDENT", "SUPERVISOR"], {
// 			required_error: "Role is required",
// 		}),
// 	})
// 	.refine((data) => data.password === data.passwordConfirm, {
// 		message: "Password must match",
// 		path: ["passwordConfirm"],
// 	});

// export type TSignup = z.infer<typeof signupSchema>;
