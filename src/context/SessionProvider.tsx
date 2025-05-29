// import { useQuery } from "@tanstack/react-query";
// import React from "react";
import React, { useEffect } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useNavigate } from "react-router-dom";
// import { BASE_URL, URL } from "../utils/url";

function SessionProvider({ children }: { children: React.ReactNode }) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// const refreshToken = useQuery({
	// 	queryKey: ["userToken"],
	// 	queryFn: () =>
	// 		fetch(`${BASE_URL}/${URL.refresh}`).then((res) => res.json()),
	// });

	// console.log(refreshToken);

	const navigate = useNavigate();
	const isAuthenticated = useIsAuthenticated();
	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		}
	}, [isAuthenticated, navigate]);

	return <>{children}</>;
}

export default SessionProvider;
