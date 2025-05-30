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
