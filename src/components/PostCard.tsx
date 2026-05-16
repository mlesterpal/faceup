import {

	Box,

	Circle,

	Flex,

	Icon,

	Image,

	Text,

	VStack,

} from "@chakra-ui/react";

import { HiDotsHorizontal } from "react-icons/hi";

import { IoClose } from "react-icons/io5";

import { BiSolidHeartCircle, BiLike } from "react-icons/bi";

import { PiThumbsUpFill, PiShareFat } from "react-icons/pi";

import { FaRegComment, FaUserCircle } from "react-icons/fa";

import type { UserPosts } from "@/entities/response/UserPosts";

import { resolveImageUrl } from "@/utils/resolveImageUrl";



export type PostCardProps = {

	userPosts: UserPosts[];

};



const PostCardItem = ({ post }: { post: UserPosts }) => {

	const imageSrc = resolveImageUrl(post.imageUrl);

	const hasMessage = Boolean(post.message?.trim());



	return (

		<Box bg="white" rounded="2xl" mt="12px">

			<Box padding="12px">

				<Flex justify="space-between" align="center">

					<Flex columnGap="10px" align="center">

						<Circle size="10" bg="gray.200" overflow="hidden">

							<Icon as={FaUserCircle} boxSize="10" color="gray.400" />

						</Circle>

						<VStack align="start" gap={0}>

							<Text color="#080809" fontWeight="500">

								{post.firstName}

							</Text>

							<Text

								fontSize="14px"

								color="#6F7175"

								fontWeight="500"

								mt="-0.5"

							>

								Just now

							</Text>

						</VStack>

					</Flex>



					<Flex align="center" columnGap="8px">

						<Icon boxSize="25px" color="#6F7175" as={HiDotsHorizontal} />

						<Icon boxSize="25px" color="#6F7175" as={IoClose} />

					</Flex>

				</Flex>



				{hasMessage && (

					<Text fontSize="15px" mt="7px">

						{post.message}

					</Text>

				)}



				{imageSrc && (

					<Box mt={hasMessage ? 2 : "7px"} mx={-3} mb={-1}>

						<Image

							src={imageSrc}

							alt="Post"

							w="full"

							maxH="500px"

							objectFit="cover"

							rounded="lg"

						/>

					</Box>

				)}



				<Flex justify="space-between" px={4} mt={2}>

					<Flex align="center">

						<Icon as={BiSolidHeartCircle} color="#FD4A50" boxSize="22px" />

						<Icon as={PiThumbsUpFill} color="#1E7BFE" boxSize="22px" />

						<Text color="#6F7175" fontSize="14px" fontWeight="400" ml={1}>

							0

						</Text>

					</Flex>

					<Flex fontSize="14px" columnGap={5}>

						<Text color="#6F7175">0 comments</Text>

						<Text color="#6F7175">0 shares</Text>

					</Flex>

				</Flex>



				<Flex

					align="center"

					justify="space-between"

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

	);

};



const PostCard = ({ userPosts }: PostCardProps) => {

	return (

		<>

			{userPosts.map((post) => (

				<PostCardItem key={post.postId} post={post} />

			))}

		</>

	);

};



export default PostCard;

