// import { useSearchParams } from "react-router-dom";
// import ChatFilesSection from "../../components/ChatFilesSection";
// import SearchFiles from "../../components/SearchFiles";

// export interface FileItem {
// 	name: string;
// 	url: string;
// 	sharedBy: string;
// 	sharedOn: string;
// 	type: "xlsx" | "csv" | "docx" | "pdf" | "pptx";
// }

// const fileData: FileItem[] = [
// 	{
// 		name: "Risk-Register_Template.xlsx",
// 		url: "Risk-Register_Template.xlsx",
// 		sharedBy: "ANNETTE BLACK",
// 		sharedOn: "Apr 16, 2025",
// 		type: "xlsx",
// 	},
// 	{
// 		name: "Risk-Register_Template.csv",
// 		url: "Risk-Register_Template.csv",
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

// const ChatFiles: React.FC = () => {
// 	const [searchParam] = useSearchParams();
// 	const searchedFile = searchParam.get("value");

// 	const files = searchedFile
// 		? fileData.filter((files) =>
// 				files.name.toLowerCase().includes(searchedFile.toLowerCase())
// 			)
// 		: fileData;
// 	return (
// 		<div className="p-9 pb-[100px] overflow-y-auto h-[calc(120vh-380px)]">
// 			<SearchFiles />

// 			<ChatFilesSection fileData={files}></ChatFilesSection>
// 		</div>
// 	);
// };

// export default ChatFiles;
