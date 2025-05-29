import React, { useEffect, useState } from "react";
import { CircleOff } from "lucide-react";
import Card1 from "../../../components/UI/Input/Card1";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";
import { getIconFromTag } from "../../../utils/utilities";

interface ReportFile {
	id: string;
	name: string;
	type: string;
	size: number;
	url: string;
	sharedAt: string;
	sharedBy: {
		id: string;
		fullName: string;
		email: string;
	};
	vendor: {
		id: string;
		name: string;
	};
}

interface Props {
	className?: string;
}

const ContributionsCard: React.FC<Props> = ({ className }) => {
	const [items, setItems] = useState<ReportFile[]>([]);
	const authHeader = useAuthHeader();

	useEffect(() => {
		const fetchReports = async () => {
			try {
				const token = authHeader?.split(" ")[1];
				if (!token) return;

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/reports/weekly`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch reports");
				}

				const data = await response.json();
				setItems(data || []);
			} catch (error) {
				console.error(error);
				toast.error("Failed to load reports");
			}
		};

		fetchReports();
	}, [authHeader]);

	return (
		<Card1
			header={"Recent reports"}
			className={`pb-[30px] ${className}`}
			isStroked
		>
			<h1 className="font-header2 text-text-200 text-[16px] px-[16px] mt-1">
				This week
			</h1>

			{items.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-10 text-center">
					<p className="text-[20px] font-header2 text-gray-400 mb-4">
						No reports this week 🚀
					</p>
					<p className="text-[14px] text-gray-400">
						Time to make some awesome progress!
					</p>
					<div className="w-[80px] h-[80px] rounded-full bg-gray-100 flex items-center justify-center mt-6">
						<CircleOff size={40} strokeWidth={1} className="text-[#747373]" />
					</div>
				</div>
			) : (
				<ul className="px-6 py-4 space-y-3 text-sm">
					{items.map((file) => {
						const Icon = getIconFromTag(file.type); // Update your getIconFromTag to handle MIME types or extensions
						return (
							<React.Fragment key={file.id}>
								<li className="flex items-center gap-3">
									<img
										src={Icon}
										className="w-[24px] h-[24px] mt-[2px]"
										alt="File Icon"
									/>
									<a
										href={`reports/${file.vendor.name.toLowerCase()}/file?url=${encodeURIComponent(`${import.meta.env.VITE_S3_DOMAIN}/${file.url}`)}}&id=${file.id}&vendor=${file.vendor.name}`}
										target="_blank"
										rel="noopener noreferrer"
										className="text-[12px] font-header2 text-text-100 underline hover:text-primary"
									>
										{file.name}
									</a>
								</li>
								<p className="font-header2 text-text-200 text-[12px] !mt-1 px-[24px]">
									Shared by {file.sharedBy.fullName} from {file.vendor.name}
								</p>
							</React.Fragment>
						);
					})}
				</ul>
			)}
		</Card1>
	);
};

export default ContributionsCard;
