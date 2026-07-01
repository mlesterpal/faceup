import { Box, Button, Dialog, Flex, HStack, Icon, IconButton, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import type { UpdateUserProfilePayload } from "../../entities/response/UpdateUserProfilePayload";
import type { User } from "../../entities/response/User";
import { FiEdit2, FiGlobe, FiLock } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { useUpdateProfileFieldVisibility, useUpdateUserProfile } from "../../hooks/UserRepository";

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

const fromApiVisibility = (
	visibility: User["bioVisibility"] | undefined,
	fallback: FieldVisibility,
): FieldVisibility => {
	if (visibility === "Public") return "public";
	if (visibility === "Private") return "private";
	return fallback;
};

const buildFields = (user?: User): ProfileField[] => [
	{
		key: "gender",
		label: "Gender",
		value: user?.gender ?? null,
		visibility: fromApiVisibility(user?.genderVisibility, "public"),
	},
	{
		key: "birthDate",
		label: "Birthdate",
		value: formatBirthDate(user?.birthDate),
		visibility: fromApiVisibility(user?.birthDateVisibility, "public"),
	},
	{
		key: "bio",
		label: "Bio",
		value: user?.bio ?? null,
		visibility: fromApiVisibility(user?.bioVisibility, "public"),
	},
	{
		key: "address",
		label: "Address",
		value: user?.address ?? null,
		visibility: fromApiVisibility(user?.addressVisibility, "private"),
	},
	{
		key: "work",
		label: "Work",
		value: user?.work ?? null,
		visibility: fromApiVisibility(user?.workVisibility, "public"),
	},
	{
		key: "highSchool",
		label: "High School",
		value: user?.highSchool ?? null,
		visibility: fromApiVisibility(user?.highSchoolVisibility, "public"),
	},
	{
		key: "college",
		label: "College",
		value: user?.college ?? null,
		visibility: fromApiVisibility(user?.collegeVisibility, "public"),
	},
	{
		key: "hobbies",
		label: "Hobbies",
		value: user?.hobbies ?? null,
		visibility: fromApiVisibility(user?.hobbiesVisibility, "public"),
	},
	{
		key: "phone",
		label: "Phone",
		value: user?.phone ?? null,
		visibility: fromApiVisibility(user?.phoneVisibility, "private"),
	},
];

const buildFieldValues = (fields: ProfileField[]) =>
	fields.reduce<Record<string, string | null>>((acc, field) => {
		acc[field.key] = field.value;
		return acc;
	}, {});

const buildFieldVisibility = (fields: ProfileField[]) =>
	fields.reduce<Record<EditableProfileFieldKey, FieldVisibility>>((acc, field) => {
		acc[field.key] = field.visibility;
		return acc;
	}, {} as Record<EditableProfileFieldKey, FieldVisibility>);

const UserProfileAbout = ({ user, isOwnProfile }: UserProfileAboutProps) => {
	const fields = useMemo(() => buildFields(user), [user]);
	const [savedValues, setSavedValues] = useState<Record<string, string | null>>(() =>
		buildFieldValues(fields),
	);
	const [draftValues, setDraftValues] = useState<Record<string, string>>({});
	const [activeFieldKey, setActiveFieldKey] =
		useState<EditableProfileFieldKey | null>(null);
	const [visibilityFieldKey, setVisibilityFieldKey] =
		useState<EditableProfileFieldKey | null>(null);
	const [visibilityDraft, setVisibilityDraft] = useState<FieldVisibility | null>(null);
	const [visibilityError, setVisibilityError] = useState<string | null>(null);
	const [fieldVisibility, setFieldVisibility] =
		useState<Record<EditableProfileFieldKey, FieldVisibility>>(() =>
			buildFieldVisibility(fields),
		);
	const [saveError, setSaveError] = useState<string | null>(null);
	const updateUserProfile = useUpdateUserProfile(user?.id);
	const updateProfileFieldVisibility = useUpdateProfileFieldVisibility(user?.id);

	useEffect(() => {
		setSavedValues(buildFieldValues(fields));
		setFieldVisibility(buildFieldVisibility(fields));
		setDraftValues({});
		setActiveFieldKey(null);
		setVisibilityFieldKey(null);
		setVisibilityDraft(null);
		setVisibilityError(null);
	}, [fields]);

	const mergedFields = fields.map((field) => ({
		...field,
		value: savedValues[field.key] ?? null,
		visibility: fieldVisibility[field.key] ?? field.visibility,
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

	const selectedVisibilityField = visibilityFieldKey
		? mergedFields.find((field) => field.key === visibilityFieldKey)
		: undefined;

	const handleVisibilitySelect = (visibility: FieldVisibility) => {
		setVisibilityDraft(visibility);
		setVisibilityError(null);
	};

	const handleVisibilityCancel = () => {
		setVisibilityFieldKey(null);
		setVisibilityDraft(null);
		setVisibilityError(null);
	};

	const toVisibilityPayload = (visibility: FieldVisibility): "Public" | "Private" =>
		visibility === "public" ? "Public" : "Private";

	const handleVisibilitySave = () => {
		if (!visibilityFieldKey || !visibilityDraft) return;

		setVisibilityError(null);
		updateProfileFieldVisibility.mutate(
			{
				fieldName: visibilityFieldKey,
				visibility: toVisibilityPayload(visibilityDraft),
			},
			{
				onSuccess: () => {
					setFieldVisibility((prev) => ({
						...prev,
						[visibilityFieldKey]: visibilityDraft,
					}));
					setVisibilityFieldKey(null);
					setVisibilityDraft(null);
				},
				onError: (error) => {
					setVisibilityError(error.message);
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
								<HStack align="start" gap={1} mt={1}>
									{hasValue(field.value) && (
										<IconButton
											aria-label={`Change ${field.label} visibility`}
											size="xs"
											variant="ghost"
											color="gray.500"
											onClick={() => {
												setVisibilityFieldKey(field.key);
												setVisibilityDraft(field.visibility);
												setVisibilityError(null);
											}}
										>
											{field.visibility === "public" ? <FiGlobe /> : <FiLock />}
										</IconButton>
									)}
									<IconButton
										aria-label={`Edit ${field.label}`}
										size="xs"
										variant="ghost"
										color="gray.500"
										onClick={() => handleEditClick(field.key, field.value)}
									>
										<FiEdit2 />
									</IconButton>
								</HStack>
							)}
						</Flex>
					))}
				</Flex>
			)}

			<Dialog.Root
				open={Boolean(visibilityFieldKey)}
				onOpenChange={(details) => {
					if (!details.open) {
						handleVisibilityCancel();
					}
				}}
			>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content maxW="420px" rounded="xl">
						<Dialog.Header borderBottomWidth="1px" borderColor="gray.200">
							<Dialog.Title fontSize="lg" fontWeight="700">
								{selectedVisibilityField
									? `Who can see your ${selectedVisibilityField.label.toLowerCase()}?`
									: "Who can see this information?"}
							</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body pt={4} pb={5}>
							<VStack align="stretch" gap={3}>
								<Text color="gray.600" fontSize="sm">
									Choose the audience for this profile detail.
								</Text>
								<Button
									variant={
										visibilityDraft === "public"
											? "solid"
											: "outline"
									}
									colorPalette="blue"
									justifyContent="space-between"
									onClick={() => handleVisibilitySelect("public")}
								>
									<HStack>
										<Icon as={FiGlobe} />
										<Text>Public</Text>
									</HStack>
									{visibilityDraft === "public" && (
										<Text fontSize="xs">Selected</Text>
									)}
								</Button>
								<Button
									variant={
										visibilityDraft === "private"
											? "solid"
											: "outline"
									}
									colorPalette="blue"
									justifyContent="space-between"
									onClick={() => handleVisibilitySelect("private")}
								>
									<HStack>
										<Icon as={FiLock} />
										<Text>Private</Text>
									</HStack>
									{visibilityDraft === "private" && (
										<Text fontSize="xs">Selected</Text>
									)}
								</Button>
								{visibilityError && (
									<Text color="red.500" fontSize="sm">
										{visibilityError}
									</Text>
								)}
							</VStack>
						</Dialog.Body>
						<Dialog.Footer borderTopWidth="1px" borderColor="gray.200" pt={3}>
							<HStack w="full" justify="flex-end">
								<Button variant="ghost" onClick={handleVisibilityCancel} disabled={updateProfileFieldVisibility.isPending}>
									Cancel
								</Button>
								<Button
									colorPalette="blue"
									onClick={handleVisibilitySave}
									loading={updateProfileFieldVisibility.isPending}
									disabled={!visibilityFieldKey || !visibilityDraft}
								>
									Save
								</Button>
							</HStack>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Dialog.Root>

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
