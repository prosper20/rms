import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.string({ required_error: "email or username is required" })
		.min(1, "email or username is required"),
	password: z
		.string({ required_error: "Password is required" })
		.min(5, "Password must be at least 5 characters"),
});

export type TLogin = z.infer<typeof loginSchema>;
