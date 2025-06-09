import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MoreVertical } from "lucide-react";

import pdfIcon from "/icons/pdf.png";
import csvIcon from "/icons/csv.png";
import wordIcon from "/icons/word.png";
import excelIcon from "/icons/excel.webp";
import pptIcon from "/icons/powerpoint.png";
import { FileItem } from "../types/File";

interface Props {
	fileData: FileItem[];
}

const ChatFilesSection: React.FC<Props> = ({ fileData }) => {
	const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

	const toggleMenu = (index: number) => {
		setOpenMenuIndex(openMenuIndex === index ? null : index);
	};

	const getFileIcon = (type: FileItem["type"]) => {
		const commonClass = "h-8 w-8 md:h-10 md:w-10";
		switch (type) {
			case "pdf":
				return <img src={pdfIcon} alt="PDF" className={commonClass} />;
			case "csv":
				return <img src={csvIcon} alt="CSV" className={commonClass} />;
			case "docx":
				return <img src={wordIcon} alt="Word" className={commonClass} />;
			case "xlsx":
				return <img src={excelIcon} alt="Excel" className={commonClass} />;
			case "pptx":
				return <img src={pptIcon} alt="PowerPoint" className={commonClass} />;
			default:
				return <div className={`${commonClass} bg-gray-300 rounded`} />;
		}
	};

	return (
		<div className="py-4 md:py-6 rounded-2xl w-full">
			{fileData.length > 0 ? (
				<ul>
					{fileData.map((file, index) => (
						<li
							key={index}
							className="hover:bg-background-primary flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 border-b last:border-none border-border/30 relative"
						>
							{/* Icon */}
							<div className="flex-shrink-0">{getFileIcon(file.type)}</div>

							{/* File Info */}
							<div className="flex-1 min-w-0">
								<Link
									to={`file?url=${encodeURIComponent(file.url)}&id=${file.id}&vendor=${file.vendor.name}`}
									className="block font-medium text-[16px] text-gray-800"
								>
									{file.name}
								</Link>
								<p className="text-[10px] text-gray-500 truncate">
									Shared by <span className="font-medium">{file.sharedBy}</span>{" "}
									on {file.sharedOn}
								</p>
							</div>

							{/* Three Dots Menu */}
							<div className="relative ml-auto">
								<button
									onClick={() => toggleMenu(index)}
									className="text-gray-500 hover:text-gray-700"
								>
									<MoreVertical className="w-6 h-6" />
								</button>

								{openMenuIndex === index && (
									<div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow-lg z-10">
										<ul className="text-[14px] text-gray-700">
											<li>
												<a
													href={file.url}
													download
													className="block px-4 py-2 hover:bg-gray-100"
												>
													Download
												</a>
											</li>
											<li>
												<button
													className="w-full text-left px-4 py-2 hover:bg-gray-100"
													onClick={() => console.log("Delete", file.id)}
												>
													Delete
												</button>
											</li>
											<li>
												<button
													className="w-full text-left px-4 py-2 hover:bg-gray-100"
													onClick={() => console.log("Share", file.id)}
												>
													Share
												</button>
											</li>
										</ul>
									</div>
								)}
							</div>
						</li>
					))}
				</ul>
			) : (
				<div className="h-[45vh] flex justify-center items-center text-center text-gray-500 text-lg md:text-xl">
					No files found.
				</div>
			)}
		</div>
	);
};

export default ChatFilesSection;

// import React from "react";
// import { Link } from "react-router-dom";
// import { Download } from "lucide-react";

// import pdfIcon from "/icons/pdf.png";
// import csvIcon from "/icons/csv.png";
// import wordIcon from "/icons/word.png";
// import excelIcon from "/icons/excel.webp";
// import pptIcon from "/icons/powerpoint.png";
// import { FileItem } from "../types/File";

// interface Props {
// 	fileData: FileItem[];
// }

// const ChatFilesSection: React.FC<Props> = ({ fileData }) => {
// 	const getFileIcon = (type: FileItem["type"]) => {
// 		const commonClass = "h-8 w-8 md:h-10 md:w-10";
// 		switch (type) {
// 			case "pdf":
// 				return <img src={pdfIcon} alt="PDF" className={commonClass} />;
// 			case "csv":
// 				return <img src={csvIcon} alt="CSV" className={commonClass} />;
// 			case "docx":
// 				return <img src={wordIcon} alt="Word" className={commonClass} />;
// 			case "xlsx":
// 				return <img src={excelIcon} alt="Excel" className={commonClass} />;
// 			case "pptx":
// 				return <img src={pptIcon} alt="PowerPoint" className={commonClass} />;
// 			default:
// 				return <div className={`${commonClass} bg-gray-300 rounded`} />;
// 		}
// 	};

// 	return (
// 		<div className=" py-4 md:py-6 rounded-2xl w-full">
// 			{fileData.length > 0 ? (
// 				<ul>
// 					{fileData.map((file, index) => (
// 						<li
// 							key={index}
// 							className="hover:bg-background-primary flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 border-b last:border-none border-border/30"
// 						>
// 							{/* Icon */}
// 							<div className="flex-shrink-0">{getFileIcon(file.type)}</div>

// 							{/* File Info */}
// 							<div className="flex-1 min-w-0">
// 								<Link
// 									to={`file?url=${encodeURIComponent(file.url)}&id=${file.id}&vendor=${file.vendor.name}`}
// 									className="block font-medium text-[16px] text-gray-800 "
// 								>
// 									{file.name}
// 								</Link>
// 								<p className="text-[10px] text-gray-500 truncate">
// 									Shared by <span className="font-medium">{file.sharedBy}</span>{" "}
// 									on {file.sharedOn}
// 								</p>
// 							</div>

// 							{/* Download Button */}
// 							<a
// 								href={file.url}
// 								download
// 								rel="noopener noreferrer"
// 								className="ml-auto text-gray-400 hover:text-green-600"
// 							>
// 								<Download className="w-6 h-6 md:w-7 md:h-7" />
// 							</a>
// 						</li>
// 					))}
// 				</ul>
// 			) : (
// 				<div className="h-[45vh] flex justify-center items-center text-center text-gray-500 text-lg md:text-xl">
// 					No files found.
// 				</div>
// 			)}
// 		</div>
// 		// <div className="bg-background-primary py-4 md:py-6 rounded-2xl w-full border border-border/30">
// 		// 	{fileData.length > 0 ? (
// 		// 		<ul>
// 		// 			{fileData.map((file, index) => (
// 		// 				<li
// 		// 					key={index}
// 		// 					className="flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 border-b last:border-none border-border/30"
// 		// 				>
// 		// 					{/* Icon */}
// 		// 					<div className="flex-shrink-0">{getFileIcon(file.type)}</div>

// 		// 					{/* File Info */}
// 		// 					<div className="flex-1 min-w-0">
// 		// 						<Link
// 		// 							to={`file?url=${encodeURIComponent(file.url)}&id=${file.id}&vendor=${file.vendor.name}`}
// 		// 							className="block font-medium text-[16px] text-gray-800 hover:underline "
// 		// 						>
// 		// 							{file.name}
// 		// 						</Link>
// 		// 						<p className="text-xs md:text-sm text-gray-500 truncate">
// 		// 							Shared by <span className="font-medium">{file.sharedBy}</span>{" "}
// 		// 							on {file.sharedOn}
// 		// 						</p>
// 		// 					</div>

// 		// 					{/* Download Button */}
// 		// 					<a
// 		// 						href={file.url}
// 		// 						download
// 		// 						rel="noopener noreferrer"
// 		// 						className="ml-auto text-gray-400 hover:text-green-600"
// 		// 					>
// 		// 						<Download className="w-6 h-6 md:w-7 md:h-7" />
// 		// 					</a>
// 		// 				</li>
// 		// 			))}
// 		// 		</ul>
// 		// 	) : (
// 		// 		<div className="h-[45vh] flex justify-center items-center text-center text-gray-500 text-lg md:text-xl">
// 		// 			No files found.
// 		// 		</div>
// 		// 	)}
// 		// </div>
// 	);
// };

// export default ChatFilesSection;

// import React from "react";
// import { Link } from "react-router-dom";
// import { Download } from "lucide-react";

// import pdfIcon from "/icons/pdf.png";
// import csvIcon from "/icons/csv.png";
// import wordIcon from "/icons/word.png";
// import excelIcon from "/icons/excel.webp";
// import pptIcon from "/icons/powerpoint.png";
// import { FileItem } from "../types/File";

// interface Props {
// 	fileData: FileItem[];
// }

// const ChatFilesSection: React.FC<Props> = ({ fileData }) => {
// 	const getFileIcon = (type: FileItem["type"]) => {
// 		switch (type) {
// 			case "pdf":
// 				return (
// 					<img
// 						src={pdfIcon}
// 						alt="PDF"
// 						className="h-[34px] md:h-[64px] w-[34px] md:w-[64px]"
// 					/>
// 				);
// 			case "csv":
// 				return (
// 					<img
// 						src={csvIcon}
// 						alt="CSV"
// 						className="h-[34px] md:h-[64px] w-[34px] md:w-[64px]"
// 					/>
// 				);
// 			case "docx":
// 				return (
// 					<img
// 						src={wordIcon}
// 						alt="Word"
// 						className="h-[34px] md:h-[64px] w-[34px] md:w-[64px]"
// 					/>
// 				);
// 			case "xlsx":
// 				return (
// 					<img
// 						src={excelIcon}
// 						alt="Excel"
// 						className="h-[34px] md:h-[64px] w-[34px] md:w-[64px]"
// 					/>
// 				);
// 			case "pptx":
// 				return (
// 					<img
// 						src={pptIcon}
// 						alt="PowerPoint"
// 						className="h-[34px] md:h-[64px] w-[34px] md:w-[64px]"
// 					/>
// 				);
// 			default:
// 				return (
// 					<div className="h-[34px] md:h-[64px] w-[34px] md:w-[64px] bg-gray-300 rounded" />
// 				);
// 		}
// 	};

// 	return (
// 		<div className="bg-background-primary py-[22px] rounded-[24px] w-full border border-border/[72%]">
// 			<ul>
// 				{fileData.length > 0 ? (
// 					fileData.map((file, index) => (
// 						<li
// 							key={index}
// 							className={`py-4 px-7 ${
// 								index < fileData.length - 1
// 									? "border-b border-border/[72%]"
// 									: ""
// 							} flex items-center space-x-3`}
// 						>
// 							<div className="flex-shrink-0 pr-4">{getFileIcon(file.type)}</div>

// 							<div className="flex-1">
// 								<p className="text-[20px] md:text-[24px] hover:underline font-header3 text-gray-800">
// 									<Link
// 										to={`file?url=${encodeURIComponent(file.url)}}&id=${file.id}&vendor=${file.vendor.name}`}
// 									>
// 										{file.name}
// 									</Link>
// 								</p>
// 								<p className="text-[18px] text-text-100/[77%]">
// 									Shared by{" "}
// 									<span className="font-header2 text-[20px]">
// 										{file.sharedBy}
// 									</span>{" "}
// 									on {file.sharedOn}
// 								</p>
// 							</div>

// 							<a
// 								href={file.url}
// 								download
// 								rel="noopener noreferrer"
// 								className="ml-auto font-semibold text-gray-500 hover:text-green-600"
// 							>
// 								<Download className="w-12 h-12" />
// 							</a>
// 						</li>
// 					))
// 				) : (
// 					<h1 className="h-[45vh] flex justify-center items-center text-4xl text-red-600">
// 						No Files Found!
// 					</h1>
// 				)}
// 			</ul>
// 		</div>
// 	);
// };

// export default ChatFilesSection;
