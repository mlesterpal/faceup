import { Box, Flex, VStack, Text, Image, Icon } from "@chakra-ui/react";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { BiSolidHeartCircle, BiLike } from "react-icons/bi";
import { PiThumbsUpFill, PiShareFat } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import upmaroon from "../assets/upmaroon.jpg";
import post1 from "../assets/post1.jpg";
import post4 from "../assets/post4.jpg";

// Sample post data
const posts = [
	{
		id: 1,
		name: "Mark Lester Maranan",
		avatar: upmaroon,
		time: "2h",
		comment: "The star player during our UE matchup! 💚",
		image: post1,
		likes: "23k",
		comments: "22 comments",
		shares: "165 shares",
	},
	{
		id: 2,
		name: "Jane Doe",
		avatar: upmaroon,
		time: "4h",
		comment: "What an amazing day! ☀️",
		image: post4,
		likes: "10k",
		comments: "12 comments",
		shares: "54 shares",
	},
];

const PostCard = () => {
	return (
		<>
			{posts.map((post) => (
				<Box key={post.id} bg="white" rounded="2xl" mt="12px">
					<Box padding="12px">
						{/* Header */}
						<Flex justify="space-between" align="center">
							{/* LEFT - Avatar & Info */}
							<Flex columnGap="10px">
								<Image src={post.avatar} rounded="full" boxSize={10} />
								<VStack align="start" gap={0}>
									<Text color="#080809" fontWeight="500">
										{post.name}
									</Text>
									<Text
										fontSize="14px"
										color="#6F7175"
										fontWeight="500"
										mt="-0.5"
									>
										{post.time}
									</Text>
								</VStack>
							</Flex>

							{/* RIGHT - Icons */}
							<Flex align="center" columnGap="8px">
								<Icon
									boxSize="25px"
									color="#6F7175"
									as={HiDotsHorizontal}
								/>
								<Icon boxSize="25px" color="#6F7175" as={IoClose} />
							</Flex>
						</Flex>
						{/* Post Content */}
						<Text fontSize="15px" mt="7px">
							{post.comment}
						</Text>
						{/* Post Image */}
						<Image
							src={post.image}
							w="full"
							rounded="lg"
							objectFit={"fill"}
							maxH="565px"
							mt={2}
						/>
						{/* Status */}
						<Flex justify="space-between" px={4} mt={2}>
							<Flex align="center">
								<Icon
									as={BiSolidHeartCircle}
									color="#FD4A50"
									boxSize="22px"
								/>
								<Icon
									as={PiThumbsUpFill}
									color="#1E7BFE"
									boxSize="22px"
								/>
								<Text
									color="#6F7175"
									fontSize="14px"
									fontWeight="400"
									ml={1}
								>
									{post.likes}
								</Text>
							</Flex>
							<Flex fontSize="14px" columnGap={5}>
								<Text color="#6F7175">{post.comments}</Text>
								<Text color="#6F7175">{post.shares}</Text>
							</Flex>
						</Flex>
						{/* Action Buttons */}
						<Flex
							align={"center"}
							justify={"space-between"}
							px={12}
							mt={3}
							color="#6F7175"
							fontWeight={500}
						>
							<Flex align="center" fontSize="16px" columnGap={1.5}>
								<Icon as={BiLike} boxSize="22px" />
								<Text>Like</Text>
							</Flex>
							<Flex align="center" fontSize="16px" columnGap={1.5}>
								<Icon as={FaRegComment} boxSize="22px" />
								<Text>Comment</Text>
							</Flex>
							<Flex align="center" fontSize="16px" columnGap={1.5}>
								<Icon as={PiShareFat} boxSize="22px" />
								<Text>Share</Text>
							</Flex>
						</Flex>
					</Box>
				</Box>
			))}
		</>
	);
};

export default PostCard;
