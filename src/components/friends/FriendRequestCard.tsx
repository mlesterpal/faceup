import {
	Box,
	Button,
	Circle,
	Flex,
	Icon,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import type { FriendRequest } from "@/components/friends/friends.types";

type FriendRequestCardProps = {
	request: FriendRequest;
	onConfirm?: (id: string) => void;
	onDelete?: (id: string) => void;
};

const MutualFriendsRow = ({ count }: { count: number }) => (
	<Flex align="center" gap={2} minW={0}>
		<Flex>
			{[0, 1, 2].map((i) => (
				<Circle
					key={i}
					size="4"
					bg="gray.300"
					borderWidth="2px"
					borderColor="white"
					ml={i > 0 ? -2 : 0}
					overflow="hidden"
				>
					<Icon as={FaUserCircle} boxSize="4" color="gray.500" />
				</Circle>
			))}
		</Flex>
		<Text fontSize="sm" color="#6F7175" truncate>
			{count} mutual {count === 1 ? "friend" : "friends"}
		</Text>
	</Flex>
);

const FriendRequestCard = ({
	request,
	onConfirm,
	onDelete,
}: FriendRequestCardProps) => (
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
			<Text fontWeight="bold" color="#080809" truncate mb={2}>
				{request.name}
			</Text>

			<Box mb={3}>
				<MutualFriendsRow count={request.mutualFriendsCount} />
			</Box>

			<VStack gap={2} w="full">
				<Button
					w="full"
					bg="blue.600"
					color="white"
					fontWeight="bold"
					rounded="md"
					_hover={{ bg: "blue.700" }}
					size="sm"
					onClick={() => onConfirm?.(request.id)}
				>
					Confirm
				</Button>
				<Button
					w="full"
					bg="gray.100"
					color="#080809"
					fontWeight="bold"
					rounded="md"
					_hover={{ bg: "gray.200" }}
					size="sm"
					onClick={() => onDelete?.(request.id)}
				>
					Delete
				</Button>
			</VStack>
		</Box>
	</Box>
);

export default FriendRequestCard;
