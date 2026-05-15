import {
	Box,
	Flex,
	Icon,
	IconButton,
	Input,
	Separator,
	Text,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { MdVideoCameraBack, MdPhotoLibrary } from "react-icons/md";
import { HiOutlineEmojiHappy } from "react-icons/hi";

const PostForm = () => {
	return (
		<Box border="1px" borderColor="gray.200" p="12px" bg="white" rounded="xl">
			<Flex columnGap="8px">
				<IconButton
					fontSize="4xl"
					color="#D6D9DD"
					rounded="full"
					aria-label="Profile"
				>
					<FaUserCircle />
				</IconButton>
				<Input
					placeholder="What's on your mind, Mark Lester?"
					bgColor="gray.100"
					rounded="full"
				/>
			</Flex>
			<Separator borderColor="gray.200" borderWidth="1px" my={3} />
			<Flex
				justifyContent="space-between"
				align="center"
				px="33px"
				pb="8px"
				pt="6px"
			>
				<Flex align="center" columnGap="3px">
					<Icon boxSize="26px" as={MdVideoCameraBack} color="#E42645" />
					<Text color="#6F7175" fontWeight="500">
						Live Video
					</Text>
				</Flex>
				<Flex align="center" columnGap="3px">
					<Icon boxSize="26px" as={MdPhotoLibrary} color="#41B35D" />
					<Text color="#6F7175" fontWeight="500">
						Photo/video
					</Text>
				</Flex>
				<Flex align="center" columnGap="3px">
					<Icon boxSize="26px" as={HiOutlineEmojiHappy} color="#EAB026" />
					<Text color="#6F7175" fontWeight="500">
						Feeling/activity
					</Text>
				</Flex>
			</Flex>
		</Box>
	);
};

export default PostForm;
