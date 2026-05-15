import {
	Box,
	Field,
	Flex,
	Heading,
	Text,
	Input,
	NativeSelect,
	Button,
	IconButton,
} from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import type { CreateUser } from "@/components/entities/CreateUser";
import { useCreateUser } from "@/hooks/useCreateUser";

const MONTH_OPTIONS = [
	{ value: "1", label: "January" },
	{ value: "2", label: "February" },
	{ value: "3", label: "March" },
	{ value: "4", label: "April" },
	{ value: "5", label: "May" },
	{ value: "6", label: "June" },
	{ value: "7", label: "July" },
	{ value: "8", label: "August" },
	{ value: "9", label: "September" },
	{ value: "10", label: "October" },
	{ value: "11", label: "November" },
	{ value: "12", label: "December" },
] as const;

const DAY_OPTIONS = [
	{ value: "1", label: "1" },
	{ value: "2", label: "2" },
	{ value: "3", label: "3" },
	{ value: "4", label: "4" },
	{ value: "5", label: "5" },
] as const;

const YEAR_OPTIONS = [
	{ value: "2026", label: "2026" },
	{ value: "2025", label: "2025" },
	{ value: "2024", label: "2024" },
	{ value: "2023", label: "2023" },
	{ value: "2022", label: "2022" },
] as const;

const LABEL_PROPS = {
	fontSize: "md",
	fontWeight: "600",
	mb: 2,
} as const;

const CONTROL_PROPS = {
	h: "52px",
	px: "16px",
	fontSize: "md",
	borderRadius: "10px",
} as const;

const requiredSelect = { required: "This field is required" };

const Signup = () => {
	const navigate = useNavigate();
	const createMutation = useCreateUser();
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<CreateUser>({
		defaultValues: {
			firstName: "",
			lastName: "",
			birthMonth: "",
			birthDay: "",
			birthYear: "",
			gender: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: CreateUser) => {
		await createMutation.mutateAsync(data);
		reset();
		navigate("/");
	};

	return (
		<Flex>
			<Box mx="auto" p={{ base: "10" }}>
				<IconButton
					aria-label="Back to login"
					variant="ghost"
					onClick={() => navigate("/")}
					ml="-2"
				>
					<FaChevronLeft />
				</IconButton>
				<Heading fontSize="4xl" lineHeight="1.1">
					Get started on FaceUp
				</Heading>
				<Text fontSize="lg" mt="2">
					Create an account to connect with friends, family and communities of people who share your interests.
				</Text>
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<Flex gap="4" mt="4">
						<Field.Root required invalid={!!errors.firstName} flex="1">
							<Field.Label {...LABEL_PROPS}>Name</Field.Label>
							<Flex
								gap="3"
								direction={{ base: "column", sm: "row" }}
								w="full"
							>
								<Input
									placeholder="First name"
									autoComplete="given-name"
									w="full"
									{...CONTROL_PROPS}
									{...register("firstName", {
										required: "First name is required",
									})}	
								/>
								<Input
									placeholder="Last name"
									autoComplete="family-name"
									w="full"
									{...CONTROL_PROPS}
									{...register("lastName", {
										required: "Last name is required",
									})}
								/>
							</Flex>
							{(errors.firstName || errors.lastName) && (
								<Field.ErrorText>
									{errors.firstName?.message ?? errors.lastName?.message}
								</Field.ErrorText>
							)}
						</Field.Root>
					</Flex>
					<Flex mt="4">
						<Field.Root
							required
							invalid={
								!!(
									errors.birthMonth ||
									errors.birthDay ||
									errors.birthYear
								)
							}
						>
							<Field.Label {...LABEL_PROPS}>Birthday</Field.Label>
							<Flex
								gap="3"
								direction={{ base: "column", sm: "row" }}
								w="full"
							>
								<NativeSelect.Root w="full">
									<Controller
										name="birthMonth"
										control={control}
										rules={requiredSelect}
										render={({ field }) => (
											<NativeSelect.Field
												{...field}
												{...CONTROL_PROPS}
											>
												<option value="" disabled hidden>
													Month
												</option>
												{MONTH_OPTIONS.map((m) => (
													<option key={m.value} value={m.value}>
														{m.label}
													</option>
												))}
											</NativeSelect.Field>
										)}
									/>
									<NativeSelect.Indicator />
								</NativeSelect.Root>
								<NativeSelect.Root w="full">
									<Controller
										name="birthDay"
										control={control}
										rules={requiredSelect}
										render={({ field }) => (
											<NativeSelect.Field
												{...field}
												{...CONTROL_PROPS}
											>
												<option value="" disabled hidden>
													Day
												</option>
												{DAY_OPTIONS.map((d) => (
													<option key={d.value} value={d.value}>
														{d.label}
													</option>
												))}
											</NativeSelect.Field>
										)}
									/>
									<NativeSelect.Indicator />
								</NativeSelect.Root>
								<NativeSelect.Root w="full">
									<Controller
										name="birthYear"
										control={control}
										rules={requiredSelect}
										render={({ field }) => (
											<NativeSelect.Field
												{...field}
												{...CONTROL_PROPS}
											>
												<option value="" disabled hidden>
													Year
												</option>
												{YEAR_OPTIONS.map((y) => (
													<option key={y.value} value={y.value}>
														{y.label}
													</option>
												))}
											</NativeSelect.Field>
										)}
									/>
									<NativeSelect.Indicator />
								</NativeSelect.Root>
							</Flex>
							{(errors.birthMonth ||
								errors.birthDay ||
								errors.birthYear) && (
								<Field.ErrorText>
									{errors.birthMonth?.message ??
										errors.birthDay?.message ??
										errors.birthYear?.message}
								</Field.ErrorText>
							)}
						</Field.Root>
					</Flex>
					<Flex mt="4">
						<Field.Root required invalid={!!errors.gender}>
							<Field.Label {...LABEL_PROPS}>Gender</Field.Label>
							<Flex
								gap="3"
								direction={{ base: "column", sm: "row" }}
								w="full"
							>
								<NativeSelect.Root w="full">
									<Controller
										name="gender"
										control={control}
										rules={requiredSelect}
										render={({ field }) => (
											<NativeSelect.Field
												{...field}
												{...CONTROL_PROPS}
											>
												<option value="" disabled hidden>
													Select your gender
												</option>
												<option value="male">Male</option>
												<option value="female">Female</option>
												<option value="other">Other</option>
											</NativeSelect.Field>
										)}
									/>
									<NativeSelect.Indicator />
								</NativeSelect.Root>
							</Flex>
							{errors.gender && (
								<Field.ErrorText>{errors.gender.message}</Field.ErrorText>
							)}
						</Field.Root>
					</Flex>
					<Flex mt="4">
						<Field.Root required invalid={!!errors.email}>
							<Field.Label {...LABEL_PROPS}>Email</Field.Label>
							<Flex w="full">
								<Input
									type="email"
									placeholder="Enter your email"
									autoComplete="email"
									w="full"
									flex="1"
									{...CONTROL_PROPS}
									{...register("email", {
										required: "Email is required",
										pattern: {
											value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
											message: "Enter a valid email",
										},
									})}
								/>
							</Flex>
							{errors.email && (
								<Field.ErrorText>{errors.email.message}</Field.ErrorText>
							)}
						</Field.Root>
					</Flex>
					<Flex mt="4">
						<Field.Root required invalid={!!errors.password}>
							<Field.Label {...LABEL_PROPS}>Password</Field.Label>
							<Flex w="full">
								<Input
									type="password"
									placeholder="Enter your password"
									autoComplete="new-password"
									w="full"
									flex="1"
									{...CONTROL_PROPS}
									{...register("password", {
										required: "Password is required",
										minLength: {
											value: 8,
											message: "Use at least 8 characters",
										},
									})}
								/>
							</Flex>
							{errors.password && (
								<Field.ErrorText>{errors.password.message}</Field.ErrorText>
							)}
						</Field.Root>
					</Flex>
					{createMutation.isError && (
						<Text mt="2" color="red.500" fontSize="sm">
							Sign up failed. Please try again.
						</Text>
					)}
					<Box mt="4">
						<Button
							type="submit"
							bg="blue.600"
							color="white"
							rounded="3xl"
							fontSize="lg"
							p={6}
							w="full"
							disabled={createMutation.isPending}
							loading={createMutation.isPending}
						>
							Submit
						</Button>
					</Box>
				</form>
			</Box>
		</Flex>
	);
};

export default Signup;
