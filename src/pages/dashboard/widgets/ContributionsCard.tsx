import React, { useEffect, useState } from "react";
import { CircleOff } from "lucide-react";
import Card1 from "../../../components/UI/Input/Card1";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";
import { getIconFromType } from "../../../utils/utilities";

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
					`${import.meta.env.VITE_API_URL}/reports/daily`,
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
				Today
			</h1>

			{items.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-10 text-center">
					<p className="text-[20px] font-header2 text-gray-400 mb-4">
						No reports this today 🚀
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
						const Icon = getIconFromType(file.type);
						const fileUrl = `${import.meta.env.VITE_S3_DOMAIN}/${file.url}`;
						const fileLink = `reports/${file.vendor.name.toLowerCase()}/file?url=${encodeURIComponent(
							fileUrl
						)}&id=${file.id}&vendor=${file.vendor.name}`;

						return (
							<li key={file.id}>
								<a
									href={fileLink}
									rel="noopener noreferrer"
									className="hover:bg-gray-200 flex items-center gap-4 bg-background-100/10 rounded-xl p-3"
								>
									<div className="flex-shrink-0 bg-white p-2 rounded-md">
										<img
											src={Icon}
											alt={`${file.type} icon`}
											className="w-16 h-16"
										/>
									</div>

									<div className="flex flex-col">
										<a
											href={fileLink}
											rel="noopener noreferrer"
											className="text-xl font-header2 text-text-100 underline hover:text-primary"
										>
											{file.name}
										</a>
										<p className="text-lg text-text-200 mt-1">
											Shared by{" "}
											<span className="font-semibold">
												{file.sharedBy.fullName}
											</span>{" "}
											from{" "}
											<span className="font-semibold">{file.vendor.name}</span>
										</p>
									</div>
								</a>
							</li>
						);
					})}
				</ul>
			)}
		</Card1>
	);
};

export default ContributionsCard;
