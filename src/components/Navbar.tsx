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
import type { ComponentType } from "react";
import { FaBell, FaBars, FaSearch } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { PiUsersThree } from "react-icons/pi";
import { IoStorefrontOutline } from "react-icons/io5";
import { FiYoutube } from "react-icons/fi";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaFacebookMessenger, FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Tooltip } from "@/components/ui/tooltip";

const CENTER_NAV_ITEMS = [
	{ id: "home", label: "Home", to: "/home", icon: GoHome, end: true },
	{ id: "friends", label: "Friends", to: "/friends", icon: FiUser, end: false },
] as const;

type NavbarNavButtonProps = {
	to: string;
	label: string;
	icon: ComponentType<{ size?: number }>;
	end?: boolean;
};

const NavbarNavButton = ({ to, label, icon: Icon, end }: NavbarNavButtonProps) => (
	<Tooltip content={label} positioning={{ placement: "bottom" }}>
		<IconButton asChild variant="ghost" aria-label={label}>
			<NavLink
				to={to}
				end={end}
				style={{
					display: "flex",
					alignItems: "center",
					textDecoration: "none",
				}}
			>
				{({ isActive }) => (
					<Box
						px={4}
						py={2}
						rounded="lg"
						borderBottomWidth="3px"
						borderBottomColor={isActive ? "#1877f2" : "transparent"}
						color={isActive ? "#1877f2" : "gray.600"}
						bg={isActive ? "gray.100" : "transparent"}
						_hover={{ color: "#1877f2", bg: "gray.100" }}
						display="flex"
						alignItems="center"
					>
						<Icon size={22} />
					</Box>
				)}
			</NavLink>
		</IconButton>
	</Tooltip>
);

const NavbarDrawerLink = ({
	to,
	label,
	end,
}: {
	to: string;
	label: string;
	end?: boolean;
}) => (
	<NavLink
		to={to}
		end={end}
		style={{ textDecoration: "none", color: "inherit", width: "100%" }}
	>
		{({ isActive }) => (
			<Text
				fontWeight={isActive ? "600" : "400"}
				color={isActive ? "#1877f2" : "inherit"}
				px={2}
				py={1}
				rounded="md"
				bg={isActive ? "blue.50" : "transparent"}
			>
				{label}
			</Text>
		)}
	</NavLink>
);

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
						{CENTER_NAV_ITEMS.map((item) => (
							<NavbarNavButton
								key={item.id}
								to={item.to}
								label={item.label}
								icon={item.icon}
								end={item.end}
							/>
						))}

						<Tooltip content="Groups" positioning={{ placement: "bottom" }}>
							<IconButton
								variant="ghost"
								color="gray.600"
								opacity={0.6}
								cursor="default"
								aria-label="Groups"
							>
								<PiUsersThree size={22} />
							</IconButton>
						</Tooltip>

						<Tooltip content="Store" positioning={{ placement: "bottom" }}>
							<IconButton
								variant="ghost"
								color="gray.600"
								opacity={0.6}
								cursor="default"
								aria-label="Store"
							>
								<IoStorefrontOutline size={22} />
							</IconButton>
						</Tooltip>

						<Tooltip content="Watch" positioning={{ placement: "bottom" }}>
							<IconButton
								variant="ghost"
								color="gray.600"
								opacity={0.6}
								cursor="default"
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
							<VStack gap={4} align="stretch" mt={8}>
								<Text fontSize="lg" fontWeight="bold">
									Menu
								</Text>
								<NavbarDrawerLink to="/home" label="Home" end />
								<NavbarDrawerLink to="/friends" label="Friends" />
								<Text opacity={0.6}>Watch</Text>
								<Text opacity={0.6}>Notifications</Text>
								<Text opacity={0.6}>Profile</Text>
							</VStack>
						</Drawer.Body>
					</Drawer.Content>
				</Drawer.Positioner>
			</Drawer.Root>
		</Box>
	);
};

export default Navbar;
