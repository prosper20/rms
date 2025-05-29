import {
	addMonths,
	format,
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	getDay,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Card2 } from "../../../components/UI/Input/Card1";

interface CalendarWidgetProps {
	className?: string;
	style?: string;
}

const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

const CalendarWidget: React.FC<CalendarWidgetProps> = ({
	className,
	style,
}) => {
	const [month, setMonth] = useState<Date>(new Date());

	const days = eachDayOfInterval({
		start: startOfMonth(month),
		end: endOfMonth(month),
	});

	const padStart = getDay(startOfMonth(month)); // 0‑6

	return (
		<Card2
			className={`rounded-[20px] pt-[1.5vw] max-mw:p-[2vw] h-[auto] px-[0.9vw] max-mw:pb-[40px] bg-background-primary pb-[2vw] ${className}`}
		>
			{/* Header */}
			<div className="flex items-center justify-between">
				<button onClick={() => setMonth(addMonths(month, -1))}>
					<ChevronLeft
						size={22}
						className="shadow-chevrolet-shadow w-[1.6vw] max-mw:w-[30px] h-[1.6vw] max-mw:h-[30px] rounded-[500px]"
					/>
				</button>
				<div className="text-center">
					<p className="font-header1 text-[1vw] max-mw:text-[24px] text-text-100">
						{format(month, "LLLL")}
					</p>
					<p className="text-[0.6vw] max-mw:text-[13px] font-[600] text-primary-400">
						{format(month, "yyyy")}
					</p>
				</div>
				<button onClick={() => setMonth(addMonths(month, 1))}>
					<ChevronRight
						size={22}
						className="shadow-chevrolet-shadow w-[1.6vw] h-[1.6vw] max-mw:w-[30px] max-mw:h-[30px] rounded-[500px]"
					/>
				</button>
			</div>

			{/* Weekdays */}
			<div className="grid grid-cols-7 text-center text-[0.8vw] max-mm:text-[1.2vw] max-mw:text-[1vw] font-header1 text-text-100 mt-[0.1vw] max-mw:mt-[1vw] max-mw:py-[2vw]">
				{weekdays.map((d, index) => (
					<span
						className={`p-4 max-mm:p-[1vw] max-mw:text-[16px] ${className}`}
						key={index}
					>
						{d}
					</span>
				))}
			</div>

			{/* Dates */}
			<div className="grid grid-cols-7 gap-[0.8vw] max-mw:gap-0 max-mm:gap:0 max-mw:gap-y-[15px] text-center text-sm mt-[0.8vw]">
				{Array.from({ length: padStart }).map((_, i) => (
					<span key={`pad-${i}`} />
				))}
				{days.map((day) => {
					const isToday =
						format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
					return (
						<button
							key={day.toString()}
							className={`
								
								${style}
                aspect-square rounded-md shadow-calendar-date w-[2.2vw] max-mm:w-[3.2vw] max-mw:w-[6.9vw] text-[0.8vw] font-header1 text-text-100 h-[2.4vw] max-mw:h-[6.9vw] max-mw:text-[16px] max-mm:text-[14px] justify-self-center 
                ${isToday ? "bg-active-calendar text-white" : "hover:bg-black/10"}
              `}
						>
							{format(day, "d")}
						</button>
					);
				})}
			</div>
		</Card2>
	);
};

export default CalendarWidget;
