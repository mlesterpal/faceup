import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CURRENT_USER_ID } from "../constants/currentUser";
import type { CreateUser, CreateUserPayload } from "../entities/post/CreateUser";
import type { UpdateUserProfilePayload } from "../entities/response/UpdateUserProfilePayload";
import type { UpdateProfilePictureResponse } from "../entities/response/UpdateProfilePictureResponse";
import type { User } from "../entities/response/User";
import APIClient, { type FetchResponse } from "../services/apiClient";
import { getUser, updateUserProfile, uploadProfilePicture } from "../services/userService";
import { formatBirthDateIso } from "../utils/formatBirthDateIso";

const createUserClient = new APIClient<CreateUserPayload>("/user");
const usersClient = new APIClient<User>("/user");

type UpdateUserProfileVariables =
	| { payload: UpdateUserProfilePayload }
	| { field: keyof UpdateUserProfilePayload; value: string | null };

function toCreateUserPayload(data: CreateUser): CreateUserPayload {
	const { birthMonth, birthDay, birthYear, ...rest } = data;
	return {
		...rest,
		birthDate: formatBirthDateIso(birthYear, birthMonth, birthDay),
	};
}

export const useCreateUser = () => {
	return useMutation<CreateUserPayload, Error, CreateUser>({
		mutationFn: (data: CreateUser) => createUserClient.post(toCreateUserPayload(data)),
	});
};

export const useGetUser = (userId: number = CURRENT_USER_ID) =>
	useQuery<User>({
		queryKey: ["user", userId],
		queryFn: () => getUser(userId),
	});
 
export const getProfilePictureErrorMessage = (error: unknown): string => {
	if (axios.isAxiosError(error)) {
		const message = error.response?.data?.message;
		if (typeof message === "string") return message;
	}
	if (error instanceof Error) return error.message;
	return "Failed to upload profile picture.";
};

export const useUpdateProfilePicture = (userId: number = CURRENT_USER_ID) => {
	const queryClient = useQueryClient();

	return useMutation<UpdateProfilePictureResponse, Error, File>({
		mutationFn: (file) => uploadProfilePicture(userId, file),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user", userId] });
		},
	});
};

const toUpdateUserProfilePayload = (
	variables: UpdateUserProfileVariables,
): UpdateUserProfilePayload => {
	if ("payload" in variables) {
		return variables.payload;
	}

	return { [variables.field]: variables.value };
};

export const useUpdateUserProfile = (userId: number = CURRENT_USER_ID) => {
	const queryClient = useQueryClient();

	return useMutation<User, Error, UpdateUserProfileVariables>({
		mutationFn: (variables) =>
			updateUserProfile(userId, toUpdateUserProfilePayload(variables)),
		onSuccess: (updatedUser) => {
			queryClient.setQueryData<User | undefined>(["user", userId], (currentUser) => {
				if (!currentUser) {
					return updatedUser;
				}

				return {
					...currentUser,
					...updatedUser,
				};
			});
		},
	});
};

export const useGetUsers = () => {
	return useQuery<FetchResponse<User>>({
		queryKey: ["users"],
		queryFn: () => usersClient.getAll(),
	});
};
