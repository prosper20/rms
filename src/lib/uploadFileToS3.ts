import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader"; // Import hook to get auth token

const getFileExtension = (filename: string) =>
	filename.split(".").pop()?.toLowerCase() || "docx";

export const useUploadFileToS3 = () => {
	const authHeader = useAuthHeader();
	const token = authHeader?.split(" ")[1];

	const uploadFileToS3 = async (file: File) => {
		const apiUrl = import.meta.env.VITE_API_URL;

		if (!token) console.error("No auth token found");

		try {
			// Step 1: Get presigned URL with auth header
			let presigned;
			try {
				const response = await axios.post(
					`${apiUrl}/uploads/get-url`,
					{
						type: getFileExtension(file.name),
						filename: file.name,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				presigned = response.data;
				console.log("Presigned URL:", presigned);
			} catch (err) {
				console.error("Error getting presigned URL:", err);
				throw new Error("Could not get presigned URL");
			}

			// Step 2: Upload file to S3
			try {
				await axios.put(presigned.url, file, {
					headers: {
						"Content-Type": file.type,
					},
				});
				console.log("File uploaded to S3");
			} catch (err) {
				console.error("S3 upload error:", err);
				throw new Error("Failed to upload to S3");
			}

			// Step 3: Return clean info
			return {
				key: presigned.key,
				url: presigned.url.split("?")[0],
			};
		} catch (err) {
			console.error("uploadFileToS3 failed:", err);
			throw err;
		}
	};

	return uploadFileToS3;
};
