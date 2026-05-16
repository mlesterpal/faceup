import { Box, Flex, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import FriendRequestCard from "@/components/friends/FriendRequestCard";
import type { FriendRequest } from "@/components/friends/friends.types";

type FriendRequestsSectionProps = {
	requests: FriendRequest[];
};

const FriendRequestsSection = ({ requests }: FriendRequestsSectionProps) => (
	<Box
		as="main"
		flex="1"
		bg="#f0f2f5"
		overflowY="auto"
		h="calc(100vh - 56px)"
		p={{ base: 4, md: 6 }}
	>
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
			{requests.map((request) => (
				<FriendRequestCard key={request.id} request={request} />
			))}
		</SimpleGrid>
	</Box>
);

export default FriendRequestsSection;
