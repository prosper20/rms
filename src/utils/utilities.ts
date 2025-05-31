import { format } from "date-fns";
import { Message } from "../types/Message";
import { FileItem } from "../types/File";

const colors = ["#C5BD1B", "#B28B50", "#9747FF", "#E43A6E"];

export function getColorFromInitials(initials: string) {
	if (!initials) return colors[0];

	const firstChar = initials[0].toUpperCase();
	const charCode = firstChar.charCodeAt(0);
	const colorIndex = charCode % colors.length;
	return colors[colorIndex];
}

const tagColors = [
	"bg-active-calendar",
	"bg-primary-button-green",
	"bg-primary-button-yellow",
];

export function getTagColorFromName(name: string) {
	if (!name) return tagColors[0];

	const firstChar = name[0].toUpperCase();
	const charCode = firstChar.charCodeAt(0);
	const colorIndex = charCode % tagColors.length;
	return tagColors[colorIndex];
}

const tagIcons = ["notes.svg", "folder.svg", "chat.svg"];

export function getIconFromTag(tag: string) {
	if (!tag) return tagIcons[0];

	const firstChar = tag[0].toUpperCase();
	const charCode = firstChar.charCodeAt(0);
	const iconIndex = charCode % tagIcons.length;
	return tagIcons[iconIndex];
}

export function formatText(role: string) {
	return role.charAt(0).toUpperCase() + role.substring(1).toLowerCase();
}

export const groupMessagesByDate = (messages: Message[]) => {
	const groups: { date: string; items: Message[] }[] = [];

	// ensure chronological ascending (oldest → newest)
	const sorted = [...messages].sort(
		(a, b) =>
			new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
	);

	sorted.forEach((msg) => {
		const label = format(new Date(msg.created_at), "EEEE, MMMM d");
		const bucket = groups.find((g) => g.date === label);
		if (bucket) {
			bucket.items.push(msg);
		} else {
			groups.push({ date: label, items: [msg] });
		}
	});

	return groups;
};

export const getIconFromType = (type: string): string => {
	const lower = type.toLowerCase();
	console.log("the extension: ", lower);

	if (lower.includes("pdf")) return "/file-icons/PDF.svg";
	if (lower.includes("docx")) return "/file-icons/DOCX.svg";
	if (lower.includes("doc")) return "/file-icons/DOC.svg";
	if (lower.includes("word")) return "/file-icons/DOCX.svg";
	if (lower.includes("excel") || lower.includes("sheet"))
		return "/file-icons/XLS.svg";
	if (lower.includes("powerpoint") || lower.includes("ppt"))
		return "/file-icons/PPT.svg";
	if (lower.includes("csv")) return "/file-icons/CSV.svg";
	if (lower.includes("png")) return "/file-icons/PNG.svg";
	if (lower.includes("svg")) return "/file-icons/SVG.svg";
	if (lower.includes("jpg") || lower.includes("jpeg"))
		return "/file-icons/JPG.svg";

	// default generic file icon
	return "/icons/file.svg";
};

export const getFileExtension = (mime: string): FileItem["type"] => {
	if (mime.includes("spreadsheetml")) return "xlsx";
	if (mime.includes("csv")) return "csv";
	if (mime.includes("wordprocessingml")) return "docx";
	if (mime.includes("pdf")) return "pdf";
	if (mime.includes("presentationml")) return "pptx";
	return "pdf";
};
