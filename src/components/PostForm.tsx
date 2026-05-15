import {
	Box,
	Button,
	Dialog,
	Flex,
	Icon,
	IconButton,
	Input,
	Separator,
	Text,
	Textarea,
	useDisclosure,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { MdVideoCameraBack, MdPhotoLibrary } from "react-icons/md";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useCreatePost } from "@/hooks/useCreatePost";
import type { CreatePost } from "@/entities/CreatePost";

const PLACEHOLDER = "What's on your mind, Mark Lester?";

const PostFormActions = () => (
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
);

const PostForm = () => {
	const { open, onOpen, setOpen } = useDisclosure();
	const createMutation = useCreatePost();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CreatePost>({
		defaultValues: {
			message: "",
		},
	});

	const openComposer = () => onOpen();

	const onSubmit = async (data: CreatePost) => {
		await createMutation.mutateAsync(data);
		reset();
		setOpen(false);
	};

	return (
		<>
			<Box border="1px" borderColor="gray.200" p="12px" bg="white" rounded="xl">
				<Flex columnGap="8px" align="flex-start">
					<IconButton
						fontSize="4xl"
						color="#D6D9DD"
						rounded="full"
						aria-label="Profile"
						flexShrink={0}
					>
						<FaUserCircle />
					</IconButton>
					<Input
						placeholder={PLACEHOLDER}
						bgColor="gray.100"
						rounded="full"
						readOnly
						cursor="pointer"
						onClick={openComposer}
						onFocus={(e) => {
							e.target.blur();
							openComposer();
						}}
					/>
				</Flex>
				<Separator borderColor="gray.200" borderWidth="1px" my={3} />
				<PostFormActions />
			</Box>

			<Dialog.Root
				open={open}
				onOpenChange={(e) => {
					setOpen(e.open);
					if (!e.open) reset();
				}}
				placement="center"
			>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content maxW="500px" w="full" mx={4} rounded="xl" p={0}>
						<Dialog.Header
							px={4}
							py={3}
							borderBottomWidth="1px"
							borderColor="gray.200"
							display="flex"
							alignItems="center"
							justifyContent="space-between"
						>
							<Dialog.Title fontSize="lg" fontWeight="bold">
								Create post
							</Dialog.Title>
							<Dialog.CloseTrigger asChild>
								<IconButton
									variant="ghost"
									rounded="full"
									aria-label="Close"
									size="sm"
								>
									<IoClose />
								</IconButton>
							</Dialog.CloseTrigger>
						</Dialog.Header>

						<Box
							as="form"
							onSubmit={handleSubmit(onSubmit)}
							id="create-post-form"
						>
							<Dialog.Body p="12px">
								<Flex columnGap="8px" align="flex-start">
									<IconButton
										fontSize="4xl"
										color="#D6D9DD"
										rounded="full"
										aria-label="Profile"
										flexShrink={0}
									>
										<FaUserCircle />
									</IconButton>
									<Textarea
										placeholder={PLACEHOLDER}
										rows={5}
										resize="none"
										border="none"
										bg="transparent"
										fontSize="md"
										px={0}
										py={1}
										flex="1"
										autoFocus
										_focus={{ outline: "none", boxShadow: "none" }}
										{...register("message", {
											required: "Write something to post",
										})}
									/>
								</Flex>
								{errors.message && (
									<Text color="red.500" fontSize="sm" mt={1}>
										{errors.message.message}
									</Text>
								)}
								<Separator borderColor="gray.200" borderWidth="1px" my={3} />
								<PostFormActions />
								{createMutation.isError && (
									<Text color="red.500" fontSize="sm" mt={2}>
										Failed to create post. Please try again.
									</Text>
								)}
							</Dialog.Body>
							<Dialog.Footer px={4} pb={4}>
								<Button
									type="submit"
									bg="blue.500"
									color="white"
									w="full"
									loading={createMutation.isPending}
									disabled={createMutation.isPending}
								>
									Post
								</Button>
							</Dialog.Footer>
						</Box>
					</Dialog.Content>
				</Dialog.Positioner>
			</Dialog.Root>
		</>
	);
};

export default PostForm;
