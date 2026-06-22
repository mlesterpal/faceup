import { Box, Button, Flex, IconButton, Input, Text, Textarea } from "@chakra-ui/react";
import type { UpdateUserProfilePayload } from "../../entities/response/UpdateUserProfilePayload";
import type { User } from "../../entities/response/User";
import { FiEdit2 } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { useUpdateUserProfile } from "../../hooks/UserRepository";

type FieldVisibility = "public" | "private";

type UserProfileAboutProps = {
	user?: User;
	isOwnProfile: boolean;
};

type EditableProfileFieldKey = keyof UpdateUserProfilePayload;

type ProfileField = {
	key: EditableProfileFieldKey;
	label: string;
	value: string | null;
	visibility: FieldVisibility;
};

const EMPTY_VALUE_LABEL = "Not provided";
const LONG_TEXT_FIELDS = new Set(["bio", "hobbies"]);

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

const normalizeDraftValue = (value: string): string | null => {
	const trimmed = value.trim();
	return trimmed.length > 0 ? trimmed : null;
};

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

const buildFieldValues = (fields: ProfileField[]) =>
	fields.reduce<Record<string, string | null>>((acc, field) => {
		acc[field.key] = field.value;
		return acc;
	}, {});

const UserProfileAbout = ({ user, isOwnProfile }: UserProfileAboutProps) => {
	const fields = useMemo(() => buildFields(user), [user]);
	const [savedValues, setSavedValues] = useState<Record<string, string | null>>(() =>
		buildFieldValues(fields),
	);
	const [draftValues, setDraftValues] = useState<Record<string, string>>({});
	const [activeFieldKey, setActiveFieldKey] =
		useState<EditableProfileFieldKey | null>(null);
	const [saveError, setSaveError] = useState<string | null>(null);
	const updateUserProfile = useUpdateUserProfile(user?.id);

	useEffect(() => {
		setSavedValues(buildFieldValues(fields));
		setDraftValues({});
		setActiveFieldKey(null);
	}, [fields]);

	const mergedFields = fields.map((field) => ({
		...field,
		value: savedValues[field.key] ?? null,
	}));

	const visibleFields = isOwnProfile
		? mergedFields
		: mergedFields.filter(
				(field) => field.visibility === "public" && hasValue(field.value),
			);

	const handleEditClick = (
		fieldKey: EditableProfileFieldKey,
		currentValue: string | null,
	) => {
		setSaveError(null);
		setActiveFieldKey(fieldKey);
		setDraftValues((prev) => ({
			...prev,
			[fieldKey]: currentValue ?? "",
		}));
	};

	const handleCancel = () => {
		if (!activeFieldKey) return;

		setDraftValues((prev) => ({
			...prev,
			[activeFieldKey]: savedValues[activeFieldKey] ?? "",
		}));
		setActiveFieldKey(null);
	};

	const handleSave = () => {
		if (!activeFieldKey) return;

		const normalizedValue = normalizeDraftValue(draftValues[activeFieldKey] ?? "");

		setSavedValues((prev) => ({
			...prev,
			[activeFieldKey]: normalizedValue,
		}));

		updateUserProfile.mutate(
			{
				field: activeFieldKey,
				value: normalizedValue,
			},
			{
				onSuccess: () => {
					setSaveError(null);
					setActiveFieldKey(null);
				},
				onError: (error) => {
					setSaveError(error.message);
				},
			},
		);
	};

	return (
		<Box
			bg="white"
			rounded="lg"
			borderWidth="1px"
			borderColor="gray.200"
			p={5}
			position="relative"
		>
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

								{activeFieldKey === field.key ? (
									LONG_TEXT_FIELDS.has(field.key) ? (
										<Textarea
											value={draftValues[field.key] ?? ""}
											onChange={(event) =>
												setDraftValues((prev) => ({
													...prev,
													[field.key]: event.target.value,
												}))
											}
											size="sm"
											mt={1}
											minH="90px"
										/>
									) : (
										<Input
											value={draftValues[field.key] ?? ""}
											onChange={(event) =>
												setDraftValues((prev) => ({
													...prev,
													[field.key]: event.target.value,
												}))
											}
											size="sm"
											mt={1}
										/>
									)
								) : (
									<Text fontSize="sm" color="gray.800" wordBreak="break-word">
										{hasValue(field.value) ? field.value : EMPTY_VALUE_LABEL}
									</Text>
								)}
							</Box>

							{isOwnProfile && (
								<IconButton
									aria-label={`Edit ${field.label}`}
									size="xs"
									variant="ghost"
									color="gray.500"
									mt={1}
									onClick={() => handleEditClick(field.key, field.value)}
								>
									<FiEdit2 />
								</IconButton>
							)}
						</Flex>
					))}
				</Flex>
			)}

			{isOwnProfile && activeFieldKey && (
				<Flex
					position="sticky"
					bottom={0}
					bg="white"
					borderTopWidth="1px"
					borderColor="gray.200"
					pt={3}
					mt={4}
					justify="flex-end"
					gap={2}
				>
					{saveError && (
						<Text color="red.500" fontSize="sm" mr="auto">
							{saveError}
						</Text>
					)}
					<Button variant="ghost" onClick={handleCancel}>
						Cancel
					</Button>
					<Button
						colorPalette="blue"
						onClick={handleSave}
						loading={updateUserProfile.isPending}
					>
						Save
					</Button>
				</Flex>
			)}
		</Box>
	);
};

export default UserProfileAbout;
