import { SimpleGrid, Text } from "@chakra-ui/react";
import FriendUserCard from "./FriendUserCard";
import FriendsListState from "./FriendsListState";
import FriendsMainContent from "./FriendsMainContent";
import { useFriends } from "../../hooks/FriendRepository";
import { mapAllFriendCards } from "./FriendsWorker";

const AllFriendsView = () => {
	const { data, isLoading, isError } = useFriends();
	const friends = data ?? [];
	const friendCards = mapAllFriendCards(friends);

	return (
		<FriendsMainContent>
			<Text fontSize="xl" fontWeight="bold" color="#080809" mb={4}>
				All Friends
			</Text>

			<FriendsListState
				isLoading={isLoading}
				isError={isError}
				isEmpty={friends.length === 0}
				emptyMessage="You have no friends yet."
			>
				<SimpleGrid
					columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6, "2xl": 7 }}
					gap={4}
				>
					{friendCards.map(({ id, user }) => (
						<FriendUserCard
							key={id}
							user={user}
							status="friends"
						/>
					))}
				</SimpleGrid>
			</FriendsListState>
		</FriendsMainContent>
	);
};

export default AllFriendsView;
