// components/QAMentorSession.tsx
import { MicOff, Hand, List, Phone } from "lucide-react";
import face from "../assets/user-images/avatar.png";
import Home from "../components/UI/Input/QASidebar";
import { useState } from "react";

type Participant = {
	name: string;
	avatarUrl: string;
	isMuted: boolean;
	isSpeaking: boolean;
};

const participants: Participant[] = [
	{
		name: "Darlene Robertson",
		avatarUrl: face,
		isMuted: true,
		isSpeaking: false,
	},
	{
		name: "Ralph Edwards",
		avatarUrl: face,
		isMuted: true,
		isSpeaking: false,
	},
	{
		name: "Dr. Floyd Miles",
		avatarUrl: face,
		isMuted: true,
		isSpeaking: false,
	},
	{
		name: "Annette Black",
		avatarUrl: face,
		isMuted: false,
		isSpeaking: true,
	},
	{
		name: "Courtney Henry",
		avatarUrl: face,
		isMuted: true,
		isSpeaking: false,
	},
	{
		name: "Courtney Henry",
		avatarUrl: face,
		isMuted: true,
		isSpeaking: false,
	},
];

const QAMentorSession: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	function handleOpenSideBar() {
		setIsOpen(true);
	}

	return (
		<div
			className={`flex xxl:w-[98%] items-start ${isOpen ? `max-sw:block` : ``}`}
		>
			<div className="p-1  flex flex-col items-left flex-1">
				<h1
					className={`text-5xl font-bold mb-8 ${isOpen ? `max-sw:hidden` : ``}`}
				>
					Q&A with Industry Mentor
				</h1>

				<div
					className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 mt-[60px] ${isOpen ? `xxl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 max-sw:hidden` : `lg:grid-cols-3`} `}
				>
					{participants.map((participant, idx) => (
						<div
							key={idx}
							className="bg-[#FDFAF7]/[60%] rounded-lg p-[60px] shadow-box-shadow1 flex flex-col items-center relative"
						>
							<div className="relative">
								<img
									src={participant.avatarUrl}
									alt={participant.name}
									className="w-44 h-44 rounded-full object-cover"
								/>
								{participant.isMuted && (
									<MicOff className="absolute top-0 right-0 bg-white rounded-full p-1 w-6 h-6 text-gray-600" />
								)}
								{participant.isSpeaking && (
									<div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-blue-500 animate-ping"></div>
								)}
							</div>
							<p className="mt-14 font-semibold text-[18px]">
								{participant.name}
							</p>
						</div>
					))}
				</div>

				<div
					className={`flex w-[100%] sm:w-[40%] ${isOpen ? `max-sw:hidden` : ``} mx-auto mt-[60px] justify-center gap-11 bg-background-card p-3 rounded-lg shadow-box-shadow1`}
				>
					<button className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600">
						<MicOff />
					</button>
					<button className="bg-yellow-400 text-white p-3 rounded-full hover:bg-yellow-500">
						<Hand />
					</button>
					<button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700">
						<List onClick={handleOpenSideBar} />
					</button>
					<button className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700">
						<Phone onClick={handleOpenSideBar} />
					</button>
				</div>
			</div>
			<div className={`max-sw:mt-[20px] mt-[105px]`}>
				{isOpen && <Home setIsOpen={setIsOpen}></Home>}
			</div>
		</div>
	);
};

export default QAMentorSession;
