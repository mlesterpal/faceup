import type { ReactNode } from "react";

export type FriendRequest = {
	id: string;
	userId: number;
	friendshipId?: number;
	name: string;
	avatarUrl?: string | null;
	mutualFriendsCount?: number;
};

export type FriendsNavId =
	| "home"
	| "requests"
	| "outgoing"
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
