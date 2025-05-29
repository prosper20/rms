import { useState } from "react";
import { Bell, Calendar, Clock, ClockFadingIcon } from "lucide-react";
import CalendarWidget from "./widgets/CalendarWidget";
import { Link } from "react-router-dom";

const CalendarScheduler = () => {
	//   const [selectedDate, setSelectedDate] = useState<number>(23);
	const [selectedTime, setSelectedTime] = useState<string>("02:00 pm");

	//   const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

	// March-April days for the calendar view
	//   const calendarDays = [
	//     { day: 30, month: 'prev' },
	//     { day: 31, month: 'prev' },
	//     { day: 1, month: 'current' },
	//     { day: 2, month: 'current' },
	//     { day: 3, month: 'current' },
	//     { day: 4, month: 'current' },
	//     { day: 5, month: 'current' },
	//     { day: 6, month: 'current' },
	//     { day: 7, month: 'current' },
	//     { day: 8, month: 'current', hasEvent: true },
	//     { day: 9, month: 'current' },
	//     { day: 10, month: 'current' },
	//     { day: 11, month: 'current' },
	//     { day: 12, month: 'current', hasEvent: true },
	//     { day: 13, month: 'current' },
	//     { day: 14, month: 'current' },
	//     { day: 15, month: 'current', hasEvent: true },
	//     { day: 16, month: 'current' },
	//     { day: 17, month: 'current' },
	//     { day: 18, month: 'current' },
	//     { day: 19, month: 'current' },
	//     { day: 20, month: 'current' },
	//     { day: 21, month: 'current', hasEvent: true },
	//     { day: 22, month: 'current' },
	//     { day: 23, month: 'current' },
	//     { day: 24, month: 'current' },
	//     { day: 25, month: 'current' },
	//     { day: 26, month: 'current' },
	//     { day: 27, month: 'current' },
	//     { day: 28, month: 'current' },
	//     { day: 29, month: 'current' },
	//     { day: 30, month: 'current' },
	//     { day: 1, month: 'next' },
	//     { day: 2, month: 'next' },
	//     { day: 3, month: 'next' },
	//   ];

	const timeSlots = [
		"10:00 am",
		"11:00 am",
		"12:00 pm",
		"01:00 pm",
		"02:00 pm",
		"03:00 pm",
		"04:00 pm",
		"05:00 pm",
		"06:00 pm",
		"07:00 pm",
	];

	const participants = [
		"/api/placeholder/40/40",
		"/api/placeholder/40/40",
		"/api/placeholder/40/40",
	];

	return (
		<div className="mt-[40px] flex flex-col h-screen bg-transparent text-gray-800">
			<div className=" mx-auto md:p-6 w-[92%]">
				<h1 className="text-4xl font-bold mb-8">Schedule a Session</h1>

				<div className="flex flex-col lg:flex-row gap-8 md:flex-wrap">
					<div className="flex flex-col lg:flex-row gap-8 basis-[60%] max-md:basis-[100%] justify-left justify-between">
						<div className="basis-[90%] ">
							<CalendarWidget
								style="!text-[20px] hover:!bg-active-calendar"
								className="!shadow-background-100 !bg-background-100 !text-[20px]"
							/>

							{/* Notification section */}
							<div className="mt-6 bg-card-200 py-4 px-7 rounded-[15px] flex items-center gap-4 flex-wrap">
								<div className="p-3 bg-background-card/[50%] rounded-[15px]">
									<Bell size={40} className="text-gray-600" />
								</div>
								<div>
									<h3 className="font-header1 text-text-100 text-[20px] sm:text-[24px]">
										Notification
									</h3>
									<p className="font-header1 text-[16px] text-text-100/[53%]">
										Notify members by email
									</p>
								</div>
							</div>
						</div>

						{/* Right section - Time & details */}
						<div className="basis-[10%] flex-1">
							<div className="mb-4">
								<h2 className="text-[24px] text-nowrap font-bold mb-2">
									Pick a time
								</h2>
								<div className="flex flex-col gap-9">
									{timeSlots.map((time) => (
										<button
											key={time}
											className={`
                     rounded-[15px] h-[41px] text-[20px] font-header text-center shadow-calendar-date 
                      ${time === selectedTime ? "bg-[#9F7740] text-white" : "bg-background-primary shadow-sm hover:bg-gray-100"}
                    `}
											onClick={() => setSelectedTime(time)}
										>
											{time}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Right sidebar - Invite & details */}
					<div className="flex-1 xl:w-[352px] w-[100%] bg-background-card rounded-[15px] p-14 basis-[30%] text-[24px]">
						<div className="mb-6">
							<h2 className="text-[24px] font-header">
								Who needs to be invited?
							</h2>
							<div className="flex my-14  relative h-[40px]">
								<input
									type="text"
									className="w-[100%] rounded-[15px]"
									placeholder=""
								/>
								<button className="bg-primary-button-100 h-[40px] text-white px-7 text-[24px] rounded-[15px] absolute right-0">
									Invite
								</button>
							</div>
						</div>

						<div className="mb-14">
							<h2 className="font-header3 mb-2">Goal</h2>
							<input
								type="text"
								className="w-full p-3 h-[40px] border-0 rounded-[15px]"
							/>
						</div>

						<div className="mb-6 flex justify-between flex-wrap">
							<h2 className="font-header3 mb-2">Participants:</h2>
							<div className="flex items-center">
								{participants.map((participant, index) => (
									<img
										key={index}
										src={participant}
										alt="Participant"
										className="w-10 h-10 rounded-full border-2 border-white -mr-2"
									/>
								))}
								<div className="w-10 h-10  flex items-center justify-center text-[14px] ml-1">
									+2
								</div>
							</div>
						</div>

						<div className="bg-[#9F77402B] rounded-[15px] p-9 mb-6 text-[16px] flex flex-col gap-11">
							<div className="flex items-start gap-3 mb-3">
								<Calendar size={40} className="mt-1 text-gray-700" />
								<div>
									<div className="text-[16px] uppercase font-semibold text-gray-700">
										DATE
									</div>
									<div>Wednesday, April 23</div>
								</div>
							</div>

							<div className="flex items-start gap-3 mb-3">
								<Clock size={40} className="mt-1 text-gray-700" />
								<div>
									<div className="text-[16px] uppercase font-semibold text-gray-700">
										TIME
									</div>
									<div>02:00 PM (GMT+1)</div>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<ClockFadingIcon size={40} className="mt-1 text-gray-700" />

								<div>
									<div className="text-[16px] uppercase font-semibold text-gray-700">
										DURATION
									</div>
									<div>1 hour</div>
								</div>
							</div>
						</div>

						<button className="bg-primary-button-100 h-[40px] text-white px-7 text-[18px] rounded-[15px]">
							<Link to={"ongoing-session"}>Join a session</Link>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CalendarScheduler;
