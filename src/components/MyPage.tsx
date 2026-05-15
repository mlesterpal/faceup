import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { useGetPosts } from "@/hooks/useCreatePost";
import { Box, Spinner, Text } from "@chakra-ui/react";

const MyPage = () => {
	const userId = 1;
	const { data, isLoading, isError } = useGetPosts(userId);
	const userPosts = data ?? [];

	return (
		<Box>
			<Navbar />
			<Box mx="auto" maxW="600px" px={4}>
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
				{!isLoading && !isError && <PostCard userPosts={userPosts} />}
			</Box>
		</Box>
	);
};

export default MyPage;
