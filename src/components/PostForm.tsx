import {
	Box,
	Button,
	Dialog,
	Flex,
	Icon,
	IconButton,
	Image,
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
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useCreatePost } from "@/hooks/useCreatePost";
import type { CreatePostForm } from "@/entities/CreatePost";

const PLACEHOLDER = "What's on your mind, Mark Lester?";

type PostFormActionsProps = {
	onPhotoClick?: () => void;
};

const PostFormActions = ({ onPhotoClick }: PostFormActionsProps) => (
	<Flex
		justifyContent="space-between"
		align="center"
		px="33px"
		pb="8px"
		pt="6px"
	>
		<Flex align="center" columnGap="3px" cursor="default" opacity={0.6}>
			<Icon boxSize="26px" as={MdVideoCameraBack} color="#E42645" />
			<Text color="#6F7175" fontWeight="500">
				Live Video
			</Text>
		</Flex>
		<Flex
			align="center"
			columnGap="3px"
			cursor="pointer"
			onClick={onPhotoClick}
			_hover={{ opacity: 0.8 }}
		>
			<Icon boxSize="26px" as={MdPhotoLibrary} color="#41B35D" />
			<Text color="#6F7175" fontWeight="500">
				Photo/video
			</Text>
		</Flex>
		<Flex align="center" columnGap="3px" cursor="default" opacity={0.6}>
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
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [formError, setFormError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		reset,
	} = useForm<CreatePostForm>({
		defaultValues: {
			message: "",
		},
	});

	const clearImage = () => {
		if (previewUrl) URL.revokeObjectURL(previewUrl);
		setSelectedImage(null);
		setPreviewUrl(null);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const resetForm = () => {
		reset();
		clearImage();
		setFormError(null);
	};

	useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl);
		};
	}, [previewUrl]);

	const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (previewUrl) URL.revokeObjectURL(previewUrl);
		setSelectedImage(file);
		setPreviewUrl(URL.createObjectURL(file));
		setFormError(null);
	};

	const openComposer = () => onOpen();

	const openFilePicker = () => fileInputRef.current?.click();

	const onSubmit = async (data: CreatePostForm) => {
		const hasText = Boolean(data.message?.trim());
		const hasImage = selectedImage != null;

		if (!hasText && !hasImage) {
			setFormError("Add text or a photo to post");
			return;
		}

		setFormError(null);
		await createMutation.mutateAsync({
			message: data.message?.trim(),
			image: selectedImage,
		});
		resetForm();
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
				<PostFormActions onPhotoClick={openComposer} />
			</Box>

			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				hidden
				onChange={handleImageSelect}
			/>

			<Dialog.Root
				open={open}
				onOpenChange={(e) => {
					setOpen(e.open);
					if (!e.open) resetForm();
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
										{...register("message")}
									/>
								</Flex>

								{previewUrl && (
									<Box position="relative" mt={3}>
										<Image
											src={previewUrl}
											alt="Upload preview"
											w="full"
											maxH="400px"
											objectFit="cover"
											rounded="lg"
										/>
										<IconButton
											position="absolute"
											top={2}
											right={2}
											aria-label="Remove image"
											size="sm"
											rounded="full"
											bg="gray.800"
											color="white"
											_hover={{ bg: "gray.700" }}
											onClick={clearImage}
										>
											<IoClose />
										</IconButton>
									</Box>
								)}

								{formError && (
									<Text color="red.500" fontSize="sm" mt={1}>
										{formError}
									</Text>
								)}
								<Separator borderColor="gray.200" borderWidth="1px" my={3} />
								<PostFormActions onPhotoClick={openFilePicker} />
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
