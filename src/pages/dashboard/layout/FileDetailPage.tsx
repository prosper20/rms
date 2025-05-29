// src/pages/FileDetailPage.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

// interface FileItem {
// 	name: string;
// 	url: string;
// 	type: string;
// }

const FileDetailPage = () => {
	const [params] = useSearchParams();
	const fileUrl = params.get("url");
	const vendorSlug = params.get("vendor");
	const [documents, setDocuments] = useState<
		{ uri: string; fileName: string }[]
	>([]);
	const [initialDoc, setInitialDoc] = useState<{
		uri: string;
		fileName: string;
	} | null>(null);
	const authHeader = useAuthHeader();
	const token = authHeader?.split(" ")[1];

	useEffect(() => {
		const fetchFiles = async () => {
			if (!vendorSlug || !token) return;

			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/files?vendor=${vendorSlug}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const allDocs = response.data.map((file: any) => ({
					uri: file.url,
					fileName: file.name,
				}));

				setDocuments(allDocs);

				if (fileUrl) {
					const match = allDocs.find((doc) => doc.uri === fileUrl);
					if (match) {
						setInitialDoc(match);
					} else {
						setInitialDoc(allDocs[0]); // fallback
					}
				} else {
					setInitialDoc(allDocs[0]);
				}
			} catch (err) {
				console.error("Error fetching files:", err);
			}
		};

		fetchFiles();
	}, [fileUrl, vendorSlug, token]);

	if (!fileUrl || !initialDoc) {
		return (
			<div className="flex h-screen items-center justify-center">
				<p className="text-xl text-red-600">No valid file found to display.</p>
			</div>
		);
	}

	return (
		<div className="h-screen w-screen bg-gray-100 flex flex-col">
			<div className="p-4 bg-white shadow-md border-b text-lg font-semibold">
				File Viewer
			</div>

			<div className="flex-1 overflow-hidden">
				<DocViewer
					documents={documents}
					pluginRenderers={DocViewerRenderers}
					initialActiveDocument={initialDoc}
					prefetchMethod="GET"
					style={{ height: "100%", width: "100%" }}
				/>
			</div>
		</div>
	);
};

export default FileDetailPage;

// // src/pages/FileDetailPage.tsx
// import { useSearchParams } from "react-router-dom";

// const FileDetailPage = () => {
// 	const [params] = useSearchParams();
// 	const fileUrl = params.get("url");

// 	if (!fileUrl) {
// 		return (
// 			<div className="flex h-screen items-center justify-center">
// 				<p className="text-xl text-red-600">No file URL provided.</p>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="h-screen w-screen bg-gray-100 flex flex-col">
// 			<div className="p-4 bg-white shadow-md border-b text-lg font-semibold">
// 				File Viewer
// 			</div>

// 			<iframe
// 				src={`https://docs.google.com/gview?url=${fileUrl}&embedded=true`}
// 				title="File Viewer"
// 				className="flex-1 w-full flex items-center justify-center"
// 				style={{ border: "none" }}
// 			/>
// 		</div>
// 	);
// };

// export default FileDetailPage;
