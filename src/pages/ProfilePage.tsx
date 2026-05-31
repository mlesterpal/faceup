import Navbar from "../components/home/Navbar";
import PostCard from "../components/home/PostCard";
import ProfileHeader, { ProfileTabList } from "../components/profile/ProfileHeader";
import ProfileTabPlaceholder from "../components/profile/ProfileTabPlaceholder";
import { CURRENT_USER_ID } from "../constants/currentUser";
import { useGetPosts } from "../hooks/PostRepository";
import { useGetUser, getProfilePictureErrorMessage, useUpdateProfilePicture } from "../hooks/UserRepository";
import { resolveImageUrl } from "../utils/resolveImageUrl";
import { Box, Spinner, Tabs, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { buildProfilePageName, buildProfilePlaceholderTabs, isOwnProfileUser, resolveProfileUserId } from "../components/profile/ProfileWorker";

const PLACEHOLDER_TABS = buildProfilePlaceholderTabs();

const ProfilePage = () => {
	const { userId: userIdParam } = useParams();
	const profileUserId = resolveProfileUserId(userIdParam, CURRENT_USER_ID);
	const isOwnProfile = isOwnProfileUser(profileUserId, CURRENT_USER_ID);

	const { data: userPosts = [], isLoading, isError } = useGetPosts(profileUserId);
	const { data: user, isLoading: isUserLoading } = useGetUser(profileUserId);
	const uploadPicture = useUpdateProfilePicture(profileUserId);
	const [uploadError, setUploadError] = useState<string | null>(null);

	const avatarUrl = useMemo(
		() => resolveImageUrl(user?.profilePicture),
		[user?.profilePicture],
	);

	const displayName = user
		? buildProfilePageName(user.firstName, user.lastName)
		: undefined;

	const handleProfilePictureSelected = (file: File) => {
		setUploadError(null);
		uploadPicture.mutate(file, {
			onError: (error) => {
				setUploadError(getProfilePictureErrorMessage(error));
			},
		});
	};

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
						{isUserLoading ? (
							<Box py={12} textAlign="center">
								<Spinner color="blue.500" />
							</Box>
						) : (
							<ProfileHeader
								name={displayName}
								avatarUrl={avatarUrl}
								readOnlyAvatar={!isOwnProfile}
								onProfilePictureSelected={
									isOwnProfile ? handleProfilePictureSelected : undefined
								}
								isUploadingAvatar={isOwnProfile && uploadPicture.isPending}
								onProfilePictureError={
									isOwnProfile ? setUploadError : undefined
								}
							/>
						)}
						{uploadError && (
							<Text px={6} pb={2} color="red.500" fontSize="sm">
								{uploadError}
							</Text>
						)}
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

export default ProfilePage;
