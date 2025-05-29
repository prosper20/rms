import { useState } from "react";

const NotificationSetting: React.FC = () => {
	// State for notification preferences
	// const [notifications, setNotifications] = useState({
	// 	pushNotification: true,
	// 	sessionReminders: true,
	// 	taskDeadlineAlerts: true
	// });

	type NotificationType = "notification" | "session" | "task";

	const [notification, setNotification] = useState<{
		notification: boolean;
		session: boolean;
		task: boolean;
	}>({
		notification: false,
		session: false,
		task: false,
	});

	const toggleSwitch = (type: NotificationType) => {
		setNotification((prev) => {
			const tracked = {
				...prev,
				[type]: !prev[type],
			};
			return tracked;
		});
	};

	return (
		<section>
			<h2 className="text-[24px] sm:text-[32px] font-header mb-2 text-gray-800">
				Notification Preferences
			</h2>
			<div className="bg-[#F3D7CA66]/[40%] px-[12px] sm:px-[36px] py-[19px] sm:py-[48px] rounded-tr-[15px] p-4 shadow-profile-info">
				<div className="mb-3">
					<h3 className="text-[24px] sm:text-[32px] font-header3 mb-8 text-text-100">
						Password
					</h3>
				</div>

				<div className="flex flex-col gap-[16px]">
					<div className="flex justify-between items-center">
						<span className="text-[20px] font-[300] text-text-100">
							Push notification
						</span>
						<div
							onClick={() => toggleSwitch("notification")}
							className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
								!notification.notification ? "bg-gray-300" : "bg-blue-500"
							}`}
						>
							<div
								className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
									!notification.notification ? "translate-x-0" : "translate-x-8"
								}`}
							/>
						</div>
					</div>

					<div className="">
						<div className="flex justify-between items-center">
							<span className="text-[20px] font-[300] text-text-100">
								Session Reminders
							</span>
							<div
								onClick={() => toggleSwitch("session")}
								className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
									!notification.session ? "bg-gray-300" : "bg-blue-500"
								}`}
							>
								<div
									className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
										!notification.session ? "translate-x-0" : "translate-x-8"
									}`}
								/>
							</div>
						</div>
					</div>

					<div className="">
						<div className="flex justify-between items-center">
							<span className="text-[20px] font-[300] text-text-100">
								Task Deadline alerts
							</span>
							<div
								onClick={() => toggleSwitch("task")}
								className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
									!notification.task ? "bg-gray-300" : "bg-blue-500"
								}`}
							>
								<div
									className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
										!notification.task ? "translate-x-0" : "translate-x-8"
									}`}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NotificationSetting;
