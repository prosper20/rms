import { useEffect, useState } from "react";
import { Box } from "lucide-react";
import Card1 from "../../../components/UI/Input/Card1";
import Shadow1 from "../../../components/UI/Input/Shadows";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const users = "/Vector.svg";

export interface Group {
	id: string;
	name: string;
	members: number;
}

interface Props {
	className?: string;
	header: string;
	button?: boolean;
}

const ActiveGroupsCard: React.FC<Props> = ({ className, header }) => {
	const authHeader = useAuthHeader();
	const [groups, setGroups] = useState<Group[]>([]);

	useEffect(() => {
		const fetchGroups = async () => {
			try {
				const token = authHeader?.split(" ")[1];
				if (!token) {
					toast.error("No auth token found");
					return;
				}

				const response = await fetch(`${import.meta.env.VITE_API_URL}/groups`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					throw new Error("Failed to fetch groups");
				}

				const data = await response.json();
				const formattedGroups: Group[] = data.map((group: any) => ({
					id: group.id,
					name: group.groupName,
					members: group.members.length,
				}));

				setGroups(formattedGroups);
			} catch (error) {
				console.error(error);
				toast.error("Failed to load active groups");
			}
		};

		fetchGroups();
	}, [authHeader]);

	return (
		<Card1 header={`${header}`} className={`pb-[30px] ${className}`} isStroked>
			<a
				href="/dashboard/groups"
				className="text-[14px] text-right px-[25px] mt-[24px] font-header1 underline underline-offset-[24.5%] text-lightpink hover:underline"
			>
				View all
			</a>

			<ul className="px-8 flex flex-col gap-[22px] mt-[17px]">
				{groups.map((g) => (
					<Link key={g.id} to={`/dashboard/groups/${g.id}`}>
						<Shadow1 className="h-[62px] pl-[13px] py-[10px] text-[#747373] flex items-center gap-[25px] hover:bg-gray-100 transition rounded-[8px]">
							<div className="w-[48px] h-[40px] bg-cubepink place-content-center place-items-center rounded-[5px]">
								<Box size={38} strokeWidth={0.7} className="text-purple-500" />
							</div>
							<div className="font-header1">
								<p className="text-[16px] mb-[4px]">{g.name}</p>
								<div className="flex items-center gap-[6px]">
									<img
										src={users}
										width={16}
										height={16}
										className="mt-[-3px]"
										alt="User Icon"
									/>
									<p className="text-[14px]">
										{g.members} {g.members === 1 ? "member" : "members"}
									</p>
								</div>
							</div>
						</Shadow1>
					</Link>
				))}
			</ul>
		</Card1>
	);
};

export default ActiveGroupsCard;
