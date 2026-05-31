import { SimpleGrid, Text } from "@chakra-ui/react";
import FriendUserCard from "./FriendUserCard";
import FriendsListState from "./FriendsListState";
import FriendsMainContent from "./FriendsMainContent";
import { useFriendSuggestions, useFriends, useOutgoingFriendRequests } from "../../hooks/FriendRepository";
import { buildSuggestionCards, getSuggestionsState } from "./FriendsWorker";

const FriendSuggestionsView = () => {
	const suggestionsQuery = useFriendSuggestions();
	const outgoingQuery = useOutgoingFriendRequests();
	const friendsQuery = useFriends();

	const { isLoading, isError } = getSuggestionsState({
		suggestionsLoading: suggestionsQuery.isLoading,
		outgoingLoading: outgoingQuery.isLoading,
		friendsLoading: friendsQuery.isLoading,
		suggestionsError: suggestionsQuery.isError,
		outgoingError: outgoingQuery.isError,
		friendsError: friendsQuery.isError,
	});

	const suggestions = suggestionsQuery.data ?? [];
	const outgoing = outgoingQuery.data ?? [];
	const friends = friendsQuery.data ?? [];
	const suggestionCards = buildSuggestionCards(suggestions, outgoing, friends);

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
					{suggestionCards.map((card) => (
						<FriendUserCard
							key={card.id}
							user={card.user}
							status={card.status}
						/>
					))}
				</SimpleGrid>
			</FriendsListState>
		</FriendsMainContent>
	);
};

export default FriendSuggestionsView;
