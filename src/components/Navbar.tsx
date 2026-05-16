import {
	Box,
	Drawer,
	Grid,
	GridItem,
	HStack,
	IconButton,
	Input,
	InputGroup,
	Text,
	VStack,
	useDisclosure,
} from "@chakra-ui/react";
import { FaBell, FaBars, FaSearch } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { PiUsersThree } from "react-icons/pi";
import { IoStorefrontOutline } from "react-icons/io5";
import { FiYoutube } from "react-icons/fi";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaFacebookMessenger, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from "@/components/ui/tooltip";

const Navbar = () => {
	const { open, onOpen, setOpen } = useDisclosure();

	return (
		<Box
			bg="white"
			boxShadow="sm"
			py={2}
			position="sticky"
			top={0}
			zIndex={1000}
		>
			<Grid
				templateColumns="1fr 2fr 1fr"
				alignItems="center"
				maxW="full"
				mx="55px"
			>
				<GridItem>
					<HStack gap={3}>
						<Text
							fontSize="lg"
							color="blue.600"
							fontWeight="extrabold"
							fontFamily="sans-serif"
							mb={1}
						>
							FaceUp
						</Text>
						<InputGroup
							display={{ base: "none", md: "flex" }}
							w="250px"
							bg="gray.100"
							rounded="full"
							startElement={<FaSearch color="gray" />}
						>
							<Input placeholder="Search FaceUp" border="none" bg="transparent" />
						</InputGroup>
					</HStack>
				</GridItem>

				<GridItem justifySelf="center">
					<HStack gap={14}>
						<Tooltip content="Home" positioning={{ placement: "bottom" }}>
							<IconButton
								asChild
								variant="ghost"
								color="gray.600"
								_hover={{ color: "#1877f2", bg: "gray.100" }}
								aria-label="Home"
							>
								<Link to="/home">
									<GoHome size={22} />
								</Link>
							</IconButton>
						</Tooltip>

						<Tooltip content="Friends" positioning={{ placement: "bottom" }}>
							<IconButton
								asChild
								variant="ghost"
								color="gray.600"
								_hover={{ color: "#1877f2", bg: "gray.100" }}
								aria-label="Friends"
							>
								<Link to="/friends">
									<FiUser size={22} />
								</Link>
							</IconButton>
						</Tooltip>

						<Tooltip content="Groups" positioning={{ placement: "bottom" }}>
							<IconButton
								variant="ghost"
								color="gray.600"
								_hover={{ color: "#1877f2", bg: "gray.100" }}
								aria-label="Groups"
							>
								<PiUsersThree size={22} />
							</IconButton>
						</Tooltip>

						<Tooltip content="Store" positioning={{ placement: "bottom" }}>
							<IconButton
								variant="ghost"
								color="gray.600"
								_hover={{ color: "#1877f2", bg: "gray.100" }}
								aria-label="Store"
							>
								<IoStorefrontOutline size={22} />
							</IconButton>
						</Tooltip>

						<Tooltip content="Watch" positioning={{ placement: "bottom" }}>
							<IconButton
								variant="ghost"
								color="gray.600"
								_hover={{ color: "#1877f2", bg: "gray.100" }}
								aria-label="Watch"
							>
								<FiYoutube size={22} />
							</IconButton>
						</Tooltip>
					</HStack>
				</GridItem>

				<GridItem justifySelf="end">
					<HStack gap={2}>
						<Tooltip content="Menu" positioning={{ placement: "bottom" }}>
							<IconButton
								bg="gray.200"
								fontSize="lg"
								color="gray.700"
								rounded="full"
								aria-label="Menu"
							>
								<BsFillGrid3X3GapFill />
							</IconButton>
						</Tooltip>
						<Tooltip content="Messenger" positioning={{ placement: "bottom" }}>
							<IconButton
								bg="gray.200"
								fontSize="lg"
								color="gray.700"
								rounded="full"
								aria-label="Messenger"
							>
								<FaFacebookMessenger />
							</IconButton>
						</Tooltip>
						<Tooltip content="Notifications" positioning={{ placement: "bottom" }}>
							<IconButton
								fontSize="lg"
								color="gray.700"
								bg="gray.200"
								rounded="full"
								aria-label="Notifications"
							>
								<FaBell />
							</IconButton>
						</Tooltip>
						<Tooltip content="Profile" positioning={{ placement: "bottom" }}>
							<IconButton
								fontSize="4xl"
								color="gray.400"
								rounded="full"
								aria-label="Profile"
							>
								<FaUserCircle />
							</IconButton>
						</Tooltip>

						<IconButton
							display={{ base: "inline-flex", md: "none" }}
							onClick={onOpen}
							variant="ghost"
							aria-label="Open Menu"
						>
							<FaBars />
						</IconButton>
					</HStack>
				</GridItem>
			</Grid>

			<Drawer.Root
				open={open}
				onOpenChange={(e) => setOpen(e.open)}
				placement="end"
			>
				<Drawer.Backdrop />
				<Drawer.Positioner>
					<Drawer.Content>
						<Drawer.Body>
							<VStack gap={4} align="start" mt={8}>
								<Text fontSize="lg" fontWeight="bold">
									Menu
								</Text>
								<Text>Home</Text>
								<Text>Friends</Text>
								<Text>Watch</Text>
								<Text>Notifications</Text>
								<Text>Profile</Text>
							</VStack>
						</Drawer.Body>
					</Drawer.Content>
				</Drawer.Positioner>
			</Drawer.Root>
		</Box>
	);
};

export default Navbar;
