import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import ChatFilesSection from "../../components/ChatFilesSection";
import { getFileExtension } from "../../utils/utilities";
import RotatingLinesSpinner from "../../components/Loaders/RotatingLinesSpinner";

const fetchFiles = async (vendorSlug: string, token: string) => {
	const res = await fetch(
		`${import.meta.env.VITE_API_URL}/files?vendor=${vendorSlug}`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	const data = await res.json();

	return data.map((file: any) => ({
		id: file.id,
		name: file.name,
		url: `${import.meta.env.VITE_S3_DOMAIN}/${file.url}`,
		sharedBy: file.sharedBy.fullName,
		sharedOn: new Date(file.sharedAt).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		}),
		vendor: {
			id: file.vendor?.id || "",
			name: file.vendor?.name || "Unknown Vendor",
		},
		type: getFileExtension(file.type),
	}));
};

const ReportFiles = ({ vendorSlug }: { vendorSlug: string }) => {
	const [searchParams] = useSearchParams();
	const searchedFile = searchParams.get("value");
	const authHeader = useAuthHeader();
	const token = authHeader?.split(" ")[1];

	const { data: files = [], isLoading } = useQuery({
		queryKey: ["files", vendorSlug],
		queryFn: () => fetchFiles(vendorSlug, token!),
		enabled: !!token && !!vendorSlug,
	});

	const filteredFiles = searchedFile
		? files.filter((file: { name: string }) =>
				file.name.toLowerCase().includes(searchedFile.toLowerCase())
			)
		: files;

	return (
		<div className=" mx-4 md:mx-8 lg:mx-[3%] md:py-6 lg:pt-[21px] xl:pb-[10px]">
			<div className="w-full flex justify-center overflow-y-auto h-full">
				{isLoading ? (
					<RotatingLinesSpinner strokeColor="gray" width="24" />
				) : (
					<ChatFilesSection fileData={filteredFiles} />
				)}
			</div>
		</div>
		// <div className="w-full flex justify-center items-center overflow-y-auto h-full">
		// 	{isLoading ? (
		// 		<div className="h-screen w-full flex flex-col flex-grow justify-center items-center">
		// 			<RotatingLinesSpinner strokeColor="gray" width="24" />
		// 		</div>
		// 	) : (
		// 		<ChatFilesSection fileData={filteredFiles} />
		// 	)}
		// </div>
	);
};

export default ReportFiles;

// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";
// import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
// import ChatFilesSection from "../../components/ChatFilesSection";

// export interface FileItem {
// 	id: string;
// 	name: string;
// 	type: string;
// 	size: number;
// 	url: string;
// 	path: string;
// 	sharedAt: string;
// 	sharedById: string;
// 	vendorId: string;
// 	sharedBy: string;
// 	sharedOn: string;
// 	vendor: {
// 		id: string;
// 		name: string;
// 	};
// }

// interface ReportFilesProps {
// 	vendorSlug: string;
// }

// const ReportFiles: React.FC<ReportFilesProps> = ({ vendorSlug }) => {
// 	const [files, setFiles] = useState<FileItem[]>([]);
// 	const [loading, setLoading] = useState(true);
// 	const [searchParam] = useSearchParams();
// 	const searchedFile = searchParam.get("value");

// 	const authHeader = useAuthHeader();
// 	const token = authHeader?.split(" ")[1];

// 	useEffect(() => {
// 		const fetchFiles = async () => {
// 			if (!vendorSlug || !token) return;

// 			setLoading(true);
// 			try {
// 				const response = await axios.get(
// 					`${import.meta.env.VITE_API_URL}/files?vendor=${vendorSlug}`,
// 					{
// 						headers: {
// 							Authorization: `Bearer ${token}`,
// 						},
// 					}
// 				);

// 				const transformed: FileItem[] = response.data.map((file: any) => ({
// 					id: file.id,
// 					name: file.name,
// 					url: `${import.meta.env.VITE_S3_DOMAIN}/${file.url}`,
// 					sharedBy: file.sharedBy.fullName,
// 					sharedOn: new Date(file.sharedAt).toLocaleDateString("en-US", {
// 						month: "short",
// 						day: "numeric",
// 						year: "numeric",
// 					}),
// 					vendor: {
// 						id: file.vendor?.id || "",
// 						name: file.vendor?.name || "Unknown Vendor",
// 					},
// 					type: getFileExtension(file.type),
// 				}));

// 				setFiles(transformed);
// 			} catch (error) {
// 				console.error("Failed to fetch files:", error);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		fetchFiles();
// 	}, [token, vendorSlug]);

// 	const filteredFiles = searchedFile
// 		? files.filter((file) =>
// 				file.name.toLowerCase().includes(searchedFile.toLowerCase())
// 			)
// 		: files;

// 	return (
// 		<div className="w-full flex justify-center p-4 md:p-9 overflow-y-auto h-full">
// 			{loading ? (
// 				<p className="text-center text-xl">Loading files...</p>
// 			) : (
// 				<ChatFilesSection fileData={filteredFiles} />
// 			)}
// 		</div>
// 	);
// };

// // Helper function
// const getFileExtension = (mime: string): FileItem["type"] => {
// 	if (mime.includes("spreadsheetml")) return "xlsx";
// 	if (mime.includes("csv")) return "csv";
// 	if (mime.includes("wordprocessingml")) return "docx";
// 	if (mime.includes("pdf")) return "pdf";
// 	if (mime.includes("presentationml")) return "pptx";
// 	return "pdf";
// };

// export default ReportFiles;
