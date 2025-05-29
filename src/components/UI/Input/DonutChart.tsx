import React from "react";

interface DonutChartProps {
	completed: number;
	inProgress: number;
	notStarted: number;
}

const DonutChart: React.FC<DonutChartProps> = ({
	completed,
	inProgress,
	notStarted,
}) => {
	const total = completed + inProgress + notStarted;
	const radius = 50; // Adjusted radius for smaller size
	const strokeWidth = 10; // Adjusted strokeWidth for smaller size
	const center = 55; // Adjusted center for smaller size
	const normalizedRadius = radius - strokeWidth / 2;
	const circumference = 2 * Math.PI * normalizedRadius;

	const segments = [
		{ label: "Completed", value: completed, color: "#18320C" },
		{ label: "In progress", value: inProgress, color: "#CDBF2C" },
		{ label: "Not started", value: notStarted, color: "#E5E5E5" },
	];

	let offset = 0;

	return (
		<div className=" mx-auto relative top-0 left-0 w-[110px] h-[110px]">
			<svg width="100%" height="100%" className=" ">
				{segments.map((segment, index) => {
					const percentage = segment.value / total;
					const dashLength = percentage * circumference;

					const circle = (
						<circle
							key={index}
							cx={center}
							cy={center}
							r={normalizedRadius}
							fill="transparent"
							stroke={segment.color}
							strokeWidth={strokeWidth}
							strokeDasharray={`${dashLength} ${circumference}`}
							strokeDashoffset={offset || 0}
							strokeLinecap="butt"
							transform={`rotate(-90 ${center} ${center})`}
						/>
					);

					offset -= dashLength;
					return circle;
				})}
				<text
					x={center}
					y={center}
					dominantBaseline="central"
					textAnchor="middle"
					className="font-bold text-[28px]" // Adjusted text size for smaller chart
					style={{ pointerEvents: "none" }}
				>
					{completed}%
				</text>
			</svg>
		</div>
	);
};

export default DonutChart;
