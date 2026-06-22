import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import type { User } from "../../entities/response/User";
import { FiEdit2 } from "react-icons/fi";

type FieldVisibility = "public" | "private";

type UserProfileAboutProps = {
	user?: User;
	isOwnProfile: boolean;
};

type ProfileField = {
	key: string;
	label: string;
	value: string | null;
	visibility: FieldVisibility;
};

const EMPTY_VALUE_LABEL = "Not provided";

const formatBirthDate = (birthDate?: string | null): string | null => {
	if (!birthDate) return null;

	const parsedDate = new Date(birthDate);
	if (Number.isNaN(parsedDate.getTime())) return birthDate;

	return parsedDate.toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

const hasValue = (value: string | null) => Boolean(value && value.trim());

const buildFields = (user?: User): ProfileField[] => [
	{ key: "gender", label: "Gender", value: user?.gender ?? null, visibility: "public" },
	{
		key: "birthDate",
		label: "Birthdate",
		value: formatBirthDate(user?.birthDate),
		visibility: "public",
	},
	{ key: "bio", label: "Bio", value: user?.bio ?? null, visibility: "public" },
	{
		key: "address",
		label: "Address",
		value: user?.address ?? null,
		visibility: "private",
	},
	{ key: "work", label: "Work", value: user?.work ?? null, visibility: "public" },
	{
		key: "highSchool",
		label: "High School",
		value: user?.highSchool ?? null,
		visibility: "public",
	},
	{
		key: "college",
		label: "College",
		value: user?.college ?? null,
		visibility: "public",
	},
	{
		key: "hobbies",
		label: "Hobbies",
		value: user?.hobbies ?? null,
		visibility: "public",
	},
	{ key: "phone", label: "Phone", value: user?.phone ?? null, visibility: "private" },
];

const UserProfileAbout = ({ user, isOwnProfile }: UserProfileAboutProps) => {
	const fields = buildFields(user);
	const visibleFields = isOwnProfile
		? fields
		: fields.filter((field) => field.visibility === "public" && hasValue(field.value));

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
						<Flex key={field.key} align="flex-start" justify="space-between" gap={3}>
							<Box minW={0}>
								<Text fontSize="sm" color="gray.500" fontWeight="600">
									{field.label}
								</Text>
								<Text fontSize="sm" color="gray.800" wordBreak="break-word">
									{hasValue(field.value) ? field.value : EMPTY_VALUE_LABEL}
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

export default UserProfileAbout;
