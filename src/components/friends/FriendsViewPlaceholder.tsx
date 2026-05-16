import { Flex, Text } from "@chakra-ui/react";
import FriendsMainContent from "@/components/friends/FriendsMainContent";

type FriendsViewPlaceholderProps = {
	message: string;
};

const FriendsViewPlaceholder = ({ message }: FriendsViewPlaceholderProps) => (
	<FriendsMainContent>
		<Flex flex="1" align="center" justify="center" minH="50vh">
			<Text fontSize="lg" color="#6F7175" textAlign="center" px={4}>
				{message}
			</Text>
		</Flex>
	</FriendsMainContent>
);

export default FriendsViewPlaceholder;
