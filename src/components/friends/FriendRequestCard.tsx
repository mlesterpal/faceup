import {
	Box,
	Flex,
	Icon,
	Image,
	Text,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import type { FriendRequest } from "@/components/friends/friends.types";
import FriendshipActionButtons from "@/components/friends/FriendshipActionButtons";

type FriendRequestCardProps = {
	request: FriendRequest;
};

const FriendRequestCard = ({ request }: FriendRequestCardProps) => (
	<Box
		bg="white"
		rounded="lg"
		borderWidth="1px"
		borderColor="gray.200"
		shadow="sm"
		overflow="hidden"
	>
		<Box aspectRatio={1} bg="gray.100" position="relative">
			{request.avatarUrl ? (
				<Image
					src={request.avatarUrl}
					alt={request.name}
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
			<Text fontWeight="bold" color="#080809" truncate mb={3}>
				{request.name}
			</Text>

			<FriendshipActionButtons
				status="pending_incoming"
				otherUserId={request.userId}
				friendshipId={request.friendshipId}
			/>
		</Box>
	</Box>
);

export default FriendRequestCard;
