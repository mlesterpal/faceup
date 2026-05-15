import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import ProfileHeader, {
	ProfileTabList,
} from "@/components/profile/ProfileHeader";
import ProfileTabPlaceholder from "@/components/profile/ProfileTabPlaceholder";
import {
	PROFILE_TAB_LABELS,
	type ProfileTab,
} from "@/components/profile/profile.types";
import { useGetPosts } from "@/hooks/useCreatePost";
import { Box, Spinner, Tabs, Text } from "@chakra-ui/react";

const PLACEHOLDER_TABS = (
	["about", "friends", "photos", "reels"] as const satisfies readonly ProfileTab[]
).map((tab) => ({
	value: tab,
	label: PROFILE_TAB_LABELS[tab],
}));

const MyPage = () => {
	const userId = 1;
	const { data: userPosts = [], isLoading, isError } = useGetPosts(userId);

	return (
		<Box bg="#F2F4F7" minH="100vh">
			<Navbar />
			<Box mx="auto" maxW="940px" px={{ base: 4, md: 0 }} py={4}>
				<Tabs.Root defaultValue="all" variant="line" colorPalette="blue">
					<Box
						bg="white"
						rounded="lg"
						borderWidth="1px"
						borderColor="gray.200"
						overflow="hidden"
					>
						<ProfileHeader />
						<ProfileTabList />
					</Box>

					<Box mt={4}>
						<Tabs.Content value="all">
							{isLoading && (
								<Box py={8} textAlign="center">
									<Spinner color="blue.500" />
								</Box>
							)}
							{isError && (
								<Text py={4} color="red.500" textAlign="center">
									Failed to load posts.
								</Text>
							)}
							{!isLoading && !isError && (
								<PostCard userPosts={userPosts} />
							)}
						</Tabs.Content>

						{PLACEHOLDER_TABS.map((tab) => (
							<Tabs.Content key={tab.value} value={tab.value}>
								<ProfileTabPlaceholder label={tab.label} />
							</Tabs.Content>
						))}
					</Box>
				</Tabs.Root>
			</Box>
		</Box>
	);
};

export default MyPage;
