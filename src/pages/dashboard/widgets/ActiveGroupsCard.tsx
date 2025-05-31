import { useEffect, useState } from "react";
import { Box } from "lucide-react";
import Card1 from "../../../components/UI/Input/Card1";
import Shadow1 from "../../../components/UI/Input/Shadows";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { DocumentText } from "iconsax-react";

export interface User {
	id: string;
	fullName: string;
	email: string;
}

export interface Vendor {
	id: string;
	name: string;
	created_at: string;
	updated_at: string;
	users: User[];
	files: number;
}

interface Props {
	className?: string;
	header: string;
	button?: boolean;
}

const ActiveGroupsCard: React.FC<Props> = ({ className, header }) => {
	const authHeader = useAuthHeader();
	const [vendors, setVendors] = useState<Vendor[]>([]);

	useEffect(() => {
		const fetchGroups = async () => {
			try {
				const token = authHeader?.split(" ")[1];
				if (!token) {
					toast.error("No auth token found");
					return;
				}

				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/vendors`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch groups");
				}

				const data = await response.json();
				const formattedVendors: Vendor[] = data.map((vendor: any) => ({
					id: vendor.id,
					name: vendor.name,
					files: vendor.files.length,
				}));

				setVendors(formattedVendors);
			} catch (error) {
				console.error(error);
				toast.error("Failed to load active groups");
			}
		};

		fetchGroups();
	}, [authHeader]);

	return (
		<Card1 header={`${header}`} className={`pb-[30px] ${className}`} isStroked>
			<ul className="px-8 flex flex-col gap-[22px] mt-[17px]">
				{vendors.map((v) => (
					<Link key={v.name} to={`/reports/${v.name.toLowerCase()}`}>
						<Shadow1 className="h-[62px] pl-[13px] py-[10px] text-[#747373] flex items-center gap-[25px] hover:bg-gray-100 transition rounded-[8px]">
							<div className="w-[48px] h-[40px] bg-cubepink place-content-center place-items-center rounded-[5px]">
								<Box size={38} strokeWidth={0.7} className="text-purple-500" />
							</div>
							<div className="font-header1">
								<p className="text-[16px] mb-[4px]">{v.name}</p>
								<div className="flex items-center gap-[6px]">
									<DocumentText className="w-6 h-6" />
									<p className="text-[14px]">
										{v.files} {v.files <= 1 ? "file" : "files"}
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
