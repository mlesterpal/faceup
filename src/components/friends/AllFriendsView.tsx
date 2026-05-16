import { SimpleGrid, Text } from "@chakra-ui/react";
import FriendUserCard from "@/components/friends/FriendUserCard";
import FriendsListState from "@/components/friends/FriendsListState";
import FriendsMainContent from "@/components/friends/FriendsMainContent";
import { useFriends } from "@/hooks/useFriends";
import { mapFriendUserToCard } from "@/utils/friendMappers";

const AllFriendsView = () => {
	const { data, isLoading, isError } = useFriends();
	const friends = data ?? [];

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
					{friends.map((friend) => (
						<FriendUserCard
							key={friend.userId}
							user={mapFriendUserToCard(friend)}
							status="friends"
						/>
					))}
				</SimpleGrid>
			</FriendsListState>
		</FriendsMainContent>
	);
};

export default AllFriendsView;
