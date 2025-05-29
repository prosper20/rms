import React from "react";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import { FileItem } from "../pages/dashboard/ReportFiles";

import pdfIcon from "/icons/pdf.png";
import csvIcon from "/icons/csv.png";
import wordIcon from "/icons/word.png";
import excelIcon from "/icons/excel.webp";
import pptIcon from "/icons/powerpoint.png";

interface Props {
	fileData: FileItem[];
}

const ChatFilesSection: React.FC<Props> = ({ fileData }) => {
	const getFileIcon = (type: FileItem["type"]) => {
		switch (type) {
			case "pdf":
				return (
					<img
						src={pdfIcon}
						alt="PDF"
						className="h-[34px] md:h-[64px] w-[34px] md:w-[64px]"
					/>
				);
			case "csv":
				return (
					<img
						src={csvIcon}
						alt="CSV"
						className="h-[34px] md:h-[64px] w-[34px] md:w-[64px]"
					/>
				);
			case "docx":
				return (
					<img
						src={wordIcon}
						alt="Word"
						className="h-[34px] md:h-[64px] w-[34px] md:w-[64px]"
					/>
				);
			case "xlsx":
				return (
					<img
						src={excelIcon}
						alt="Excel"
						className="h-[34px] md:h-[64px] w-[34px] md:w-[64px]"
					/>
				);
			case "pptx":
				return (
					<img
						src={pptIcon}
						alt="PowerPoint"
						className="h-[34px] md:h-[64px] w-[34px] md:w-[64px]"
					/>
				);
			default:
				return (
					<div className="h-[34px] md:h-[64px] w-[34px] md:w-[64px] bg-gray-300 rounded" />
				);
		}
	};

	return (
		<div className="bg-background-primary py-[22px] rounded-[24px] w-[95%] border border-border/[72%]">
			<ul>
				{fileData.length > 0 ? (
					fileData.map((file, index) => (
						<li
							key={index}
							className={`py-4 px-7 ${
								index < fileData.length - 1
									? "border-b border-border/[72%]"
									: ""
							} flex items-center space-x-3`}
						>
							<div className="flex-shrink-0">{getFileIcon(file.type)}</div>

							<div className="flex-1">
								<p className="text-[20px] md:text-[24px] hover:underline font-header3 text-gray-800">
									<Link
										to={`file?url=${encodeURIComponent(file.url)}}&id=${file.id}&vendor=${file.vendor.name}`}
									>
										{file.name}
									</Link>
								</p>
								<p className="text-[18px] text-text-100/[77%]">
									Shared by{" "}
									<span className="font-header2 text-[20px]">
										{file.sharedBy}
									</span>{" "}
									on {file.sharedOn}
								</p>
							</div>

							{/* Download icon at the right end */}
							<a
								href={file.url}
								download
								target="_blank"
								rel="noopener noreferrer"
								className="ml-auto font-semibold text-gray-500 hover:text-green-600"
							>
								<Download className="w-12 h-12" />
							</a>
						</li>
					))
				) : (
					<h1 className="h-[45vh] flex justify-center items-center text-4xl text-red-600">
						No Files Found!
					</h1>
				)}
			</ul>
		</div>
	);
};

export default ChatFilesSection;
