import {
	Navigate,
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";

import Login from "./pages/auth/Login";
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
]);

// const router = createBrowserRouter([
// 	{
// 		element: (
// 			// <RequireAuth>
// 			<GlobalLayout />
// 			// </RequireAuth>
// 		),

// 		children: [
// 			{
// 				path: "/reports",
// 				element: <ReportLayout />,
// 				children: [
// 					{
// 						index: true,
// 						element: (
// 							<Suspense fallback={null}>
// 								<ReportFiles />
// 							</Suspense>
// 						),
// 					},
// 				],
// 			},
// 			{
// 				path: "/tfml",
// 				element: <ReportLayout />,
// 				children: [
// 					{
// 						index: true,
// 						element: (
// 							<Suspense fallback={null}>
// 								<ReportFiles />
// 							</Suspense>
// 						),
// 					},
// 					{
// 						path: "file",
// 						element: (
// 							<Suspense fallback={null}>
// 								<FileDetailPage />
// 								{/* <GroupInfoPage /> */}
// 							</Suspense>
// 						),
// 					},
// 				],
// 			},
// 			{
// 				path: "/pentagon",
// 				element: <ReportLayout />,
// 				children: [
// 					{
// 						index: true,
// 						element: (
// 							<Suspense fallback={null}>
// 								<ReportFiles />
// 							</Suspense>
// 						),
// 					},
// 					{
// 						path: "file",
// 						element: (
// 							<Suspense fallback={null}>
// 								<FileDetailPage />
// 								{/* <GroupInfoPage /> */}
// 							</Suspense>
// 						),
// 					},
// 				],
// 			},
// 			{
// 				path: "/tsebo",
// 				element: <ReportLayout />,
// 				children: [
// 					{
// 						index: true,
// 						element: (
// 							<Suspense fallback={null}>
// 								<ReportFiles />
// 							</Suspense>
// 						),
// 					},
// 					{
// 						path: "file",
// 						element: (
// 							<Suspense fallback={null}>
// 								<FileDetailPage />
// 								{/* <GroupInfoPage /> */}
// 							</Suspense>
// 						),
// 					},
// 				],
// 			},
// 			{
// 				path: "/nairda",
// 				element: <ReportLayout />,
// 				children: [
// 					{
// 						index: true,
// 						element: (
// 							<Suspense fallback={null}>
// 								<ReportFiles />
// 							</Suspense>
// 						),
// 					},
// 					{
// 						path: "file",
// 						element: (
// 							<Suspense fallback={null}>
// 								<FileDetailPage />
// 								{/* <GroupInfoPage /> */}
// 							</Suspense>
// 						),
// 					},
// 				],
// 			},
// 			{
// 				path: "/settings",
// 				element: (
// 					<Suspense fallback={null}>
// 						<SettingsPage />
// 					</Suspense>
// 				),
// 			},

// 			/* Redirect bare slash → /reports */
// 			{
// 				path: "/",
// 				element: <Navigate to="/reports" replace />,
// 			},
// 		],
// 	},

// 	// ▸ 404  ────────────────────────────────────────────────────────
// 	{
// 		path: "*",
// 		element: <h1 className="p-8 text-center text-2xl">404 – Page not found</h1>,
// 	},
// 	{
// 		path: "/login",
// 		element: <Login />,
// 	},
// ]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
