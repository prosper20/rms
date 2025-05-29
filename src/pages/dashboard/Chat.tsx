import { Files, MessageCircleMoreIcon, Search } from "lucide-react";
import { format } from "date-fns";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link, NavLink, Outlet } from "react-router-dom";
// import ChatMessages from "../../components/ChatMessages";

export interface Group {
	id: string;
	name: string;
	members: number;
}

export const rawMessages = [
	{
		id: 1,
		name: "Courtney Henry",
		time: "2025-04-16T04:30:00",
		text: "Hey everyone, has anyone figured out how to clean the dataset properly? I’m stuck on null values",
		avatar: "https://randomuser.me/api/portraits/women/1.jpg",
	},
	{
		id: 2,
		name: "Wade Warren",
		time: "2025-04-16T06:00:00",
		text: "I just pushed the updated preprocessing script to the repo. Check it out and let me know what you think.",
		avatar: "https://randomuser.me/api/portraits/men/2.jpg",
	},
	{
		id: 3,
		name: "Dr. Floyd Miles",
		time: "2025-04-16T06:10:00",
		text: "Quick reminder: Mid-project progress reports are due by Friday. I’ll be reviewing your session notes and task completion for feedback",
		avatar: "https://randomuser.me/api/portraits/men/3.jpg",
		tag: "Supervisor",
	},
	{
		id: 4,
		name: "System",
		type: "info",
		time: "2025-04-17T06:10:00",
		text: "I think we should meet tomorrow to finalize the EDA section. Around 5 PM?",
	},
	{
		id: 5,
		name: "Annette Black",
		time: "2025-04-17T14:00:00",
		text: "Please read though this",
		avatar: "https://randomuser.me/api/portraits/women/4.jpg",
		file: {
			name: "Research-Data.xlsx",
			size: "12kb",
		},
	},
];

const groupMessagesByDate = (messages: typeof rawMessages) => {
	const groups: { date: string; items: typeof rawMessages }[] = [];
	messages.sort(
		(a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
	);

	messages.forEach((msg) => {
		const msgDate = format(new Date(msg.time), "EEEE, MMMM d");
		const group = groups.find((g) => g.date === msgDate);
		if (group) {
			group.items.push(msg);
		} else {
			groups.push({ date: msgDate, items: [msg] });
		}
	});

	return groups;
};

export const groupedMessages = groupMessagesByDate(rawMessages);

export default function Chat() {
	const authHeader = useAuthHeader();
	const [groups, setGroups] = useState<Group[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [refetch, setRefetch] = useState<boolean>(false);

	useEffect(() => {
		const fetchGroups = async () => {
			setIsLoading(true);
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
				setError("Failed to fetch groups");
			} finally {
				setIsLoading(false);
			}
		};

		fetchGroups();
	}, [authHeader, refetch]);

	function reFetchGroups() {
		setRefetch((prev) => !prev);
	}

	console.log(groups);
	return (
		<div className="flex fixed w-full lg:pr-[290px] pr-[10px]">
			<div className="bg-border/[15%] h-[100vh] border-border/[71%] basis-[18%] min-w-[218px] text-border text-center">
				<header className="mt-[70px]">
					<h1 className="text-[28px] font-header1">Groups</h1>
				</header>
				<hr className="border-border mt-2" />

				{isLoading && groups.length === 0 && (
					<div>
						<h1 className="mt-[74px] mx-[17px] flex flex-col gap-9 mb-[20px] text-[15px]">
							Fetching groups...
						</h1>
					</div>
				)}
				{error && !isLoading && groups.length === 0 && (
					<div className="mt-[74px] mx-[17px] flex text-red-700 flex-col gap-9 mb-[20px] text-[15px]">
						<h1>{error}</h1>
						<button onClick={reFetchGroups}>try again</button>
					</div>
				)}
				{groups && (
					<ul className="mt-[44px] mx-[17px] flex flex-col gap-9 mb-[50px]">
						{groups.map((group) => {
							const formatGroup = (name: string) => {
								if (name.length >= 9) {
									return (name = name.slice(0, 7) + "...");
								}

								return name;
							};
							const groupName = formatGroup(group.name);
							return (
								<li className="group relative" key={group.id}>
									<Link className="" to={`/dashboard/chat/group/${group.name}`}>
										<div className="flex justify-between hover:bg-text-200 items-center cursor-pointer text-[24px] px-3 rounded-[12px]">
											<h1>{groupName}</h1>
											<p className="bg-background-card text-[20px] text-text-100 font-header1 leading-[25px] rounded-[15px] w-[49px]">
												+{6}
											</p>
										</div>
									</Link>
									<div className=" absolute top-[35px] w-fit hidden group-hover:block bg-gray-200 text-gray-500 text-[13px] rounded py-1 px-2 whitespace-nowrap shadow-lg">
										{group.name}
									</div>
								</li>
							);
						})}
					</ul>
				)}

				<Link to={""}>
					<div className="flex items-center justify-around text-[16px] font-header2 mx-[24px] cursor-pointer">
						<Search size={18} />
						<h1 className="hover:underline">Browse all groups</h1>
					</div>
				</Link>
			</div>
			<div className="w-full bg-transparent h-[100vh] flex flex-col justify-between">
				<div className="flex-1">
					<div className=" border-b text-border px-8 border-border">
						<h1 className="text-[28px] my-[16px] font-header1">
							Project Pioneers
						</h1>
						<div className="flex gap-[34px] mt-2 text-[24px] font-header2">
							<NavLink
								className={({ isActive }) =>
									isActive ? `border-b-2 border-border` : ""
								}
								to={"/dashboard/chat/messages"}
							>
								<span className="pb-1 leading-[38px] items-center flex">
									<MessageCircleMoreIcon
										size={29}
										className="text-white"
										fill="#5c4033"
									/>
									<h1>Messages</h1>
								</span>
							</NavLink>
							<NavLink
								className={({ isActive }) =>
									isActive ? `border-b-2 border-border` : ""
								}
								to={"/dashboard/chat/files"}
							>
								<span className="pb-1 leading-[38px] items-center flex">
									<Files />
									<h1>Files</h1>
								</span>
							</NavLink>
						</div>
					</div>

					{/* <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300 bg-white">
					<div className="flex items-center gap-3">
						<Users className="w-5 h-5 text-gray-600" />
						<span className="text-sm font-medium text-gray-800">4 Members</span>
					</div>
					<button className="text-sm text-blue-600 font-medium">Add People</button>
					</div> */}

					<Outlet></Outlet>
				</div>
			</div>
		</div>
	);
}
