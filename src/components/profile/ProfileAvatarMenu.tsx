import { Box, Circle, Icon, Image, Menu, Spinner } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaCamera, FaUserCircle } from "react-icons/fa";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

type ProfileAvatarMenuProps = {
	avatarUrl?: string | null;
	onFileSelected: (file: File) => void;
	isUploading?: boolean;
	onValidationError?: (message: string) => void;
};

const ProfileAvatarMenu = ({
	avatarUrl,
	onFileSelected,
	isUploading = false,
	onValidationError,
}: ProfileAvatarMenuProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const displayUrl = previewUrl ?? avatarUrl ?? null;

	useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl);
		};
	}, [previewUrl]);

	useEffect(() => {
		if (!avatarUrl) return;
		setPreviewUrl((prev) => {
			if (prev) URL.revokeObjectURL(prev);
			return null;
		});
	}, [avatarUrl]);

	const openFilePicker = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith("image/")) {
			onValidationError?.("Please choose an image file.");
			if (fileInputRef.current) fileInputRef.current.value = "";
			return;
		}

		if (file.size > MAX_FILE_SIZE_BYTES) {
			onValidationError?.("Image must be 5 MB or smaller.");
			if (fileInputRef.current) fileInputRef.current.value = "";
			return;
		}

		if (previewUrl) URL.revokeObjectURL(previewUrl);
		setPreviewUrl(URL.createObjectURL(file));
		onFileSelected(file);

		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	return (
		<>
			<Menu.Root positioning={{ placement: "bottom-start" }}>
				<Menu.Trigger asChild>
					<Box
						as="button"
						aria-label="Profile picture"
						cursor="pointer"
						position="relative"
						rounded="full"
						border="none"
						bg="transparent"
						p={0}
						flexShrink={0}
						_disabled={{
							cursor: "not-allowed",
							opacity: 0.5,
						}}
						css={{
							"&:hover [data-camera-overlay]": {
								opacity: isUploading ? 0 : 1,
							},
						}}
					>
						<Circle
							size={{ base: "120px", md: "168px" }}
							bg="gray.200"
							border="4px solid"
							borderColor="white"
							overflow="hidden"
							position="relative"
						>
							{displayUrl ? (
								<Image
									src={displayUrl}
									alt="Profile"
									w="full"
									h="full"
									objectFit="cover"
								/>
							) : (
								<Icon
									as={FaUserCircle}
									boxSize={{ base: "80px", md: "120px" }}
									color="gray.400"
								/>
							)}

							<Box
								data-camera-overlay
								position="absolute"
								inset={0}
								bg="blackAlpha.400"
								opacity={0}
								display="flex"
								alignItems="center"
								justifyContent="center"
								transition="opacity 0.2s"
								pointerEvents="none"
							>
								<Icon as={FaCamera} boxSize={8} color="white" />
							</Box>

							{isUploading && (
								<Box
									position="absolute"
									inset={0}
									bg="blackAlpha.500"
									display="flex"
									alignItems="center"
									justifyContent="center"
								>
									<Spinner color="white" size="lg" />
								</Box>
							)}
						</Circle>
					</Box>
				</Menu.Trigger>

				<Menu.Positioner>
					<Menu.Content minW="200px">
						<Menu.Item value="choose-picture" onClick={openFilePicker}>
							Choose Profile Picture
						</Menu.Item>
					</Menu.Content>
				</Menu.Positioner>
			</Menu.Root>

			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				hidden
				onChange={handleFileChange}
			/>
		</>
	);
};

export default ProfileAvatarMenu;
