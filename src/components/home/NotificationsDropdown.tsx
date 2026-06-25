import { Box, Button, Circle, Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import type { NotificationItem } from "./notifications.mock";

type NotificationsDropdownProps = {
	notifications: NotificationItem[];
};

const NotificationsDropdown = ({ notifications }: NotificationsDropdownProps) => {
	const [filter, setFilter] = useState<"all" | "unread">("all");

	const visibleNotifications = useMemo(() => {
		if (filter === "unread") {
			return notifications.filter((item) => item.isUnread);
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
				{visibleNotifications.length === 0 && (
					<Text px={4} py={5} color="#6F7175" fontSize="14px">
						No notifications in this filter.
					</Text>
				)}

				{visibleNotifications.map((item) => (
					<Flex
						key={item.id}
						align="flex-start"
						gap={3}
						px={4}
						py={3}
						bg={item.isUnread ? "blue.50" : "white"}
						_hover={{ bg: item.isUnread ? "blue.100" : "gray.50" }}
					>
						<Circle size="10" bg="gray.200" overflow="hidden" flexShrink={0}>
							{item.avatarUrl ? (
								<img
									src={item.avatarUrl}
									alt="notification avatar"
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
								{item.timestamp}
							</Text>
						</VStack>

						{item.isUnread && (
							<Circle size="2" bg="blue.500" mt={2} flexShrink={0} />
						)}
					</Flex>
				))}
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
