import React, { useState } from "react";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";
import LoaderSpinnerSmall from "../Loaders/LoaderSpinnerSmall";

const AddVendorForm: React.FC = () => {
	const [vendorName, setVendorName] = useState("");
	//const [, setVendors] = useState<any[]>([]); // Optional
	const [loading, setLoading] = useState(false);

	const authHeader = useAuthHeader();
	const token = authHeader?.split(" ")[1];

	// const fetchVendors = async () => {
	// 	try {
	// 		const res = await axios.get(`${import.meta.env.VITE_API_URL}/vendors`, {
	// 			headers: { Authorization: `Bearer ${token}` },
	// 		});
	// 		setVendors(res.data);
	// 	} catch (err) {
	// 		console.error("Failed to fetch vendors", err);
	// 		toast.error("Failed to fetch vendors");
	// 	}
	// };

	const handleAddVendor = async () => {
		if (!vendorName.trim()) {
			toast.error("Vendor name cannot be empty");
			return;
		}

		setLoading(true);
		try {
			await axios.post(
				`${import.meta.env.VITE_API_URL}/vendors`,
				{ name: vendorName },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			toast.success("Vendor added successfully");
			setVendorName("");
			// await fetchVendors();
		} catch (err) {
			console.error(err);
			toast.error("Failed to add vendor");
		} finally {
			setLoading(false);
		}
	};

	// useEffect(() => {
	// 	fetchVendors();
	// }, []);

	return (
		<section className="bg-settings/[40%] shadow-profile-info rounded-tr-[15px] px-6 py-8">
			<h2 className="text-[24px] sm:text-[32px] font-header mb-6 text-gray-800">
				Add Vendor
			</h2>
			<div className="flex gap-4 flex-col sm:flex-row">
				<input
					type="text"
					placeholder="Vendor Name"
					value={vendorName}
					onChange={(e) => setVendorName(e.target.value)}
					className="flex-grow rounded-[10px] border border-gray-200 focus:caret-primary-300 focus:border-primary-300 px-4 py-4 text-[14px] font-light text-black appearance-none outline-none"
				/>
				<button
					onClick={handleAddVendor}
					className="bg-primary-button-100 text-white px-6 py-2 rounded-[5px] text-[16px] flex items-center justify-center min-w-[140px]"
					disabled={loading}
				>
					{loading ? <LoaderSpinnerSmall /> : "Add Vendor"}
				</button>
			</div>
		</section>
	);
};

export default AddVendorForm;
