import { Files as FilesIcon } from "lucide-react";

export default function ChatFiles() {
	//const { data, isLoading } = useGetFiles(conversationId);
	return (
		<div className="flex h-[70vh] items-center justify-center text-border">
			<FilesIcon size={100} className="mr-6" />
			<h1 className="text-3xl font-semibold">Files</h1>
		</div>
	);
}
