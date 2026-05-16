import type { FriendRequestItem } from "@/entities/FriendRequestItem";
import type { FriendSuggestion } from "@/entities/FriendSuggestion";
import type { FriendUser } from "@/entities/FriendUser";
import type { FriendRequest } from "@/components/friends/friends.types";
import { formatFullName } from "@/utils/formatFullName";
import { resolveImageUrl } from "@/utils/resolveImageUrl";

type FriendNameFields = {
	firstName: string;
	lastName: string;
};

const toCard = (
	userId: number,
	nameFields: FriendNameFields,
	profilePicture?: string | null,
	friendshipId?: number,
): FriendRequest => ({
	id: String(userId),
	userId,
	friendshipId,
	name: formatFullName(nameFields.firstName, nameFields.lastName),
	avatarUrl: resolveImageUrl(profilePicture),
});

export const mapFriendUserToCard = (user: FriendUser): FriendRequest =>
	toCard(user.userId, user, user.profilePicture);

export const mapFriendRequestItemToCard = (item: FriendRequestItem): FriendRequest =>
	toCard(item.userId, item, item.profilePicture, item.friendshipId);

export const mapFriendSuggestionToCard = (user: FriendSuggestion): FriendRequest =>
	toCard(user.userId, user, user.profilePicture);
