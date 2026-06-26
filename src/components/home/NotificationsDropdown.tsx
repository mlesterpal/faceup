import { Box, Button, Circle, Flex, HStack, Icon, IconButton, Menu, Text, VStack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import type { UserNotification } from "../../entities/response/UserNotification";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import { resolveImageUrl } from "../../utils/resolveImageUrl";

type NotificationsDropdownProps = {
	notifications: UserNotification[];
	isLoading?: boolean;
	onMarkAsRead?: (notificationId: number) => void;
};

const NotificationsDropdown = ({ notifications, isLoading = false, onMarkAsRead }: NotificationsDropdownProps) => {
	const [filter, setFilter] = useState<"all" | "unread">("all");
	const [hoveredNotificationId, setHoveredNotificationId] = useState<number | null>(null);
	const handleMarkAsRead = (notificationId: number) => {
		onMarkAsRead?.(notificationId);
	};

	const visibleNotifications = useMemo(() => {
		if (filter === "unread") {
			return notifications.filter((item) => !item.isRead);
		}
		return notifications;
	}, [filter, notifications]);

	return (
		<Box
			w="380px"
			maxH="480px"
			bg="white"
			rounded="xl"
			shadow="xl"
			borderWidth="1px"
			borderColor="gray.200"
			overflow="hidden"
		>
			<Box p={4} borderBottomWidth="1px" borderColor="gray.200">
				<Text fontSize="2xl" fontWeight="bold" color="#080809" mb={3}>
					Notifications
				</Text>
				<HStack gap={2}>
					<Button
						size="sm"
						rounded="full"
						bg={filter === "all" ? "blue.50" : "gray.100"}
						color={filter === "all" ? "blue.600" : "#080809"}
						onClick={() => setFilter("all")}
					>
						All
					</Button>
					<Button
						size="sm"
						rounded="full"
						bg={filter === "unread" ? "blue.50" : "gray.100"}
						color={filter === "unread" ? "blue.600" : "#080809"}
						onClick={() => setFilter("unread")}
					>
						Unread
					</Button>
				</HStack>
			</Box>

			<VStack align="stretch" gap={0} maxH="330px" overflowY="auto">
				{isLoading && (
					<Text px={4} py={5} color="#6F7175" fontSize="14px">
						Loading notifications...
					</Text>
				)}

				{!isLoading && visibleNotifications.length === 0 && (
					<Text px={4} py={5} color="#6F7175" fontSize="14px">
						No notifications in this filter.
					</Text>
				)}

				{!isLoading && visibleNotifications.map((item) => {
					const avatarUrl = resolveImageUrl(item.actorProfilePicture);
					const timeAgo = formatTimeAgo(item.createdAt);

					return (
						<Flex
							key={item.notificationId}
							align="flex-start"
							gap={3}
							px={4}
							py={3}
							bg={item.isRead ? "white" : "blue.50"}
							_hover={{ bg: item.isRead ? "gray.50" : "blue.100" }}
							onMouseEnter={() => setHoveredNotificationId(item.notificationId)}
							onMouseLeave={() => setHoveredNotificationId((current) =>
								current === item.notificationId ? null : current,
							)}
						>
							<Circle size="10" bg="gray.200" overflow="hidden" flexShrink={0}>
								{avatarUrl ? (
									<img
										src={avatarUrl}
										alt={item.actorName}
										style={{
											width: "100%",
											height: "100%",
											objectFit: "cover",
										}}
									/>
								) : (
									<Icon as={FaUserCircle} boxSize="10" color="gray.400" />
								)}
							</Circle>

							<VStack align="start" gap={0} flex="1" minW={0}>
								<Text color="#080809" fontSize="14px" lineHeight="1.35">
									{item.message}
								</Text>
								<Text color="#6F7175" fontSize="12px" fontWeight="500" mt={1}>
									{timeAgo}
								</Text>
							</VStack>

							<VStack align="center" gap={1} flexShrink={0}>
								<Menu.Root positioning={{ placement: "bottom-end" }}>
									<Menu.Trigger asChild>
										<IconButton
											variant="ghost"
											size="xs"
											rounded="full"
											aria-label="Notification actions"
											color="#6F7175"
											opacity={hoveredNotificationId === item.notificationId ? 1 : 0}
											pointerEvents={hoveredNotificationId === item.notificationId ? "auto" : "none"}
										>
											<HiDotsHorizontal />
										</IconButton>
									</Menu.Trigger>
									<Menu.Positioner>
										<Menu.Content minW="160px">
											<Menu.Item
												value={`mark-as-read-${item.notificationId}`}
												onClick={() => handleMarkAsRead(item.notificationId)}
											>
												Mark as Read
											</Menu.Item>
										</Menu.Content>
									</Menu.Positioner>
								</Menu.Root>

								{!item.isRead && (
									<Circle size="2" bg="blue.500" mt={2} flexShrink={0} />
								)}
							</VStack>
						</Flex>
					);
				})}
			</VStack>

			<Box borderTopWidth="1px" borderColor="gray.200" p={3}>
				<HStack justify="space-between">
					<Button size="sm" variant="ghost" color="blue.600">
						View all notifications
					</Button>
					<Button size="sm" variant="ghost" color="blue.600">
						Manage notifications
					</Button>
				</HStack>
			</Box>
		</Box>
	);
};

export default NotificationsDropdown;
