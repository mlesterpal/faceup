import { Box, Grid, GridItem } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import PostForm from "@/components/PostForm";   
import PostCard from "@/components/PostCard.tsx";
import LeftHome from "@/components/LeftHome";

const HomeLayout = () => {
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
							/* Hide scrollbar for Chrome, Safari and Opera */
							"&::-webkit-scrollbar": {
								display: "none",
							},
							/* Hide scrollbar for IE, Edge and Firefox */
							"-ms-overflow-style": "none", // IE and Edge
							"scrollbar-width": "none", // Firefox
						}}
					>
						<PostForm />
						<PostCard />
					</GridItem>
					<GridItem>as</GridItem>
				</Grid>
			</Box>
		</Box>
	);
};

export default HomeLayout;
