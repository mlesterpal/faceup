import { Box, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import Navbar from "../components/home/Navbar";
import PostForm from "../components/home/PostForm";
import PostCard from "../components/home/PostCard";
import LeftHome from "../components/home/LeftHome";
import { useGetPosts } from "../hooks/PostRepository";
import { toHomeFeedPosts } from "../components/home/HomeWorker";

const HomePage = () => {
	const { data, isLoading, isError } = useGetPosts(null);
	const userPosts = toHomeFeedPosts(data);

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

export default HomePage;
