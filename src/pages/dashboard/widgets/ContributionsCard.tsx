import React, { useEffect, useState } from "react";
import { CircleOff } from "lucide-react";
import Card1 from "../../../components/UI/Input/Card1";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";
import { getIconFromTag } from "../../../utils/utilities";

interface Contribution {
	id: string;
	title: string;
	description: string;
	dueDate: string;
	tag?: string;
	status: "TODO" | "IN_PROGRESS" | "COMPLETED";
	createdById: string;
	groupId: string;
	projectId?: string | null;
	created_at: string;
	updated_at: string;
}

interface Props {
	className?: string;
}

const ContributionsCard: React.FC<Props> = ({ className }) => {
	const [items, setItems] = useState<Contribution[]>([]);
	const authHeader = useAuthHeader();

	useEffect(() => {
		const fetchContributions = async () => {
			try {
				const token = authHeader?.split(" ")[1];
				if (!token) return;

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/tasks/contributions-week`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch contributions");
				}

				const data = await response.json();
				setItems(data || []);
			} catch (error) {
				console.error(error);
				toast.error("Failed to load contributions");
			}
		};

		fetchContributions();
	}, [authHeader]);

	return (
		<Card1
			header={"Contributions"}
			className={`pb-[30px] ${className}`}
			isStroked
		>
			<h1 className="font-header2 text-text-200 text-[16px] px-[16px] mt-1">
				This week
			</h1>

			{items.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-10 text-center">
					<p className="text-[20px] font-header2 text-gray-400 mb-4">
						No contributions this week 🚀
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
					{items.map((c) => {
						const Icon = getIconFromTag(c.tag || "general");
						return (
							<React.Fragment key={c.id}>
								<li className="flex items-center gap-3">
									<img
										src={Icon}
										className="w-[24px] h-[24px] mt-[2px]"
										alt="Contribution Icon"
									/>
									<p className="text-[12px] font-header2 text-text-100">
										{c.title}
									</p>
								</li>
								{c.description && (
									<p className="font-header2 text-text-200 text-[12px] !mt-1 px-[24px]">
										{c.description}
									</p>
								)}
							</React.Fragment>
						);
					})}
				</ul>
			)}
		</Card1>
	);
};

export default ContributionsCard;
