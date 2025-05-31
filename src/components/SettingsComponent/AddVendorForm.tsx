import React, { useState } from "react";
import axios from "axios";

const AddVendorForm: React.FC = () => {
	const [vendorName, setVendorName] = useState("");
	const [, setVendors] = useState<any[]>([]); // Optional if you want to keep track

	const fetchVendors = async () => {
		try {
			const res = await axios.get(import.meta.env.VITE_API_URL + "/vendors", {
				withCredentials: true,
			});
			setVendors(res.data);
		} catch (err) {
			console.error("Failed to fetch vendors", err);
		}
	};

	const handleAddVendor = async () => {
		if (!vendorName.trim()) {
			alert("Vendor name cannot be empty");
			return;
		}
		try {
			await axios.post(
				import.meta.env.VITE_API_URL + "/vendors",
				{ name: vendorName },
				{ withCredentials: true }
			);
			alert("Vendor added successfully");
			setVendorName("");
			await fetchVendors(); // Refresh vendors list after adding
		} catch (err) {
			console.error(err);
			alert("Failed to add vendor");
		}
	};

	// Optionally fetch vendors on mount if you want to show the list or use it
	React.useEffect(() => {
		fetchVendors();
	}, []);

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
					className="bg-primary-button-100 text-white px-6 py-2 rounded-[5px] text-[16px]"
				>
					Add Vendor
				</button>
			</div>
			{/* Optional: Display vendors if you want */}
			{/* <ul>
        {vendors.map((v) => (
          <li key={v.id}>{v.name}</li>
        ))}
      </ul> */}
		</section>
	);
};

export default AddVendorForm;
