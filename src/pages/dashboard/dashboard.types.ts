export interface GroupSummary {
	id: string;
	name: string;
	memberCount: number;
}

export interface Session {
	id: string;
	title: string;
	date: string; // ISO
	time: string; // e.g. “11:00 AM”
	joinable: boolean;
}

export interface AgendaItem {
	id: string;
	category: "Design" | "AI" | "Cloud";
	title: string;
	datetime: string; // ISO
}

export interface Contribution {
	id: string;
	icon: "file" | "image" | "reply";
	text: string;
	at: string;
}
