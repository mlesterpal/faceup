import { Flex, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import FriendRequestCard from "@/components/friends/FriendRequestCard";
import FriendsMainContent from "@/components/friends/FriendsMainContent";
import { MOCK_FRIEND_REQUESTS } from "@/components/friends/friends.mock";

const FriendRequestsView = () => (
	<FriendsMainContent>
		<Flex justify="space-between" align="center" mb={4}>
			<Text fontSize="xl" fontWeight="bold" color="#080809">
				Friend Requests
			</Text>
			<Link
				asChild
				color="blue.600"
				fontWeight="600"
				fontSize="md"
				_hover={{ textDecoration: "underline" }}
			>
				<RouterLink to="/friends/requests">See all</RouterLink>
			</Link>
		</Flex>

		<SimpleGrid
			columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6, "2xl": 7 }}
			gap={4}
		>
			{MOCK_FRIEND_REQUESTS.map((request) => (
				<FriendRequestCard key={request.id} request={request} />
			))}
		</SimpleGrid>
	</FriendsMainContent>
);

export default FriendRequestsView;
