import type { FriendshipStatus } from "@/entities/FriendshipStatus";
import type { FriendRequestItem } from "@/entities/FriendRequestItem";
import type { FriendUser } from "@/entities/FriendUser";

export const getFriendshipStatus = (
	targetUserId: number,
	outgoing: FriendRequestItem[],
	friends: FriendUser[],
): FriendshipStatus => {
	if (friends.some((f) => f.userId === targetUserId)) return "friends";
	if (outgoing.some((r) => r.userId === targetUserId)) return "pending_outgoing";
	return "none";
};

export const getOutgoingFriendshipId = (
	targetUserId: number,
	outgoing: FriendRequestItem[],
): number | undefined =>
	outgoing.find((r) => r.userId === targetUserId)?.friendshipId;
