import { Flex, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import FriendRequestCard from "./FriendRequestCard";
import FriendsListState from "./FriendsListState";
import FriendsMainContent from "./FriendsMainContent";
import { useIncomingFriendRequests } from "../../hooks/FriendRepository";
import { getVisibleFriendRequests, mapIncomingRequestCards, shouldShowFriendRequestPreviewLink } from "./FriendsWorker";

type FriendRequestsViewProps = {
	preview?: boolean;
};

const FriendRequestsView = ({ preview = false }: FriendRequestsViewProps) => {
	const { data, isLoading, isError } = useIncomingFriendRequests();
	const requests = data ?? [];
	const visibleRequests = getVisibleFriendRequests(requests, preview);
	const incomingCards = mapIncomingRequestCards(visibleRequests);
	const showPreviewLink = shouldShowFriendRequestPreviewLink(
		requests.length,
		preview,
	);

	return (
		<FriendsMainContent>
			<Flex justify="space-between" align="center" mb={4}>
				<Text fontSize="xl" fontWeight="bold" color="#080809">
					Friend Requests
				</Text>
				{showPreviewLink && (
					<Link
						asChild
						color="blue.600"
						fontWeight="600"
						fontSize="md"
						_hover={{ textDecoration: "underline" }}
					>
						<RouterLink to="/friends/requests">See all</RouterLink>
					</Link>
				)}
			</Flex>

			<FriendsListState
				isLoading={isLoading}
				isError={isError}
				isEmpty={visibleRequests.length === 0}
				emptyMessage="No incoming friend requests."
			>
				<SimpleGrid
					columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6, "2xl": 7 }}
					gap={4}
				>
					{incomingCards.map(({ id, request }) => (
						<FriendRequestCard
							key={id}
							request={request}
						/>
					))}
				</SimpleGrid>
			</FriendsListState>
		</FriendsMainContent>
	);
};

export default FriendRequestsView;
