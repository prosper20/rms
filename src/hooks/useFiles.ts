import { useInfiniteQuery } from "@tanstack/react-query";
import { getFileExtension } from "../utils/utilities";
import { GetFilesResponseDTO, FileItem } from "../types/File";

const fetchFilesInfinite = async (
	vendorSlug: string,
	token: string,
	limit: number = 10,
	page: number = 1,
	search: string = ""
): Promise<{
	files: FileItem[];
	hasNextPage: boolean;
	nextPage: number | null;
}> => {
	const searchParams = new URLSearchParams({
		vendor: vendorSlug,
		page: page.toString(),
		limit: limit.toString(),
	});

	if (search && search.trim() !== "") {
		searchParams.set("search", search.trim());
	}

	const res = await fetch(
		`${import.meta.env.VITE_API_URL}/files?${searchParams}`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);

	if (!res.ok) {
		throw new Error("Failed to fetch files");
	}

	const data: GetFilesResponseDTO = await res.json();

	const transformedFiles = data.files.map((file) => ({
		id: file.id,
		name: file.name,
		size: file.size,
		path: file.path,
		url: `${import.meta.env.VITE_S3_DOMAIN}/${file.url}`,
		vendorId: file.vendorId,
		sharedAt: file.sharedAt,
		sharedById: file.sharedById,
		sharedBy: file.sharedBy.fullName,
		sharedOn: new Date(file.sharedAt).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		}),
		vendor: {
			id: file.vendor?.id || "",
			name: file.vendor?.name || "Unknown Vendor",
		},
		type: getFileExtension(file.type),
	}));

	return {
		files: transformedFiles,
		hasNextPage: data.hasNextPage,
		nextPage: data.nextPage,
	};
};

export const useGetFilesInfinite = (
	vendorSlug: string,
	token: string,
	search: string = "",
	limit: number = 10
) => {
	const normalizedSearch = search?.trim() || "";

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		error,
		refetch,
	} = useInfiniteQuery({
		// queryKey: ["files", vendorSlug, search],
		queryKey: ["files", vendorSlug, normalizedSearch],
		queryFn: ({ pageParam = 1 }) =>
			fetchFilesInfinite(
				vendorSlug,
				token,
				limit,
				pageParam as number,
				normalizedSearch
			),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPage,
		enabled: !!token && !!vendorSlug,
		staleTime: 5 * 60 * 1000,
	});

	return {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		error,
		refetch,
	};
};
