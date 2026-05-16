import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

type FriendsMainContentProps = {
	children: ReactNode;
};

const FriendsMainContent = ({ children }: FriendsMainContentProps) => (
	<Box
		as="main"
		flex="1"
		bg="#f0f2f5"
		overflowY="auto"
		h="calc(100vh - 56px)"
		p={{ base: 4, md: 6 }}
	>
		{children}
	</Box>
);

export default FriendsMainContent;
