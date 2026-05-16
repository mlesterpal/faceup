import { Box, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import {
	FaBirthdayCake,
	FaChevronRight,
	FaHome,
	FaList,
	FaUserFriends,
	FaUserPlus,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import type { FriendsNavItem } from "@/components/friends/friends.types";

const FRIENDS_NAV_ITEMS: FriendsNavItem[] = [
	{ id: "home", label: "Home", icon: <FaHome />, to: "/friends" },
	{
		id: "requests",
		label: "Friend requests",
		icon: <FaUserPlus />,
		showChevron: true,
		to: "/friends/requests",
	},
	{
		id: "outgoing",
		label: "Sent requests",
		icon: <FaUserPlus />,
		showChevron: true,
		to: "/friends/outgoing",
	},
	{
		id: "suggestions",
		label: "Suggestions",
		icon: <FaUserFriends />,
		showChevron: true,
		to: "/friends/suggestions",
	},
	{
		id: "all",
		label: "All friends",
		icon: <FaUserFriends />,
		showChevron: true,
		to: "/friends/all",
	},
	{
		id: "birthdays",
		label: "Birthdays",
		icon: <FaBirthdayCake />,
		to: "/friends/birthdays",
	},
	{
		id: "lists",
		label: "Custom lists",
		icon: <FaList />,
		showChevron: true,
		to: "/friends/lists",
	},
];

const FriendsSidebar = () => (
	<Box
		as="aside"
		bg="white"
		borderRightWidth="1px"
		borderColor="gray.200"
		flex="0 0 22%"
		maxW="280px"
		minW="220px"
		h="calc(100vh - 56px)"
		overflowY="auto"
		py={4}
		px={3}
	>
		<Flex align="center" justify="space-between" mb={4} px={1}>
			<Text fontSize="2xl" fontWeight="bold" color="#080809">
				Friends
			</Text>
			<IconButton
				variant="ghost"
				rounded="full"
				aria-label="Friends settings"
				size="sm"
				color="gray.600"
			>
				<FiSettings size={20} />
			</IconButton>
		</Flex>

		<Flex direction="column" gap={0.5}>
			{FRIENDS_NAV_ITEMS.map((item) => (
				<NavLink
					key={item.id}
					to={item.to}
					end={item.id === "home"}
					style={{ textDecoration: "none", color: "inherit" }}
				>
					{({ isActive }) => (
						<Flex
							align="center"
							gap={3}
							px={3}
							py={2.5}
							rounded="lg"
							cursor="pointer"
							bg={isActive ? "blue.50" : "transparent"}
							_hover={{ bg: isActive ? "blue.50" : "gray.100" }}
						>
							<Icon
								boxSize={5}
								color={isActive ? "blue.600" : "gray.600"}
							>
								{item.icon}
							</Icon>
							<Text
								fontWeight="500"
								fontSize="md"
								color={isActive ? "blue.600" : "#080809"}
								flex="1"
							>
								{item.label}
							</Text>
							{item.showChevron && (
								<Icon
									as={FaChevronRight}
									boxSize={3}
									color="gray.400"
									flexShrink={0}
								/>
							)}
						</Flex>
					)}
				</NavLink>
			))}
		</Flex>
	</Box>
);

export default FriendsSidebar;
