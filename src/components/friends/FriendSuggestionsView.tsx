import { SimpleGrid, Text } from "@chakra-ui/react";
import FriendUserCard from "@/components/friends/FriendUserCard";
import FriendsListState from "@/components/friends/FriendsListState";
import FriendsMainContent from "@/components/friends/FriendsMainContent";
import {
	useFriendSuggestions,
	useFriends,
	useOutgoingFriendRequests,
} from "@/hooks/useFriends";
import { mapFriendSuggestionToCard } from "@/utils/friendMappers";
import {
	getFriendshipStatus,
	getOutgoingFriendshipId,
} from "@/utils/getFriendshipStatus";

const FriendSuggestionsView = () => {
	const suggestionsQuery = useFriendSuggestions();
	const outgoingQuery = useOutgoingFriendRequests();
	const friendsQuery = useFriends();

	const isLoading =
		suggestionsQuery.isLoading ||
		outgoingQuery.isLoading ||
		friendsQuery.isLoading;
	const isError =
		suggestionsQuery.isError ||
		outgoingQuery.isError ||
		friendsQuery.isError;

	const suggestions = suggestionsQuery.data ?? [];
	const outgoing = outgoingQuery.data ?? [];
	const friends = friendsQuery.data ?? [];

	return (
		<FriendsMainContent>
			<Text fontSize="xl" fontWeight="bold" color="#080809" mb={4}>
				People You May Know
			</Text>

			<FriendsListState
				isLoading={isLoading}
				isError={isError}
				isEmpty={suggestions.length === 0}
				emptyMessage="No suggestions right now."
			>
				<SimpleGrid
					columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6, "2xl": 7 }}
					gap={4}
				>
					{suggestions.map((user) => {
						const status = getFriendshipStatus(
							user.userId,
							outgoing,
							friends,
						);
						const card = mapFriendSuggestionToCard(user);
						const outgoingFriendshipId = getOutgoingFriendshipId(
							user.userId,
							outgoing,
						);

						return (
							<FriendUserCard
								key={user.userId}
								user={{
									...card,
									friendshipId: outgoingFriendshipId,
								}}
								status={status}
							/>
						);
					})}
				</SimpleGrid>
			</FriendsListState>
		</FriendsMainContent>
	);
};

export default FriendSuggestionsView;
