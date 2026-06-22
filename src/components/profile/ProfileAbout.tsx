import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import type { User } from "../../entities/response/User";
import { FiEdit2 } from "react-icons/fi";

type FieldVisibility = "public" | "private";

type ProfileAboutProps = {
	user?: User;
	isOwnProfile: boolean;
};

type AboutField = {
	label: string;
	value?: string | null;
	visibility: FieldVisibility;
};

const formatBirthDate = (birthDate?: string | null): string | null => {
	if (!birthDate) return null;

	const parsedDate = new Date(birthDate);
	if (Number.isNaN(parsedDate.getTime())) {
		return birthDate;
	}

	return parsedDate.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

const canDisplayField = (field: AboutField, isOwnProfile: boolean) => {
	if (!field.value || !field.value.trim()) return false;
	if (field.visibility === "public") return true;
	return isOwnProfile;
};

const ProfileAbout = ({ user, isOwnProfile }: ProfileAboutProps) => {
	const aboutFields: AboutField[] = [
		{ label: "Gender", value: user?.gender, visibility: "public" },
		{
			label: "Birthdate",
			value: formatBirthDate(user?.birthDate),
			visibility: "public",
		},
		{ label: "Bio", value: user?.bio, visibility: "public" },
		{ label: "Address", value: user?.address, visibility: "public" },
		{ label: "Work", value: user?.work, visibility: "public" },
		{
			label: "High School",
			value: user?.highSchool,
			visibility: "public",
		},
		{ label: "College", value: user?.college, visibility: "public" },
		{ label: "Hobbies", value: user?.hobbies, visibility: "public" },
		{ label: "Phone", value: user?.phone, visibility: "public" },
	];

	const visibleFields = aboutFields.filter((field) =>
		canDisplayField(field, isOwnProfile),
	);

	return (
		<Box bg="white" rounded="lg" borderWidth="1px" borderColor="gray.200" p={5}>
			<Text fontSize="lg" fontWeight="700" color="gray.800" mb={4}>
				About
			</Text>

			{visibleFields.length === 0 ? (
				<Text color="gray.500" fontSize="sm">
					No public details to show yet.
				</Text>
			) : (
				<Flex direction="column" gap={3}>
					{visibleFields.map((field) => (
						<Flex
							key={field.label}
							align="flex-start"
							justify="space-between"
							gap={3}
						>
							<Box minW={0}>
								<Text fontSize="sm" color="gray.500" fontWeight="600">
									{field.label}
								</Text>
								<Text fontSize="sm" color="gray.800" wordBreak="break-word">
									{field.value}
								</Text>
							</Box>
							{isOwnProfile && (
								<Icon
									as={FiEdit2}
									color="gray.500"
									boxSize={4}
									mt={1}
									aria-label={`Edit ${field.label}`}
								/>
							)}
						</Flex>
					))}
				</Flex>
			)}
		</Box>
	);
};

export default ProfileAbout;
