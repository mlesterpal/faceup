/** @see ./README.md — layout map and change cookbook */
import {
	Box,
	Button,
	Circle,
	Flex,
	HStack,
	Icon,
	Separator,
	Tabs,
	Text,
} from "@chakra-ui/react";
import { FaFacebook, FaGraduationCap, FaUserCircle } from "react-icons/fa";
import {
	DEFAULT_PROFILE,
	PROFILE_TABS,
	PROFILE_TAB_LABELS,
	type ProfileDetail,
	type ProfileHeaderProps,
} from "@/components/profile/profile.types";

const DEFAULT_DETAILS: ProfileDetail[] = [
	{ icon: <FaFacebook />, label: "Facebook" },
	{
		icon: <FaGraduationCap />,
		label: "Ark of the Covenant Montessori Chamber of Learning",
	},
];

const ProfileHeader = ({
	name = DEFAULT_PROFILE.name,
	friendCount = DEFAULT_PROFILE.friendCount,
	details = DEFAULT_DETAILS,
}: ProfileHeaderProps) => {
	return (
		<Flex
			direction={{ base: "column", md: "row" }}
			align={{ base: "center", md: "flex-start" }}
			gap={{ base: 4, md: 6 }}
			px={{ base: 4, md: 6 }}
			py={6}
		>
			<Circle
				size={{ base: "120px", md: "168px" }}
				bg="gray.200"
				border="4px solid"
				borderColor="white"
				flexShrink={0}
			>
				<Icon
					as={FaUserCircle}
					boxSize={{ base: "80px", md: "120px" }}
					color="gray.400"
				/>
			</Circle>

			<Flex
				direction="column"
				flex="1"
				minW={0}
				align={{ base: "center", md: "flex-start" }}
				gap={2}
			>
				<Text
					fontSize={{ base: "2xl", md: "3xl" }}
					fontWeight="bold"
					color="#080809"
					textAlign={{ base: "center", md: "left" }}
				>
					{name}
				</Text>
				<Text
					fontSize="sm"
					color="#6F7175"
					fontWeight="500"
					textAlign={{ base: "center", md: "left" }}
				>
					{friendCount} friends
				</Text>
				<Flex
					direction="column"
					gap={1}
					align={{ base: "center", md: "flex-start" }}
					mt={1}
				>
					{details.map((detail) => (
						<HStack
							key={detail.label}
							gap={2}
							color="#6F7175"
							fontSize="sm"
							fontWeight="500"
						>
							<Box color="gray.600" fontSize="lg" lineHeight={0}>
								{detail.icon}
							</Box>
							<Text>{detail.label}</Text>
						</HStack>
					))}
				</Flex>
			</Flex>

			<HStack
				gap={2}
				flexWrap="wrap"
				justify={{ base: "center", md: "flex-end" }}
				align="center"
				alignSelf={{ base: "stretch", md: "flex-end" }}
			>
				<Button
					bg="blue.600"
					color="white"
					rounded="md"
					fontWeight="600"
					_hover={{ bg: "blue.700" }}
					flex={{ base: "1", md: "0 0 auto" }}
				>
					+ Add to story
				</Button>
				<Button
					bg="gray.100"
					color="#080809"
					rounded="md"
					fontWeight="600"
					_hover={{ bg: "gray.200" }}
					flex={{ base: "1", md: "0 0 auto" }}
				>
					Edit profile
				</Button>
			</HStack>
		</Flex>
	);
};

export const ProfileTabList = () => (
	<>
		<Separator borderColor="gray.200" />
		<Box
			overflowX="auto"
			px={{ base: 2, md: 4 }}
			css={{
				"&::-webkit-scrollbar": {
					display: "none",
				},
				"-ms-overflow-style": "none",
				"scrollbar-width": "none",
			}}
		>
			<Tabs.List borderBottom="none" gap={0}>
				{PROFILE_TABS.map((tab) => (
					<Tabs.Trigger
						key={tab}
						value={tab}
						px={4}
						py={3}
						fontWeight="600"
						color="#6F7175"
						_selected={{ color: "blue.600" }}
						_hover={{ bg: "gray.100" }}
					>
						{PROFILE_TAB_LABELS[tab]}
					</Tabs.Trigger>
				))}
				
			</Tabs.List>
		</Box>
	</>
);

export default ProfileHeader;
