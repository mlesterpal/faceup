import { Button, VStack } from "@chakra-ui/react";
import type { FriendshipStatus } from "@/entities/FriendshipStatus";
import {
	useAcceptFriendRequest,
	useCancelFriendRequest,
	useRejectFriendRequest,
	useSendFriendRequest,
	useUnfriend,
	getErrorMessage,
} from "@/hooks/useFriends";

type FriendshipActionButtonsProps = {
	status: FriendshipStatus;
	otherUserId: number;
	friendshipId?: number;
	size?: "sm" | "md";
};

const FriendshipActionButtons = ({
	status,
	otherUserId,
	friendshipId,
	size = "sm",
}: FriendshipActionButtonsProps) => {
	const sendRequest = useSendFriendRequest();
	const cancelRequest = useCancelFriendRequest();
	const acceptRequest = useAcceptFriendRequest();
	const rejectRequest = useRejectFriendRequest();
	const unfriendMutation = useUnfriend();

	const isPending =
		sendRequest.isPending ||
		cancelRequest.isPending ||
		acceptRequest.isPending ||
		rejectRequest.isPending ||
		unfriendMutation.isPending;

	const handleError = (error: unknown) => {
		window.alert(getErrorMessage(error));
	};

	if (status === "friends") {
		return (
			<Button
				w="full"
				bg="gray.100"
				color="#080809"
				fontWeight="bold"
				rounded="md"
				_hover={{ bg: "gray.200" }}
				size={size}
				loading={unfriendMutation.isPending}
				disabled={isPending}
				onClick={() =>
					unfriendMutation.mutate(otherUserId, { onError: handleError })
				}
			>
				Unfriend
			</Button>
		);
	}

	if (status === "pending_outgoing" && friendshipId != null) {
		return (
			<Button
				w="full"
				bg="gray.100"
				color="#080809"
				fontWeight="bold"
				rounded="md"
				_hover={{ bg: "gray.200" }}
				size={size}
				loading={cancelRequest.isPending}
				disabled={isPending}
				onClick={() =>
					cancelRequest.mutate(friendshipId, { onError: handleError })
				}
			>
				Cancel Request
			</Button>
		);
	}

	if (status === "pending_incoming" && friendshipId != null) {
		return (
			<VStack gap={2} w="full">
				<Button
					w="full"
					bg="blue.600"
					color="white"
					fontWeight="bold"
					rounded="md"
					_hover={{ bg: "blue.700" }}
					size={size}
					loading={acceptRequest.isPending}
					disabled={isPending}
					onClick={() =>
						acceptRequest.mutate(friendshipId, { onError: handleError })
					}
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
					size={size}
					loading={rejectRequest.isPending}
					disabled={isPending}
					onClick={() =>
						rejectRequest.mutate(friendshipId, { onError: handleError })
					}
				>
					Delete
				</Button>
			</VStack>
		);
	}

	return (
		<Button
			w="full"
			bg="blue.600"
			color="white"
			fontWeight="bold"
			rounded="md"
			_hover={{ bg: "blue.700" }}
			size={size}
			loading={sendRequest.isPending}
			disabled={isPending}
			onClick={() =>
				sendRequest.mutate(otherUserId, { onError: handleError })
			}
		>
			Add Friend
		</Button>
	);
};

export default FriendshipActionButtons;
