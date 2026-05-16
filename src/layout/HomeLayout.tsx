import { Box, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import PostForm from "@/components/PostForm";
import PostCard from "@/components/PostCard";
import LeftHome from "@/components/LeftHome";
import { useGetPosts } from "@/hooks/useCreatePost";
import { CURRENT_USER_ID } from "@/constants/currentUser";

const HomeLayout = () => {
	const userId = CURRENT_USER_ID;
	const { data, isLoading, isError } = useGetPosts(userId);
	const userPosts = data ?? [];

	return (
		<Box>
			<Navbar />
			<Box>
				<Grid templateColumns="1fr 2fr 1fr" pt={5} bgColor="#F2F4F7">
					<GridItem>
						<LeftHome />
					</GridItem>
					<GridItem
						px={24}
						overflowY="auto"
						h="100vh"
						css={{
							"&::-webkit-scrollbar": {
								display: "none",
							},
							"-ms-overflow-style": "none",
							"scrollbar-width": "none",
						}}
					>
						<PostForm />
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
					</GridItem>
					<GridItem>as</GridItem>
				</Grid>
			</Box>
		</Box>
	);
};

export default HomeLayout;
