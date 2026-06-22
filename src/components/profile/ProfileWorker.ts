import { PROFILE_TAB_LABELS, type ProfileTab } from "./profile.types";

export const MAX_PROFILE_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

export const getProfileDisplayName = (name: string | undefined) => {
	const value = name?.trim();
	return value ? value : "User name can't be found";
};

export const buildProfilePageName = (
	firstName: string | undefined,
	lastName: string | undefined,
) => {
	return [firstName, lastName].filter(Boolean).join(" ") || undefined;
};

export const resolveProfileUserId = (
	userIdParam: string | undefined,
	currentUserId: number,
) => {
	return Number(userIdParam) || currentUserId;
};

export const isOwnProfileUser = (profileUserId: number, currentUserId: number) => {
	return profileUserId === currentUserId;
};

export const buildProfilePlaceholderTabs = (
	tabs: readonly ProfileTab[] = ["friends", "photos", "reels"],
) => {
	return tabs.map((tab) => ({
		value: tab,
		label: PROFILE_TAB_LABELS[tab],
	}));
};

export const getProfileImageValidationError = (
	file: File,
): string | null => {
	if (!file.type.startsWith("image/")) {
		return "Please choose an image file.";
	}

	if (file.size > MAX_PROFILE_IMAGE_SIZE_BYTES) {
		return "Image must be 5 MB or smaller.";
	}

	return null;
};
