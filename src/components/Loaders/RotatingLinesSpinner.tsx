import { RotatingLines } from "react-loader-spinner";

const RotatingLinesSpinner = ({ strokeColor = "gray", width = "24" }) => {
	return (
		<div className="spinner-border flex justify-center" role="status">
			<RotatingLines strokeColor={strokeColor} width={width} />
		</div>
	);
};

export default RotatingLinesSpinner;
