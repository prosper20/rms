import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AppProvider } from "./context/AppContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";

const queryClient = new QueryClient();
const store = createStore({
	authName: "_auth",
	authType: "cookie",
	cookieDomain: window.location.hostname,
	cookieSecure: window.location.protocol === "https:",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AppProvider>
			<AuthProvider store={store}>
				<QueryClientProvider client={queryClient}>
					{/*<ReactQueryDevtools initialIsOpen />*/}
					<App />
				</QueryClientProvider>
			</AuthProvider>
		</AppProvider>
	</React.StrictMode>
);
