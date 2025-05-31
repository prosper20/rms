import {
	Navigate,
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";

import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import GlobalLayout from "./components/layout/GlobalLayout";
import ReportLayout from "./components/UI/Layout.tsx";
import FileDetailPage from "./pages/dashboard/layout/FileDetailPage.tsx";

const SettingsPage = lazy(() => import("./pages/dashboard/Settings"));
const ReportFiles = lazy(() => import("./pages/dashboard/ReportFiles.tsx"));
const DashboardHome = lazy(() => import("./pages/dashboard/Dashboard"));

const router = createBrowserRouter([
	{
		element: <GlobalLayout />,
		children: [
			{
				path: "/reports",
				element: <ReportLayout />,
				children: [
					{
						index: true,
						element: (
							<Suspense fallback={null}>
								<DashboardHome />
							</Suspense>
						),
					},
					{
						path: "pentagon",
						children: [
							{
								index: true,
								element: (
									<Suspense fallback={null}>
										<ReportFiles vendorSlug={"Pentagon"} />
									</Suspense>
								),
							},
							{
								path: "file",
								element: (
									<Suspense fallback={null}>
										<FileDetailPage />
									</Suspense>
								),
							},
						],
					},
					{
						path: "tfml",
						children: [
							{
								index: true,
								element: (
									<Suspense fallback={null}>
										<ReportFiles vendorSlug={"TFML"} />
									</Suspense>
								),
							},
							{
								path: "file",
								element: (
									<Suspense fallback={null}>
										<FileDetailPage />
									</Suspense>
								),
							},
						],
					},
					{
						path: "nairda",
						children: [
							{
								index: true,
								element: (
									<Suspense fallback={null}>
										<ReportFiles vendorSlug={"Nairda"} />
									</Suspense>
								),
							},
							{
								path: "file",
								element: (
									<Suspense fallback={null}>
										<FileDetailPage />
									</Suspense>
								),
							},
						],
					},
					{
						path: "tsebo",
						children: [
							{
								index: true,
								element: (
									<Suspense fallback={null}>
										<ReportFiles vendorSlug={"TSEBO"} />
									</Suspense>
								),
							},
							{
								path: "file",
								element: (
									<Suspense fallback={null}>
										<FileDetailPage />
									</Suspense>
								),
							},
						],
					},
				],
			},

			{
				path: "/settings",
				element: (
					<Suspense fallback={null}>
						<SettingsPage />
					</Suspense>
				),
			},
			{
				path: "/",
				element: <Navigate to="/reports" replace />,
			},
		],
	},
	{
		path: "*",
		element: <h1 className="p-8 text-center text-2xl">404 – Page not found</h1>,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/reset",
		element: <ResetPassword />,
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
