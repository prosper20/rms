export interface FileItem {
	name: string;
	size: number;
	url: string;
}

export interface Author {
	id: string;
	fullName: string;
	profile_picture: string;
	role: "STUDENT" | "SUPERVISOR";
}

export type Message = {
	id: string;
	created_at: string;
	message: string;
	isEdited: boolean;
	files: FileItem[];
	author: Author;
};

export type SocketMessage = {
	recipientId: string;
	conversationId: string;
	message: Message;
};

export interface Participant {
	id: string;
	fullName: string;
	profile_picture: string;
}

export interface Conversation {
	id: string;
	title: string;
	groupId: string;
	participants: Participant[];
	lastMessageSent: {
		id: string;
		message: string;
		created_at: string;
	} | null;
	isRead: boolean;
}
