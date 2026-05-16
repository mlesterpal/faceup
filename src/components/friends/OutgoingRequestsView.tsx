import { SimpleGrid, Text } from "@chakra-ui/react";
import FriendUserCard from "@/components/friends/FriendUserCard";
import FriendsListState from "@/components/friends/FriendsListState";
import FriendsMainContent from "@/components/friends/FriendsMainContent";
import { useOutgoingFriendRequests } from "@/hooks/useFriends";
import { mapFriendRequestItemToCard } from "@/utils/friendMappers";

const OutgoingRequestsView = () => {
	const { data, isLoading, isError } = useOutgoingFriendRequests();
	const requests = data ?? [];

	return (
		<FriendsMainContent>
			<Text fontSize="xl" fontWeight="bold" color="#080809" mb={4}>
				Sent Requests
			</Text>

			<FriendsListState
				isLoading={isLoading}
				isError={isError}
				isEmpty={requests.length === 0}
				emptyMessage="No pending sent requests."
			>
				<SimpleGrid
					columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6, "2xl": 7 }}
					gap={4}
				>
					{requests.map((request) => (
						<FriendUserCard
							key={request.friendshipId}
							user={mapFriendRequestItemToCard(request)}
							status="pending_outgoing"
						/>
					))}
				</SimpleGrid>
			</FriendsListState>
		</FriendsMainContent>
	);
};

export default OutgoingRequestsView;
