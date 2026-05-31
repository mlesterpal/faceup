import type { FriendRequestItem } from "../../entities/response/FriendRequestItem";
import type { FriendSuggestion } from "../../entities/response/FriendSuggestion";
import type { FriendUser } from "../../entities/response/FriendUser";
import type { FriendshipStatus } from "../../entities/FriendshipStatus";
import { mapFriendRequestItemToCard, mapFriendSuggestionToCard, mapFriendUserToCard } from "../../utils/friendMappers";
import { getFriendshipStatus, getOutgoingFriendshipId } from "../../utils/getFriendshipStatus";

export const HOME_PREVIEW_LIMIT = 8;

export const getVisibleFriendRequests = (
	requests: FriendRequestItem[],
	preview: boolean,
) => {
	return preview ? requests.slice(0, HOME_PREVIEW_LIMIT) : requests;
};

export const shouldShowFriendRequestPreviewLink = (
	requestsCount: number,
	preview: boolean,
) => {
	return preview && requestsCount > HOME_PREVIEW_LIMIT;
};

export const getSuggestionsState = ({
	suggestionsLoading,
	outgoingLoading,
	friendsLoading,
	suggestionsError,
	outgoingError,
	friendsError,
}: {
	suggestionsLoading: boolean;
	outgoingLoading: boolean;
	friendsLoading: boolean;
	suggestionsError: boolean;
	outgoingError: boolean;
	friendsError: boolean;
}) => {
	return {
		isLoading: suggestionsLoading || outgoingLoading || friendsLoading,
		isError: suggestionsError || outgoingError || friendsError,
	};
};

export type SuggestionCardItem = {
	id: number;
	status: FriendshipStatus;
	user: ReturnType<typeof mapFriendSuggestionToCard> & {
		friendshipId?: number;
	};
};

export const buildSuggestionCards = (
	suggestions: FriendSuggestion[],
	outgoing: FriendRequestItem[],
	friends: FriendUser[],
): SuggestionCardItem[] => {
	return suggestions.map((suggestion) => {
		const status = getFriendshipStatus(suggestion.userId, outgoing, friends);
		const outgoingFriendshipId = getOutgoingFriendshipId(
			suggestion.userId,
			outgoing,
		);
		return {
			id: suggestion.userId,
			status,
			user: {
				...mapFriendSuggestionToCard(suggestion),
				friendshipId: outgoingFriendshipId,
			},
		};
	});
};

export const mapOutgoingRequestCards = (requests: FriendRequestItem[]) => {
	return requests.map((request) => ({
		id: request.friendshipId,
		user: mapFriendRequestItemToCard(request),
	}));
};

export const mapIncomingRequestCards = (requests: FriendRequestItem[]) => {
	return requests.map((request) => ({
		id: request.friendshipId,
		request: mapFriendRequestItemToCard(request),
	}));
};

export const mapAllFriendCards = (friends: FriendUser[]) => {
	return friends.map((friend) => ({
		id: friend.userId,
		user: mapFriendUserToCard(friend),
	}));
};

export const isAnyFriendActionPending = (pendingStates: boolean[]) => {
	return pendingStates.some(Boolean);
};

