import { z } from "zod";

export const resetPasswordSchema = z.object({
	email: z.string({ required_error: "Email is required" }).email(),
});

export type TResetPassword = z.infer<typeof resetPasswordSchema>;
