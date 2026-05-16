import {
	Box,
	Flex,
	Icon,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import type { FriendshipStatus } from "@/entities/FriendshipStatus";
import type { FriendRequest } from "@/components/friends/friends.types";
import FriendshipActionButtons from "@/components/friends/FriendshipActionButtons";

type FriendUserCardProps = {
	user: FriendRequest;
	status: FriendshipStatus;
	showMutualFriends?: boolean;
};

const MutualFriendsRow = ({ count }: { count: number }) => (
	<Flex align="center" gap={2} minW={0}>
		<Text fontSize="sm" color="#6F7175" truncate>
			{count} mutual {count === 1 ? "friend" : "friends"}
		</Text>
	</Flex>
);

const FriendUserCard = ({
	user,
	status,
	showMutualFriends = false,
}: FriendUserCardProps) => (
	<Box
		bg="white"
		rounded="lg"
		borderWidth="1px"
		borderColor="gray.200"
		shadow="sm"
		overflow="hidden"
	>
		<Box aspectRatio={1} bg="gray.100" position="relative">
			{user.avatarUrl ? (
				<Image
					src={user.avatarUrl}
					alt={user.name}
					w="full"
					h="full"
					objectFit="cover"
				/>
			) : (
				<Flex
					align="center"
					justify="center"
					w="full"
					h="full"
					position="absolute"
					inset={0}
				>
					<Icon as={FaUserCircle} boxSize="20" color="gray.400" />
				</Flex>
			)}
		</Box>

		<Box p={3}>
			<Text fontWeight="bold" color="#080809" truncate mb={2}>
				{user.name}
			</Text>

			{showMutualFriends && (user.mutualFriendsCount ?? 0) > 0 && (
				<Box mb={3}>
					<MutualFriendsRow count={user.mutualFriendsCount ?? 0} />
				</Box>
			)}

			<FriendshipActionButtons
				status={status}
				otherUserId={user.userId}
				friendshipId={user.friendshipId}
			/>
		</Box>
	</Box>
);

export default FriendUserCard;
