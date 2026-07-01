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

type ApiVisibility = "Public" | "Private" | null | undefined;

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

const fromApiVisibility = (visibility: ApiVisibility): FieldVisibility => {
	if (visibility === "Private") return "private";
	return "public";
};

const canDisplayField = (field: AboutField) => {
	if (!field.value || !field.value.trim()) return false;
	return field.visibility === "public";
};

const ProfileAbout = ({ user, isOwnProfile }: ProfileAboutProps) => {
	const aboutFields: AboutField[] = [
		{
			label: "Gender",
			value: user?.gender,
			visibility: fromApiVisibility(user?.genderVisibility),
		},
		{
			label: "Birthdate",
			value: formatBirthDate(user?.birthDate),
			visibility: fromApiVisibility(user?.birthDateVisibility),
		},
		{
			label: "Bio",
			value: user?.bio,
			visibility: fromApiVisibility(user?.bioVisibility),
		},
		{
			label: "Address",
			value: user?.address,
			visibility: fromApiVisibility(user?.addressVisibility),
		},
		{
			label: "Work",
			value: user?.work,
			visibility: fromApiVisibility(user?.workVisibility),
		},
		{
			label: "High School",
			value: user?.highSchool,
			visibility: fromApiVisibility(user?.highSchoolVisibility),
		},
		{
			label: "College",
			value: user?.college,
			visibility: fromApiVisibility(user?.collegeVisibility),
		},
		{
			label: "Hobbies",
			value: user?.hobbies,
			visibility: fromApiVisibility(user?.hobbiesVisibility),
		},
		{
			label: "Phone",
			value: user?.phone,
			visibility: fromApiVisibility(user?.phoneVisibility),
		},
	];

	const visibleFields = aboutFields.filter((field) => canDisplayField(field));

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
