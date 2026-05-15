import type { ReactNode } from "react";

export const PROFILE_TABS = [
	"all",
	"about",
	"friends",
	"photos",
	"reels",
] as const;

export type ProfileTab = (typeof PROFILE_TABS)[number];

export const PROFILE_TAB_LABELS: Record<ProfileTab, string> = {
	all: "All",
	about: "About",
	friends: "Friends",
	photos: "Photos",
	reels: "Reels",
};

export type ProfileDetail = {
	icon: ReactNode;
	label: string;
};

export type ProfileHeaderProps = {
	name?: string;
	friendCount?: number;
	details?: ProfileDetail[];
};

export const DEFAULT_PROFILE = {
	name: "Mark Lester Maranan",
	friendCount: 111,
} as const;
