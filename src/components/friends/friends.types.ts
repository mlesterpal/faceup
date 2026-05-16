import type { ReactNode } from "react";

export type FriendRequest = {
	id: string;
	name: string;
	avatarUrl?: string | null;
	mutualFriendsCount: number;
};

export type FriendsNavId =
	| "home"
	| "requests"
	| "suggestions"
	| "all"
	| "birthdays"
	| "lists";

export type FriendsNavItem = {
	id: FriendsNavId;
	label: string;
	icon: ReactNode;
	showChevron?: boolean;
	to: string;
};
