import React, { useEffect, useState } from "react";
import { CtaButton2 } from "../../../components/ButtonComponents/CtaButtons";
import { Shadow2 } from "../../../components/UI/Input/Shadows";
import Card1 from "../../../components/UI/Input/Card1";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";
import { CircleOff } from "lucide-react";
import { getTagColorFromName } from "../../../utils/utilities";

interface AgendaItem {
	id: string;
	title: string;
	dueDate: string;
	tag?: string;
}

const AgendaCard: React.FC<{ className?: string }> = ({ className }) => {
	const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);
	const authHeader = useAuthHeader();

	useEffect(() => {
		const fetchAgenda = async () => {
			try {
				const token = authHeader?.split(" ")[1];
				if (!token) return;

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/tasks/agenda-today`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch agenda");
				}

				const data = await response.json();
				console.log("Agenda: ", data[0]);
				setAgendaItems(data || []);
			} catch (error) {
				console.error(error);
				toast.error("Failed to load agenda for today");
			}
		};

		fetchAgenda();
	}, [authHeader]);

	return (
		<Card1
			header="Agenda for the day"
			className={`pb-[30px] ${className}`}
			isStroked
		>
			{agendaItems.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-10 text-center">
					<p className="text-[20px] font-header2 text-gray-400 mb-4">
						No agenda scheduled for today 🎉
					</p>
					<p className="text-[14px] text-gray-400 mb-6">
						Relax, plan, or take on a side project!
					</p>
					{/* Big icon */}
					<div className="w-[80px] h-[80px] rounded-full bg-gray-100 flex items-center justify-center">
						<CircleOff size={40} strokeWidth={1} className="text-[#747373]" />
					</div>
				</div>
			) : (
				<ul className="flex flex-col gap-[25px] mt-[17px]">
					{agendaItems.map((item) => (
						<Shadow2
							key={item.id}
							className="bg-background-primary !shadow-agenda-shadow flex w-full !rounded-[15px] px-[11px] py-[10px] gap-[19px]"
						>
							<div>
								<CtaButton2
									className={getTagColorFromName(item.tag || "General")}
								>
									{item.tag || "General"}
								</CtaButton2>
							</div>
							<div>
								<p className="text-[16px] font-header1 text-text-100">
									{item.title}
								</p>
								<p className="text-[12px] font-header1 text-gray-600/[52%] mt-[3px]">
									{new Date(item.dueDate).toLocaleString("en", {
										month: "short",
										day: "numeric",
										year: "numeric",
										hour: "2-digit",
										minute: "2-digit",
									})}
								</p>
							</div>
						</Shadow2>
					))}
				</ul>
			)}
		</Card1>
	);
};

export default AgendaCard;
