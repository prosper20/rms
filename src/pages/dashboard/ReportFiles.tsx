import { useEffect, useRef, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import ChatFilesSection from "../../components/ChatFilesSection";
import RotatingLinesSpinner from "../../components/Loaders/RotatingLinesSpinner";
import { useGetFilesInfinite } from "../../hooks/useFiles";
import { useDebounce } from "../../hooks/useDebounce";

const ReportFiles = ({ vendorSlug }: { vendorSlug: string }) => {
	const [searchParams] = useSearchParams();
	const searchedFile = searchParams.get("value") || "";

	// Debounce the search parameter to avoid excessive API calls
	const debouncedSearch = useDebounce(searchedFile, 300);

	const authHeader = useAuthHeader();
	const token = authHeader?.split(" ")[1];
	const loadMoreRef = useRef<HTMLDivElement>(null);

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		refetch,
	} = useGetFilesInfinite(vendorSlug, token!, debouncedSearch);

	// Flatten all pages into a single array of files
	const files = useMemo(() => {
		return data?.pages.flatMap((page) => page.files) || [];
	}, [data]);

	// Intersection Observer for infinite scroll
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			},
			{ threshold: 0.1 }
		);

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}

		return () => {
			if (loadMoreRef.current) {
				observer.unobserve(loadMoreRef.current);
			}
		};
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	if (isLoading) {
		return (
			<div className="mx-4 md:mx-8 lg:mx-[3%] md:py-6 lg:pt-[21px] xl:pb-[10px]">
				<div className="w-full flex justify-center overflow-y-auto h-full">
					<RotatingLinesSpinner strokeColor="gray" width="24" />
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="mx-4 md:mx-8 lg:mx-[3%] md:py-6 lg:pt-[21px] xl:pb-[10px]">
				<div className="w-full flex justify-center overflow-y-auto h-full">
					<div className="text-center">
						<p className="text-red-500 mb-4">Error loading files...</p>
						<button
							onClick={() => refetch()}
							className="px-4 py-2 bg-[#0b7570] hover:bg-[#0e8c86] text-white rounded"
						>
							Retry
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="mx-4 md:mx-8 lg:mx-[3%] md:py-6 lg:pt-[21px] xl:pb-[10px]">
			<div className="w-full flex justify-center overflow-y-auto h-full">
				<div className="w-full">
					<ChatFilesSection fileData={files} />

					{/* Load More Placeholder */}
					<div ref={loadMoreRef} className="flex justify-center py-4">
						{isFetchingNextPage && (
							<RotatingLinesSpinner strokeColor="gray" width="24" />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReportFiles;

// import { useQuery } from "@tanstack/react-query";
// import { useSearchParams } from "react-router-dom";
// import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
// import ChatFilesSection from "../../components/ChatFilesSection";
// import { getFileExtension } from "../../utils/utilities";
// import RotatingLinesSpinner from "../../components/Loaders/RotatingLinesSpinner";

// const fetchFiles = async (vendorSlug: string, token: string) => {
// 	const res = await fetch(
// 		`${import.meta.env.VITE_API_URL}/files?vendor=${vendorSlug}`,
// 		{
// 			headers: { Authorization: `Bearer ${token}` },
// 		}
// 	);
// 	const data = await res.json();

// 	return data.map((file: any) => ({
// 		id: file.id,
// 		name: file.name,
// 		url: `${import.meta.env.VITE_S3_DOMAIN}/${file.url}`,
// 		sharedBy: file.sharedBy.fullName,
// 		sharedOn: new Date(file.sharedAt).toLocaleDateString("en-US", {
// 			month: "short",
// 			day: "numeric",
// 			year: "numeric",
// 		}),
// 		vendor: {
// 			id: file.vendor?.id || "",
// 			name: file.vendor?.name || "Unknown Vendor",
// 		},
// 		type: getFileExtension(file.type),
// 	}));
// };

// const ReportFiles = ({ vendorSlug }: { vendorSlug: string }) => {
// const [searchParams] = useSearchParams();
// const searchedFile = searchParams.get("value");
// 	const authHeader = useAuthHeader();
// 	const token = authHeader?.split(" ")[1];

// 	const { data: files = [], isLoading } = useQuery({
// 		queryKey: ["files", vendorSlug],
// 		queryFn: () => fetchFiles(vendorSlug, token!),
// 		enabled: !!token && !!vendorSlug,
// 	});

// 	const filteredFiles = searchedFile
// 		? files.filter((file: { name: string }) =>
// 				file.name.toLowerCase().includes(searchedFile.toLowerCase())
// 			)
// 		: files;

// 	return (
// 		<div className=" mx-4 md:mx-8 lg:mx-[3%] md:py-6 lg:pt-[21px] xl:pb-[10px]">
// 			<div className="w-full flex justify-center overflow-y-auto h-full">
// 				{isLoading ? (
// 					<RotatingLinesSpinner strokeColor="gray" width="24" />
// 				) : (
// 					<ChatFilesSection fileData={filteredFiles} />
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default ReportFiles;
