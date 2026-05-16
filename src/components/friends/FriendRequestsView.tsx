import { Flex, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import FriendRequestCard from "@/components/friends/FriendRequestCard";
import FriendsListState from "@/components/friends/FriendsListState";
import FriendsMainContent from "@/components/friends/FriendsMainContent";
import { useIncomingFriendRequests } from "@/hooks/useFriends";
import { mapFriendRequestItemToCard } from "@/utils/friendMappers";

const HOME_PREVIEW_LIMIT = 8;

type FriendRequestsViewProps = {
	preview?: boolean;
};

const FriendRequestsView = ({ preview = false }: FriendRequestsViewProps) => {
	const { data, isLoading, isError } = useIncomingFriendRequests();
	const requests = data ?? [];
	const visible = preview ? requests.slice(0, HOME_PREVIEW_LIMIT) : requests;

	return (
		<FriendsMainContent>
			<Flex justify="space-between" align="center" mb={4}>
				<Text fontSize="xl" fontWeight="bold" color="#080809">
					Friend Requests
				</Text>
				{preview && requests.length > HOME_PREVIEW_LIMIT && (
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
				isEmpty={visible.length === 0}
				emptyMessage="No incoming friend requests."
			>
				<SimpleGrid
					columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6, "2xl": 7 }}
					gap={4}
				>
					{visible.map((request) => (
						<FriendRequestCard
							key={request.friendshipId}
							request={mapFriendRequestItemToCard(request)}
						/>
					))}
				</SimpleGrid>
			</FriendsListState>
		</FriendsMainContent>
	);
};

export default FriendRequestsView;
