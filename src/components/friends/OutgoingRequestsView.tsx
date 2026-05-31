import { SimpleGrid, Text } from "@chakra-ui/react";
import FriendUserCard from "./FriendUserCard";
import FriendsListState from "./FriendsListState";
import FriendsMainContent from "./FriendsMainContent";
import { useOutgoingFriendRequests } from "../../hooks/FriendRepository";
import { mapOutgoingRequestCards } from "./FriendsWorker";

const OutgoingRequestsView = () => {
	const { data, isLoading, isError } = useOutgoingFriendRequests();
	const requests = data ?? [];
	const outgoingCards = mapOutgoingRequestCards(requests);

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
					{outgoingCards.map(({ id, user }) => (
						<FriendUserCard
							key={id}
							user={user}
							status="pending_outgoing"
						/>
					))}
				</SimpleGrid>
			</FriendsListState>
		</FriendsMainContent>
	);
};

export default OutgoingRequestsView;
