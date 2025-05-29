import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import ChatFilesSection from "../../components/ChatFilesSection";

// export interface FileItem {
// 	name: string;
// 	url: string;
// 	sharedBy: string;
// 	sharedOn: string;
// 	type: "xlsx" | "csv" | "docx" | "pdf" | "pptx";
// }

export interface FileItem {
	id: string;
	name: string;
	type: string; // MIME type from the response
	size: number;
	url: string;
	path: string;
	sharedAt: string; // ISO date string
	sharedById: string;
	vendorId: string;
	sharedBy: string;
	sharedOn: string;
	vendor: {
		id: string;
		name: string;
	};
}

interface ReportFilesProps {
	vendorSlug: string;
}

const ReportFiles: React.FC<ReportFilesProps> = ({ vendorSlug }) => {
	const [files, setFiles] = useState<FileItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchParam] = useSearchParams();
	const searchedFile = searchParam.get("value");

	const authHeader = useAuthHeader();
	const token = authHeader?.split(" ")[1];

	useEffect(() => {
		const fetchFiles = async () => {
			if (!vendorSlug || !token) return;

			setLoading(true);
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/files?vendor=${vendorSlug}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const transformed: FileItem[] = response.data.map((file: any) => ({
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

				setFiles(transformed);
			} catch (error) {
				console.error("Failed to fetch files:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchFiles();
	}, [token, vendorSlug]);

	const filteredFiles = searchedFile
		? files.filter((file) =>
				file.name.toLowerCase().includes(searchedFile.toLowerCase())
			)
		: files;

	return (
		<div className="w-full flex justify-center p-4 md:p-9 overflow-y-auto h-full">
			{loading ? (
				<p className="text-center text-xl">Loading files...</p>
			) : (
				<ChatFilesSection fileData={filteredFiles} />
			)}
		</div>
	);
};

// Helper function
const getFileExtension = (mime: string): FileItem["type"] => {
	if (mime.includes("spreadsheetml")) return "xlsx";
	if (mime.includes("csv")) return "csv";
	if (mime.includes("wordprocessingml")) return "docx";
	if (mime.includes("pdf")) return "pdf";
	if (mime.includes("presentationml")) return "pptx";
	return "pdf";
};

export default ReportFiles;

// import { useSearchParams } from "react-router-dom";
// import ChatFilesSection from "../../components/ChatFilesSection";
// // import SearchFiles from "../../components/SearchFiles";
// //import Risk-Register from "../../assets/files/aatc-vms-user-manual.docx";

// export interface FileItem {
// 	name: string;
// 	url: string;
// 	sharedBy: string;
// 	sharedOn: string;
// 	type: "xlsx" | "csv" | "docx" | "pdf";
// }

// const fileData: FileItem[] = [
// 	{
// 		name: "Risk-Register_Template.xlsx",
// 		url: "http://localhost:3000/files/aatc-vms-user-manual.docx",
// 		sharedBy: "ANNETTE BLACK",
// 		sharedOn: "Apr 16, 2025",
// 		type: "xlsx",
// 	},
// 	{
// 		name: "Risk-Register_Template.csv",
// 		url: "Risk-Register_Template.xlsx",
// 		sharedBy: "DR. FLOYD MILES",
// 		sharedOn: "Apr 12, 2025",
// 		type: "csv",
// 	},
// 	{
// 		name: "SurveyInstrument_Draft.docx",
// 		url: "SurveyInstrument_Draft.docx",
// 		sharedBy: "WADE WARREN",
// 		sharedOn: "Apr 4, 2025",
// 		type: "docx",
// 	},
// 	{
// 		name: "PRINCE2_ProjectBrief_v1.docx",
// 		url: "PRINCE2_ProjectBrief_v1.docx",
// 		sharedBy: "RALPH EDWARDS",
// 		sharedOn: "Apr 18, 2025",
// 		type: "docx",
// 	},
// 	{
// 		name: "Style-Guide.pdf",
// 		url: "Style-Guide.pdf",
// 		sharedBy: "DARLENE ROBERTSON",
// 		sharedOn: "Apr 14, 2025",
// 		type: "pdf",
// 	},
// 	{
// 		name: "Risk-Register_Template.xlsx",
// 		url: "Risk-Register_Template.xlsx",
// 		sharedBy: "ANNETTE BLACK",
// 		sharedOn: "Apr 16, 2025",
// 		type: "xlsx",
// 	},
// 	{
// 		name: "Risk-Register_Template.csv",
// 		url: "Risk-Register_Template.xlsx",
// 		sharedBy: "DR. FLOYD MILES",
// 		sharedOn: "Apr 12, 2025",
// 		type: "csv",
// 	},
// 	{
// 		name: "SurveyInstrument_Draft.docx",
// 		url: "SurveyInstrument_Draft.docx",
// 		sharedBy: "WADE WARREN",
// 		sharedOn: "Apr 4, 2025",
// 		type: "docx",
// 	},
// 	{
// 		name: "PRINCE2_ProjectBrief_v1.docx",
// 		url: "PRINCE2_ProjectBrief_v1.docx",
// 		sharedBy: "RALPH EDWARDS",
// 		sharedOn: "Apr 18, 2025",
// 		type: "docx",
// 	},
// 	{
// 		name: "Style-Guide.pdf",
// 		url: "Style-Guide.pdf",
// 		sharedBy: "DARLENE ROBERTSON",
// 		sharedOn: "Apr 14, 2025",
// 		type: "pdf",
// 	},
// ];

// const ReportFiles: React.FC = () => {
// 	const [searchParam] = useSearchParams();
// 	const searchedFile = searchParam.get("value");

// 	const files = searchedFile
// 		? fileData.filter((files) =>
// 				files.name.toLowerCase().includes(searchedFile.toLowerCase())
// 			)
// 		: fileData;
// 	return (
// 		<div className="p-9 pb-[100px] overflow-y-auto h-[calc(120vh-380px)]">
// 			{/* <SearchFiles /> */}

// 			<ChatFilesSection fileData={files}></ChatFilesSection>
// 		</div>
// 	);
// };

// export default ReportFiles;
