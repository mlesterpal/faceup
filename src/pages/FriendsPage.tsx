import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FriendsSidebar from "@/components/friends/FriendsSidebar";

const FriendsPage = () => (
	<Box minH="100vh" bg="#f0f2f5">
		<Navbar />
		<Flex align="stretch" maxW="100vw">
			<FriendsSidebar />
			<Outlet />
		</Flex>
	</Box>
);

export default FriendsPage;
