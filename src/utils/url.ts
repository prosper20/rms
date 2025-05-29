/* eslint-disable @typescript-eslint/no-explicit-any */
// @typescript-eslint/no-explicit-any
import axios from "axios";

export const URL = {
	// Auth
	login: "/api/auth/login",
	register: "auth/register",
	continueWithGoogle: "/auth/continue-with-google",
	completeRegistration: "/auth/complete-register",
	passwordReset: "/users/settings/reset-password",
	settingsForgotPassword: "/users/settings/forgot-password",
	refresh: "auth/token/refresh",
	peopleToFollow: "/users/people-to-follow",
};

export const BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = function instance(token?: string) {
	return axios.create({
		baseURL: BASE_URL,
		// timeout: 5000, // 5 seconds timeout
		withCredentials: true,
		headers: token
			? {
					"Content-Type": "application/json",
					Authorization: `bearer ${token}`,
				}
			: { "Content-Type": "application/json" },
	});
};

export async function getRequest({
	url,
	token,
}: {
	url: string;
	token?: string | null;
}) {
	if (token) {
		return await axiosInstance(token).get(url);
	}
	return await axiosInstance().get(url);
}

export async function PostRequest({
	url,
	token,
	data,
}: {
	url: string;
	token?: string | null;
	data?: Record<string, any>;
}) {
	if (token) {
		return await axiosInstance(token).post(url, data);
	}
	return await axiosInstance().post(url, data);
}

export async function PutRequest({
	url,
	token,
	data,
}: {
	url: string;
	token: string | undefined;
	data?: Record<string, any>;
}) {
	return await axiosInstance(token).put(url, data);
}

import { redirect, type ActionFunction } from "react-router-dom";

export const verifyOtpAction: ActionFunction = async ({ request }) => {
	try {
		const formData = await request.formData();
		const otp = formData.get("otp") as string;
		const email = formData.get("email") as string;

		const response = await axios.post(
			import.meta.env.VITE_API_URL + "/auth/signup/verify",
			{ otp, email }
		);
		console.log(response.data);
		return redirect("/otpSuccess");
	} catch (err: any) {
		console.log(err);
		return new Response(
			JSON.stringify({
				error: err.response?.data?.message || "Verification failed",
			}),
			{
				status: 400,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
};
