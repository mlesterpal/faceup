import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle, FaUserFriends, FaBookmark, FaStore } from "react-icons/fa";
import { BsMeta, BsBarChartFill } from "react-icons/bs";
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdGroups, MdEmojiEvents } from "react-icons/md";
import { IoIosTv } from "react-icons/io";
import { IoCardSharp } from "react-icons/io5";
import { CURRENT_USER_ID } from "../../constants/currentUser";
import { useGetUser } from "../../hooks/UserRepository";

const NAV_ITEMS: {
	label: string;
	icon: ReactNode;
	color?: string;
}[] = [
	{ label: "Meta AI", icon: <BsMeta />, color: "#254FF2" },
	{ label: "Friends", icon: <FaUserFriends />, color: "#5DCAC1" },
	{ label: "Memories", icon: <FaClockRotateLeft />, color: "#5192D6" },
	{ label: "Memories", icon: <FaBookmark />, color: "#8D5DE9" },
	{ label: "Groups", icon: <MdGroups />, color: "#1E96ED" },
	{ label: "Video", icon: <IoIosTv />, color: "#37B6BF" },
	{ label: "Market Place", icon: <FaStore />, color: "#1773E5" },
	{ label: "Feeds", icon: <IoCardSharp />, color: "#1D86DD" },
	{ label: "Events", icon: <MdEmojiEvents />, color: "#E4415E" },
	{ label: "Ads Manager", icon: <BsBarChartFill />, color: "#E4415E" },
];

const LeftHome = () => {
	const { data: currentUser, isLoading } = useGetUser(CURRENT_USER_ID);
	const currentUserName = `${currentUser?.firstName ?? ""} ${currentUser?.lastName ?? ""}`.trim();
	const currentUserLabel = isLoading
		? "Loading..."
		: currentUserName || "Profile";

	return (
		<Box>
			<NavLink
				to={`/profile/${CURRENT_USER_ID}`}
				style={{ textDecoration: "none", color: "inherit", display: "block" }}
			>
				<Flex
					align="center"
					columnGap={3}
					px="4"
					py="2"
					_hover={{ bg: "gray.200" }}
				>
					<IconButton
						fontSize="3xl"
						rounded="full"
						aria-label={currentUserLabel}
					>
						<FaUserCircle />
					</IconButton>
					<Text fontWeight="500">{currentUserLabel}</Text>
				</Flex>
			</NavLink>

			{NAV_ITEMS.map((item, index) => (
				<Flex
					key={`${item.label}-${index}`}
					align="center"
					columnGap={3}
					px="4"
					py="2"
					_hover={{ bg: "gray.200" }}
				>
					<IconButton
						fontSize="3xl"
						rounded="full"
						aria-label={item.label}
						color={item.color}
					>
						{item.icon}
					</IconButton>
					<Text fontWeight="500">{item.label}</Text>
				</Flex>
			))}
		</Box>
	);
};

export default LeftHome;
