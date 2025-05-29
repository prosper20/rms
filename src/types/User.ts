export type User = {
	avatar: string;
	bio: string;
	country: string;
	dateOfBirth: string;
	email: string;
	firstName: string;
	followerCount: number;
	followingCount: number;
	gender: string;
	journalCount: number;
	language: string;
	lastName: string;
	links: string[];
	opportunityCount: number;
	phone: string;
	postCount: number;
	role: "USER" | "ADMIN"; // Assuming role can be one of these
	userId: string;
	username: string;
};
