export interface FileItem {
	id: string;
	name: string;
	type: string;
	size: number;
	url: string;
	path: string;
	sharedAt: string;
	sharedById: string;
	vendorId: string;
	sharedBy: string;
	sharedOn: string;
	vendor: {
		id: string;
		name: string;
	};
}

export interface FileAuthor {
	id: string;
	fullName: string;
}

export interface FileVendor {
	id: string;
	name: string;
}

export interface FileDTO {
	id: string;
	name: string;
	type: string;
	size: number;
	url: string;
	path: string;
	sharedAt: string;
	sharedById: string;
	vendorId: string;
	sharedBy: FileAuthor;
	vendor: FileVendor;
}

export interface GetFilesResponseDTO {
	files: FileDTO[];
	currentPage: number;
	totalFiles: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
	nextPage: number | null;
	prevPage: number | null;
}
