import { Outlet } from "react-router-dom";
const ReportLayout = () => {
	return (
		<div className="flex  w-full">
			<div className={`w-full h-screen flex justify-center items-start`}>
				<div className="w-full">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default ReportLayout;
