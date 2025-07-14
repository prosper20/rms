import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";

interface Document {
	url: string;
	name: string;
}

const FileDetailPage = () => {
	const [params] = useSearchParams();
	// const navigate = useNavigate();
	const fileUrl = params.get("url");
	const fileId = params.get("id");
	const [document, setDocument] = useState<Document>({
		url: fileUrl || "",
		name: fileId || "",
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const authHeader = useAuthHeader();
	const token = authHeader?.split(" ")[1];

	useEffect(() => {
		const fetchFiles = async () => {
			if (!token || !fileId) {
				setError("Missing token or file ID");
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				const response = await axios.get<Document>(
					`${import.meta.env.VITE_API_URL}/files/${fileId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const doc = {
					name: response.data.name,
					url: `${import.meta.env.VITE_S3_DOMAIN}/${response.data.url}`,
				};

				setDocument(doc);
			} catch (err) {
				console.error("Error fetching files:", err);
				setError("Failed to load document");
			} finally {
				setLoading(false);
			}
		};

		fetchFiles();
	}, [fileId, token]);

	if (loading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<p className="text-xl">Loading file...</p>
			</div>
		);
	}

	if (error || !document.url) {
		return (
			<div className="flex h-screen items-center justify-center">
				<p className="text-xl text-red-600">
					{error || "Document URL not available"}
				</p>
			</div>
		);
	}

	const isOfficeDoc = /\.(doc|docx|ppt|pptx|xls|xlsx)$/i.test(document.name);
	const viewerUrl = isOfficeDoc
		? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(document.url)}`
		: `https://docs.google.com/gview?url=${encodeURIComponent(document.url)}&embedded=true`;

	return (
		<div className="h-screen w-full flex flex-col bg-gray-100">
			{/* <div className="p-4 bg-white shadow-md border-b text-lg font-semibold flex items-center gap-2">
				<button
					onClick={() => navigate(-1)}
					className="font-semibold text-gray-500 hover:text-black transition mt-2 ml-4"
					aria-label="Go back"
				>
					<ArrowLeft className="w-10 h-10" />
				</button>
			</div> */}

			<div className="h-full w-full flex-1 overflow-hidden relative">
				<div className="h-full w-full absolute inset-0 flex items-center justify-center bg-white">
					<div className="w-full h-full flex items-center justify-center">
						<iframe
							src={viewerUrl}
							className="w-full h-full"
							style={{ border: "none" }}
							title={document.name}
							onError={() => setError("Failed to load document preview")}
						/>
					</div>
				</div>
			</div>
			<div className="p-4 bg-white shadow-md border-b text-lg font-semibold flex items-center gap-2"></div>
		</div>
	);
};

export default FileDetailPage;

// react-doc-viewer
// import { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import "@cyntler/react-doc-viewer/dist/index.css";
// import { ArrowLeft } from "lucide-react";
// import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

// // interface FileItem {
// // 	name: string;
// // 	url: string;
// // 	type: string;
// // }

// const FileDetailPage = () => {
// 	const [params] = useSearchParams();
// 	const navigate = useNavigate();
// 	const fileUrl = params.get("url");
// 	const vendorSlug = params.get("vendor");
// 	const [documents, setDocuments] = useState<
// 		{ uri: string; fileName: string }[]
// 	>([]);
// 	const [initialDoc, setInitialDoc] = useState<{
// 		uri: string;
// 		fileName: string;
// 	} | null>(null);
// 	const authHeader = useAuthHeader();
// 	const token = authHeader?.split(" ")[1];

// 	useEffect(() => {
// 		const fetchFiles = async () => {
// 			if (!vendorSlug || !token) return;

// 			try {
// 				const response = await axios.get(
// 					`${import.meta.env.VITE_API_URL}/files?vendor=${vendorSlug}`,
// 					{
// 						headers: {
// 							Authorization: `Bearer ${token}`,
// 						},
// 					}
// 				);

// 				const allDocs = response.data.map((file: any) => ({
// 					uri: file.url,
// 					fileName: file.name,
// 				}));

// 				setDocuments(allDocs);

// 				if (fileUrl) {
// 					const match = allDocs.find(
// 						(doc: { uri: string; fileName: string }) => doc.uri === fileUrl
// 					);
// 					if (match) {
// 						setInitialDoc(match);
// 					} else {
// 						setInitialDoc(allDocs[0]); // fallback
// 					}
// 				} else {
// 					setInitialDoc(allDocs[0]);
// 				}
// 			} catch (err) {
// 				console.error("Error fetching files:", err);
// 			}
// 		};

// 		fetchFiles();
// 	}, [fileUrl, vendorSlug, token]);

// 	if (!fileUrl || !initialDoc) {
// 		return (
// 			<div className="flex h-screen items-center justify-center">
// 				<p className="text-xl text-red-600">Loading file...</p>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="h-full w-full bg-background-100 flex justify-center flex-col">
// 			<div className="p-4 bg-white text-lg font-semibold flex items-center gap-2">
// 				<button
// 					onClick={() => navigate(-1)}
// 					className="font-semibold text-gray-500 hover:text-black transition mt-2 ml-4"
// 					aria-label="Go back"
// 				>
// 					<ArrowLeft className="w-10 h-10" />
// 				</button>
// 			</div>

// 			<div className="h-full w-full flex-1 bg-green-300 p-8 overflow-hidden relative">
// 				<div className="h-full w-full absolute inset-0 flex items-center justify-center bg-white">
// 					<div className="bg-yellow-300 w-full h-full">
// 						<DocViewer
// 							documents={documents}
// 							pluginRenderers={DocViewerRenderers}
// 							initialActiveDocument={initialDoc}
// 							prefetchMethod="GET"
// 							style={{ height: "100%", width: "100%", minHeight: "100%" }}
// 						/>
// 					</div>
// 				</div>
// 			</div>

// 			{/* <div className="flex-1 h-full overflow-hidden">
// 				<DocViewer
// 					documents={documents}
// 					pluginRenderers={DocViewerRenderers}
// 					initialActiveDocument={initialDoc}
// 					prefetchMethod="GET"
// 					style={{ height: "100%", width: "100%" }}
// 				/>
// 			</div> */}
// 		</div>
// 	);
// };

// export default FileDetailPage;
